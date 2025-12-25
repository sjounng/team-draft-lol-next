import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'
import { broadcastSessionUpdate } from '@/app/lib/websocket-client'

// Ban/Pick order configuration (Custom Draft Order)
// Global steps 0-19 representing entire ban-pick flow:
// Steps 0-5: First ban phase (1 2 1 2 1 2) - Alternating
// Steps 6-11: First pick phase (1 2 2 1 1 2)
// Steps 12-15: Second ban phase (1 2 1 2) - Starts with Blue team
// Steps 16-19: Second pick phase (2 1 1 2)
const DRAFT_ORDER = [
  // First ban phase (6 bans) - Alternating turns
  { team: 1, type: 'BAN' }, { team: 2, type: 'BAN' }, { team: 1, type: 'BAN' },
  { team: 2, type: 'BAN' }, { team: 1, type: 'BAN' }, { team: 2, type: 'BAN' },
  // First pick phase (6 picks)
  { team: 1, type: 'PICK' }, { team: 2, type: 'PICK' }, { team: 2, type: 'PICK' },
  { team: 1, type: 'PICK' }, { team: 1, type: 'PICK' }, { team: 2, type: 'PICK' },
  // Second ban phase (4 bans) - Starts with Blue team
  { team: 1, type: 'BAN' }, { team: 2, type: 'BAN' }, { team: 1, type: 'BAN' }, { team: 2, type: 'BAN' },
  // Second pick phase (4 picks)
  { team: 2, type: 'PICK' }, { team: 1, type: 'PICK' }, { team: 1, type: 'PICK' }, { team: 2, type: 'PICK' }
]

