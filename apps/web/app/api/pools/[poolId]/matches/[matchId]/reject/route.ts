import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// POST /api/pools/[poolId]/matches/[matchId]/reject - Reject match result
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

    // Check if user is pool owner
    const pool = await prisma.pool.findUnique({
      where: { poolId },
    })

    if (!pool) {
      return errorResponse('Pool을 찾을 수 없습니다.', 404)
    }

    if (pool.ownerId !== userId) {
      return errorResponse('Pool 관리자만 결과를 거부할 수 있습니다.', 403)
    }

    // Get game record
    const gameRecord = await prisma.gameRecord.findUnique({
      where: { gameId: matchId },
    })

    if (!gameRecord) {
      return errorResponse('전적을 찾을 수 없습니다.', 404)
    }

    if (gameRecord.status !== 'RESULT_PENDING') {
      return errorResponse('승인 대기 중인 전적만 거부할 수 있습니다.', 400)
    }

    // Reset game record status and clear result data
    await prisma.gameRecord.update({
      where: { gameId: matchId },
      data: {
        status: 'DRAFT_COMPLETE',
        team1Won: null,
        team1Kills: 0,
        team2Kills: 0,
        team1Gold: 0,
        team2Gold: 0,
        gameDuration: null,
      },
    })

    // Clear player stats from UserGameRecords
    await prisma.userGameRecord.updateMany({
      where: { gameId: matchId },
      data: {
        kills: 0,
        deaths: 0,
        assists: 0,
        cs: 0,
      },
    })

    console.log(`[Reject] Match ${matchId} rejected by user ${userId}`)

    return successResponse({ message: '결과가 거부되었습니다.' })
  } catch (error) {
    console.error('Error rejecting result:', error)
    return errorResponse('결과 거부 중 오류가 발생했습니다.', 500)
  }
}
