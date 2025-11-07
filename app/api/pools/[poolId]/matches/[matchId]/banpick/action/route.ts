import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// Ban/Pick order configuration (Official League of Legends Draft Order)
// Global steps 0-19 representing entire ban-pick flow:
// Steps 0-5: First ban phase (1 2 1 2 1 2) - Alternating
// Steps 6-11: First pick phase (1 2 2 1 1 2)
// Steps 12-15: Second ban phase (2 1 2 1)
// Steps 16-19: Second pick phase (2 1 1 2)
const DRAFT_ORDER = [
  // First ban phase (6 bans) - Alternating turns
  { team: 1, type: 'BAN' }, { team: 2, type: 'BAN' }, { team: 1, type: 'BAN' },
  { team: 2, type: 'BAN' }, { team: 1, type: 'BAN' }, { team: 2, type: 'BAN' },
  // First pick phase (6 picks)
  { team: 1, type: 'PICK' }, { team: 2, type: 'PICK' }, { team: 2, type: 'PICK' },
  { team: 1, type: 'PICK' }, { team: 1, type: 'PICK' }, { team: 2, type: 'PICK' },
  // Second ban phase (4 bans)
  { team: 2, type: 'BAN' }, { team: 1, type: 'BAN' }, { team: 2, type: 'BAN' }, { team: 1, type: 'BAN' },
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

    const bans = JSON.parse(session.bansData)
    const picks = JSON.parse(session.picksData)
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

      // Determine which player should pick (based on team and position)
      const teamPlayers = session.gameRecord.userRecords.filter(
        (record) => record.teamNumber === session.currentTurn
      )

      // Get players who haven't picked yet
      const teamPicks = picks.filter((p: any) => p.teamNumber === session.currentTurn)
      const unpickedPlayer = teamPlayers.find(
        (player) => !teamPicks.some((p: any) => p.userId === player.userId)
      )

      if (!unpickedPlayer) {
        return errorResponse('모든 플레이어가 픽을 완료했습니다.', 400)
      }

      // Add pick
      picks.push({
        teamNumber: session.currentTurn,
        userId: unpickedPlayer.userId,
        position: unpickedPlayer.assignedPosition,
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

      await prisma.$transaction(async (tx) => {
        // Update UserGameRecords with champion info
        for (const pick of picks) {
          await tx.userGameRecord.updateMany({
            where: {
              gameId: matchId,
              userId: pick.userId,
            },
            data: {
              championId: pick.championId,
              championName: pick.championName,
            },
          })
        }

        // Update GameRecord with ban/pick data and status
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

      return successResponse({ bans, picks, status, nextPhase })
    }
  } catch (error) {
    console.error('Error performing ban/pick action:', error)
    return errorResponse('밴/픽 중 오류가 발생했습니다.', 500)
  }
}
