import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/pools/[poolId]/matches/[matchId]/banpick/session - Get current session
export async function GET(
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

    // Check if session exists
    let session = await prisma.banPickSession.findUnique({
      where: { gameId: matchId },
      include: {
        gameRecord: {
          include: {
            userRecords: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!session) {
      return successResponse(null)
    }

    // Transform data (including CANCELLED/COMPLETED status for client handling)
    const transformedSession = {
      sessionId: session.sessionId.toString(),
      gameId: session.gameId.toString(),
      team1ParticipantId: session.team1ParticipantId,
      team2ParticipantId: session.team2ParticipantId,
      status: session.status,
      currentTurn: session.currentTurn,
      currentPhase: session.currentPhase,
      currentStep: session.currentStep,
      bans: JSON.parse(session.bansData),
      picks: JSON.parse(session.picksData),
      team1Data: JSON.parse(session.gameRecord.team1Data),
      team2Data: JSON.parse(session.gameRecord.team2Data),
      userRecords: session.gameRecord.userRecords,
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString(),
    }

    return successResponse(transformedSession)
  } catch (error) {
    console.error('Error fetching ban-pick session:', error)
    return errorResponse('밴픽 세션을 불러오는 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/pools/[poolId]/matches/[matchId]/banpick/session - Create or join session
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string; matchId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { poolId: poolIdParam, matchId: matchIdParam } = await params
    const poolId = BigInt(poolIdParam)
    const matchId = BigInt(matchIdParam)

    // Check if user is a member of the pool
    const membership = await prisma.poolMember.findUnique({
      where: {
        poolId_userId: {
          poolId,
          userId,
        },
      },
    })

    if (!membership) {
      return errorResponse('이 Pool에 접근할 권한이 없습니다.', 403)
    }

    // Get game record
    const gameRecord = await prisma.gameRecord.findUnique({
      where: { gameId: matchId },
      include: {
        userRecords: true,
      },
    })

    if (!gameRecord) {
      return errorResponse('전적을 찾을 수 없습니다.', 404)
    }

    if (gameRecord.status !== 'DRAFT_PENDING') {
      return errorResponse('밴픽을 진행할 수 없는 상태입니다.', 400)
    }

    // Check which team the user belongs to
    const userRecord = gameRecord.userRecords.find((record) => record.userId === userId)
    if (!userRecord) {
      return errorResponse('이 전적에 참여하지 않은 유저입니다.', 403)
    }

    const userTeam = userRecord.teamNumber

    console.log(`[BanPickSession] User ${userId} is in team ${userTeam}`)

    // Get existing session
    let session = await prisma.banPickSession.findUnique({
      where: { gameId: matchId },
    })

    // If session is CANCELLED or COMPLETED, delete it and start fresh
    if (session && (session.status === 'CANCELLED' || session.status === 'COMPLETED')) {
      console.log(`[BanPickSession] Deleting ${session.status} session, starting fresh`)
      await prisma.banPickSession.delete({
        where: { sessionId: session.sessionId },
      })
      session = null
    }

    // Create session if it doesn't exist
    if (!session) {
      console.log(`[BanPickSession] Creating new session with user ${userId} in team ${userTeam}`)
      try {
        session = await prisma.banPickSession.create({
          data: {
            gameId: matchId,
            team1ParticipantId: userTeam === 1 ? userId : null,
            team2ParticipantId: userTeam === 2 ? userId : null,
            status: 'WAITING_PARTICIPANTS',
          },
        })
      } catch (createError: any) {
        // Handle race condition - another request created the session simultaneously
        if (createError.code === 'P2002') {
          console.log(`[BanPickSession] Race condition detected, fetching existing session`)
          session = await prisma.banPickSession.findUnique({
            where: { gameId: matchId },
          })
          if (!session) {
            throw new Error('Failed to create or find session')
          }
        } else {
          throw createError
        }
      }
    }

    // Check if user is already in the session
    const isAlreadyInSession =
      (userTeam === 1 && session.team1ParticipantId === userId) ||
      (userTeam === 2 && session.team2ParticipantId === userId)

    if (!isAlreadyInSession) {
      // Try to join the session
      console.log(`[BanPickSession] User not in session, trying to join`)

      if (userTeam === 1) {
        if (session.team1ParticipantId && session.team1ParticipantId !== userId) {
          console.log(`[BanPickSession] Team 1 already has participant: ${session.team1ParticipantId}`)
          return errorResponse('팀 1에 이미 참여자가 있습니다.', 400)
        }
        console.log(`[BanPickSession] Adding user ${userId} to Team 1`)
        session = await prisma.banPickSession.update({
          where: { sessionId: session.sessionId },
          data: { team1ParticipantId: userId },
        })
      } else {
        if (session.team2ParticipantId && session.team2ParticipantId !== userId) {
          console.log(`[BanPickSession] Team 2 already has participant: ${session.team2ParticipantId}`)
          return errorResponse('팀 2에 이미 참여자가 있습니다.', 400)
        }
        console.log(`[BanPickSession] Adding user ${userId} to Team 2`)
        session = await prisma.banPickSession.update({
          where: { sessionId: session.sessionId },
          data: { team2ParticipantId: userId },
        })
      }

      // Check if both teams have participants
      if (session.team1ParticipantId && session.team2ParticipantId) {
        console.log(`[BanPickSession] Both teams ready, starting ban-pick`)
        session = await prisma.banPickSession.update({
          where: { sessionId: session.sessionId },
          data: { status: 'IN_PROGRESS' },
        })
      }
    } else {
      console.log(`[BanPickSession] User ${userId} already in session`)
    }

    console.log(`[BanPickSession] Final session state - Team 1: ${session.team1ParticipantId}, Team 2: ${session.team2ParticipantId}, Status: ${session.status}`)

    return successResponse({
      sessionId: session.sessionId.toString(),
      gameId: session.gameId.toString(),
      team1ParticipantId: session.team1ParticipantId,
      team2ParticipantId: session.team2ParticipantId,
      status: session.status,
      userTeam,
    })
  } catch (error) {
    console.error('Error creating/joining ban-pick session:', error)
    return errorResponse('밴픽 세션 참여 중 오류가 발생했습니다.', 500)
  }
}

// DELETE /api/pools/[poolId]/matches/[matchId]/banpick/session - Leave session
export async function DELETE(
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

    // Get session
    const session = await prisma.banPickSession.findUnique({
      where: { gameId: matchId },
    })

    if (!session) {
      return errorResponse('세션을 찾을 수 없습니다.', 404)
    }

    // If session is IN_PROGRESS, delete it immediately (someone left during ban-pick)
    if (session.status === 'IN_PROGRESS') {
      console.log(`[BanPickSession] User ${userId} left during IN_PROGRESS, deleting session`)
      await prisma.banPickSession.delete({
        where: { sessionId: session.sessionId },
      })
      return successResponse({ message: '밴픽이 취소되었습니다.', cancelled: true, deleted: true })
    }

    // If WAITING_PARTICIPANTS, remove user from session
    if (session.team1ParticipantId === userId) {
      console.log(`[BanPickSession] Removing user ${userId} from team 1`)
      await prisma.banPickSession.update({
        where: { sessionId: session.sessionId },
        data: { team1ParticipantId: null },
      })
    } else if (session.team2ParticipantId === userId) {
      console.log(`[BanPickSession] Removing user ${userId} from team 2`)
      await prisma.banPickSession.update({
        where: { sessionId: session.sessionId },
        data: { team2ParticipantId: null },
      })
    }

    // If no participants left, delete session
    const updatedSession = await prisma.banPickSession.findUnique({
      where: { gameId: matchId },
    })

    if (updatedSession && !updatedSession.team1ParticipantId && !updatedSession.team2ParticipantId) {
      console.log(`[BanPickSession] No participants left, deleting session`)
      await prisma.banPickSession.delete({
        where: { sessionId: updatedSession.sessionId },
      })
    }

    return successResponse({ message: '세션에서 나갔습니다.', cancelled: false, deleted: false })
  } catch (error) {
    console.error('Error leaving ban-pick session:', error)
    return errorResponse('세션 나가기 중 오류가 발생했습니다.', 500)
  }
}
