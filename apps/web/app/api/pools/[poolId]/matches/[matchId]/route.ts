import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// DELETE /api/pools/[poolId]/matches/[matchId] - Delete game record
export async function DELETE(
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
    })

    if (!gameRecord) {
      return errorResponse('전적을 찾을 수 없습니다.', 404)
    }

    // Cannot delete if score has been applied
    if (gameRecord.isApplied) {
      return errorResponse('점수가 반영된 전적은 삭제할 수 없습니다.', 400)
    }

    // Delete ban-pick session if exists
    await prisma.banPickSession.deleteMany({
      where: { gameId: matchId },
    })

    // Delete game record (UserGameRecords will be cascade deleted)
    await prisma.gameRecord.delete({
      where: { gameId: matchId },
    })

    console.log(`[DeleteMatch] Game ${matchId} deleted by user ${userId}`)

    return successResponse({ message: '전적이 삭제되었습니다.' })
  } catch (error) {
    console.error('Error deleting game record:', error)
    return errorResponse('전적 삭제 중 오류가 발생했습니다.', 500)
  }
}

// GET /api/pools/[poolId]/matches/[matchId] - Get game record
export async function GET(
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
        userRecords: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                score: true,
              },
            },
          },
        },
      },
    })

    if (!gameRecord) {
      return errorResponse('전적을 찾을 수 없습니다.', 404)
    }

    // For RESULT_PENDING status, calculate streaks for each user
    let userStreaks: Record<string, number> = {}
    if (gameRecord.status === 'RESULT_PENDING') {
      for (const userRecord of gameRecord.userRecords) {
        const userRecentGames = await prisma.gameRecord.findMany({
          where: {
            poolId,
            status: 'COMPLETED',
            isApplied: true,
            gameId: { not: matchId },
            userRecords: {
              some: {
                userId: userRecord.userId,
              },
            },
          },
          include: {
            userRecords: {
              where: {
                userId: userRecord.userId,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        })

        // Calculate streak
        let streakCount = 0
        if (userRecentGames.length > 0) {
          const recentResults = userRecentGames.map(game => {
            const userRec = game.userRecords[0]
            const userWon = (game.team1Won && userRec.teamNumber === 1) || (!game.team1Won && userRec.teamNumber === 2)
            return userWon
          })

          const firstResult = recentResults[0]
          let count = 0
          for (const result of recentResults) {
            if (result === firstResult) {
              count++
            } else {
              break
            }
          }

          streakCount = firstResult ? count : -count
        }

        userStreaks[userRecord.userId] = streakCount
      }
    }

    // Transform data
    const transformedGameRecord = {
      gameId: gameRecord.gameId.toString(),
      creatorId: gameRecord.creatorId,
      poolId: gameRecord.poolId.toString(),
      status: gameRecord.status,
      team1Data: JSON.parse(gameRecord.team1Data),
      team2Data: JSON.parse(gameRecord.team2Data),
      banPickData: gameRecord.banPickData ? JSON.parse(gameRecord.banPickData) : null,
      team1Won: gameRecord.team1Won,
      team1Kills: gameRecord.team1Kills,
      team2Kills: gameRecord.team2Kills,
      team1Gold: gameRecord.team1Gold,
      team2Gold: gameRecord.team2Gold,
      gameDuration: gameRecord.gameDuration,
      isApplied: gameRecord.isApplied,
      createdAt: gameRecord.createdAt.toISOString(),
      updatedAt: gameRecord.updatedAt.toISOString(),
      userRecords: gameRecord.userRecords,
      userStreaks: userStreaks,
    }

    return successResponse(transformedGameRecord)
  } catch (error) {
    console.error('Error fetching game record:', error)
    return errorResponse('전적을 불러오는 중 오류가 발생했습니다.', 500)
  }
}
