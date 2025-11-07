import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// GET /api/pools/:id/requests - Get pending join requests for a pool (owner only)
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

    // Verify pool exists and user is owner
    const pool = await prisma.pool.findUnique({
      where: { poolId }
    })

    if (!pool) {
      return notFoundResponse('Pool not found')
    }

    if (pool.ownerId !== userId) {
      return unauthorizedResponse('Only pool owner can view join requests')
    }

    // Get pending join requests
    const requests = await prisma.invitation.findMany({
      where: {
        poolId,
        type: 'REQUEST',
        status: 'PENDING'
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            riotId: true,
            riotTag: true,
            mainLane: true,
            subLane: true,
            score: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return successResponse(requests)
  } catch (error) {
    console.error('Error fetching pool requests:', error)
    return errorResponse('Failed to fetch pool requests', 500)
  }
}
