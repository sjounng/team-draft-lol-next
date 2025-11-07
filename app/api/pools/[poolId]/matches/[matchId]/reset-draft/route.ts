import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// POST /api/pools/[poolId]/matches/[matchId]/reset-draft - Reset draft to DRAFT_PENDING
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
    })

    if (!gameRecord) {
      return errorResponse('전적을 찾을 수 없습니다.', 404)
    }

    // Can only reset DRAFT_COMPLETE matches
    if (gameRecord.status !== 'DRAFT_COMPLETE') {
      return errorResponse('밴픽이 완료된 전적만 초기화할 수 있습니다.', 400)
    }

    // Delete any existing ban-pick session
    await prisma.banPickSession.deleteMany({
      where: { gameId: matchId },
    })

    // Reset UserGameRecords (clear champion info)
    await prisma.userGameRecord.updateMany({
      where: { gameId: matchId },
      data: {
        championId: null,
        championName: null,
      },
    })

    // Reset GameRecord status and clear ban-pick data
    await prisma.gameRecord.update({
      where: { gameId: matchId },
      data: {
        status: 'DRAFT_PENDING',
        banPickData: null,
      },
    })

    console.log(`[ResetDraft] Game ${matchId} reset to DRAFT_PENDING`)

    return successResponse({ message: '밴픽이 초기화되었습니다.' })
  } catch (error) {
    console.error('Error resetting draft:', error)
    return errorResponse('밴픽 초기화 중 오류가 발생했습니다.', 500)
  }
}
