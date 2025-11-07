import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/pools/[poolId]/matches/count
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { poolId: poolIdParam } = await params
    const poolId = BigInt(poolIdParam)

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

    // Count matches for this pool
    const count = await prisma.gameRecord.count({
      where: {
        poolId,
      },
    })

    return successResponse({ count })
  } catch (error) {
    console.error('Error fetching match count:', error)
    return errorResponse('전적 개수를 불러오는 중 오류가 발생했습니다.', 500)
  }
}
