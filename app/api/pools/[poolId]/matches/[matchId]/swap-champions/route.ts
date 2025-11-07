import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// POST /api/pools/[poolId]/matches/[matchId]/swap-champions - Swap champion assignments between players
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

    const body = await request.json()
    const { userId1, userId2 } = body

    if (!userId1 || !userId2) {
      return errorResponse('두 명의 사용자 ID가 필요합니다.', 400)
    }

    if (userId1 === userId2) {
      return errorResponse('같은 사용자끼리 교환할 수 없습니다.', 400)
    }

    // Check if user is pool owner
    const pool = await prisma.pool.findUnique({
      where: { poolId },
    })

    if (!pool) {
      return errorResponse('Pool을 찾을 수 없습니다.', 404)
    }

    if (pool.ownerId !== userId) {
      return errorResponse('Pool 관리자만 챔피언을 교환할 수 있습니다.', 403)
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

    // Only allow swapping for DRAFT_COMPLETE status (before result submission)
    if (gameRecord.status !== 'DRAFT_COMPLETE') {
      return errorResponse('밴픽이 완료된 상태에서만 챔피언을 교환할 수 있습니다.', 400)
    }

    // Get user records
    const user1Record = gameRecord.userRecords.find(r => r.userId === userId1)
    const user2Record = gameRecord.userRecords.find(r => r.userId === userId2)

    if (!user1Record || !user2Record) {
      return errorResponse('사용자 전적을 찾을 수 없습니다.', 404)
    }

    // Check if both users are on the same team
    if (user1Record.teamNumber !== user2Record.teamNumber) {
      return errorResponse('같은 팀의 플레이어끼리만 교환할 수 있습니다.', 400)
    }

    // Swap champion information
    await prisma.$transaction([
      prisma.userGameRecord.update({
        where: {
          recordId: user1Record.recordId,
        },
        data: {
          championId: user2Record.championId,
          championName: user2Record.championName,
        },
      }),
      prisma.userGameRecord.update({
        where: {
          recordId: user2Record.recordId,
        },
        data: {
          championId: user1Record.championId,
          championName: user1Record.championName,
        },
      }),
    ])

    return successResponse({ message: '챔피언이 교환되었습니다.' })
  } catch (error) {
    console.error('Error swapping champions:', error)
    return errorResponse('챔피언 교환 중 오류가 발생했습니다.', 500)
  }
}