// POST /api/pools/[poolId]/matches/[matchId]/banpick/action - Ban or pick a champion
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string; matchId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { matchId: matchIdParam } = await params
    const matchId = BigInt(matchIdParam)

    const body = await request.json()
    const { championId, championName } = body

    if (!championId || !championName) {
      return errorResponse('챔피언 정보가 필요합니다.')
    }

    // Get session
    const session = await prisma.banPickSession.findUnique({
      where: { gameId: matchId },
      include: {
        gameRecord: {
          include: {
            userRecords: true,
          },
        },
      },
    })

    if (!session) {
      return errorResponse('세션을 찾을 수 없습니다.', 404)
    }

    // Strict validation: only IN_PROGRESS sessions can proceed
    if (session.status !== 'IN_PROGRESS') {
      console.log(`[BanPickAction] Invalid session status: ${session.status}`)

      if (session.status === 'COMPLETED') {
        return errorResponse('밴픽이 이미 완료되었습니다.', 400)
      } else if (session.status === 'CANCELLED') {
        return errorResponse('밴픽이 취소되었습니다.', 400)
      } else if (session.status === 'WAITING_PARTICIPANTS') {
        return errorResponse('아직 모든 참여자가 준비되지 않았습니다.', 400)
      } else {
        return errorResponse('밴픽을 진행할 수 없는 상태입니다.', 400)
      }
    }

    // Check if it's user's turn
    const isTeam1Turn = session.currentTurn === 1
    const currentParticipant = isTeam1Turn ? session.team1ParticipantId : session.team2ParticipantId

    if (currentParticipant !== userId) {
      return errorResponse('당신의 차례가 아닙니다.', 403)
    }

    let bans, picks
    try {
      bans = JSON.parse(session.bansData)
      picks = JSON.parse(session.picksData)
    } catch (parseError) {
      console.error('Error parsing ban/pick data:', parseError)
      return errorResponse('밴/픽 데이터가 손상되었습니다.', 500)
    }

    const currentStep = session.currentStep

    // Validate step is within bounds
    if (currentStep < 0 || currentStep >= DRAFT_ORDER.length) {
      return errorResponse('잘못된 단계입니다.', 400)
    }

    const currentDraft = DRAFT_ORDER[currentStep]
    const isBan = currentDraft.type === 'BAN'

    if (isBan) {
      // Ban action
      // Check if champion is already banned
      if (bans.some((ban: any) => ban.championId === championId)) {
        return errorResponse('이미 밴된 챔피언입니다.', 400)
      }

      // Add ban
      bans.push({
        teamNumber: session.currentTurn,
        championId,
        championName,
      })
    } else {
      // Pick action
      // Check if champion is already picked or banned
      if (bans.some((ban: any) => ban.championId === championId)) {
        return errorResponse('밴된 챔피언입니다.', 400)
      }
      if (picks.some((pick: any) => pick.championId === championId)) {
        return errorResponse('이미 픽된 챔피언입니다.', 400)
      }

      // Assign picks to positions in fixed order: TOP, JGL, MID, ADC, SUP
      const POSITION_ORDER = ['TOP', 'JGL', 'MID', 'ADC', 'SUP']

      // Get current team's picks count
      const teamPicks = picks.filter((p: any) => p.teamNumber === session.currentTurn)
      const pickIndex = teamPicks.length // 0-4 for 5 picks

      if (pickIndex >= POSITION_ORDER.length) {
        return errorResponse('모든 포지션에 픽이 완료되었습니다.', 400)
      }

      const position = POSITION_ORDER[pickIndex]

      // Add pick (userId will be null - to be assigned later)
      picks.push({
        teamNumber: session.currentTurn,
        userId: null,
        position: position,
        championId,
        championName,
      })
    }

    // Calculate next step
    const nextStep = currentStep + 1
    let status = session.status
    let nextTurn = session.currentTurn
    let nextPhase = session.currentPhase

    if (nextStep >= DRAFT_ORDER.length) {
      // Draft complete - use transaction to ensure all updates succeed
      console.log(`[BanPickAction] Draft completed, saving data and deleting session`)

      // Broadcast completion BEFORE deleting session
      const team1Data = JSON.parse(session.gameRecord.team1Data)
      const team2Data = JSON.parse(session.gameRecord.team2Data)

      const completedSession = {
        sessionId: session.sessionId.toString(),
        gameId: session.gameId.toString(),
        team1ParticipantId: session.team1ParticipantId,
        team2ParticipantId: session.team2ParticipantId,
        status: 'COMPLETED',
        currentTurn: session.currentTurn,
        currentPhase: session.currentPhase,
        currentStep: nextStep,
        bans,
        picks,
        team1Data,
        team2Data,
      }

      await broadcastSessionUpdate(matchIdParam, completedSession)

      await prisma.$transaction(async (tx) => {
        // Update GameRecord with ban/pick data and status
        // Note: Champions are assigned to positions (TOP, JGL, MID, ADC, SUP)
        // Users will be manually assigned to champions later
        await tx.gameRecord.update({
          where: { gameId: matchId },
          data: {
            banPickData: JSON.stringify({ bans, picks }),
            status: 'DRAFT_COMPLETE',
          },
        })

        // Delete session (all data has been saved to GameRecord)
        await tx.banPickSession.delete({
          where: { sessionId: session.sessionId },
        })
      })

      return successResponse({ bans, picks, status: 'COMPLETED', completed: true })
    } else {
      // Move to next step
      const nextDraft = DRAFT_ORDER[nextStep]
      nextTurn = nextDraft.team
      nextPhase = nextDraft.type

      // Update session
      await prisma.banPickSession.update({
        where: { sessionId: session.sessionId },
        data: {
          bansData: JSON.stringify(bans),
          picksData: JSON.stringify(picks),
          currentStep: nextStep,
          currentTurn: nextTurn,
          currentPhase: nextPhase,
          status,
        },
      })

      // Broadcast updated session to all connected clients via WebSocket
      const team1Data = JSON.parse(session.gameRecord.team1Data)
      const team2Data = JSON.parse(session.gameRecord.team2Data)

      const updatedSession = {
        sessionId: session.sessionId.toString(),
        gameId: session.gameId.toString(),
        team1ParticipantId: session.team1ParticipantId,
        team2ParticipantId: session.team2ParticipantId,
        status,
        currentTurn: nextTurn,
        currentPhase: nextPhase,
        currentStep: nextStep,
        bans,
        picks,
        team1Data,
        team2Data,
      }

      await broadcastSessionUpdate(matchIdParam, updatedSession)

      return successResponse({ bans, picks, status, nextPhase })
    }
  } catch (error) {
    console.error('Error performing ban/pick action:', error)
    return errorResponse('밴/픽 중 오류가 발생했습니다.', 500)
  }
}
