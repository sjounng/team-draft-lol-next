import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// GET /api/pools/[poolId]
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

    const pool = await prisma.pool.findUnique({
      where: { poolId },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true
          }
        },
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                name: true,
                riotId: true,
                riotTag: true,
                mainLane: true,
                subLane: true,
                score: true,
                winLossStreak: true
              }
            }
          },
          orderBy: {
            user: {
              score: 'desc'
            }
          }
        }
      }
    })

    if (!pool) {
      return notFoundResponse('Pool not found')
    }

    // Check if user has access
    const hasAccess = pool.ownerId === userId ||
                     pool.memberships.some(m => m.userId === userId)

    if (!hasAccess) {
      return unauthorizedResponse('You do not have access to this pool')
    }

    // Transform to include members array
    const responsePool = {
      ...pool,
      members: pool.memberships.map(m => m.user)
    }

    return successResponse(responsePool)
  } catch (error) {
    console.error('Error fetching pool:', error)
    return errorResponse('Failed to fetch pool', 500)
  }
}

// DELETE /api/pools/[poolId]
export async function DELETE(
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

    const pool = await prisma.pool.findUnique({
      where: { poolId }
    })

    if (!pool) {
      return notFoundResponse('Pool not found')
    }

    if (pool.ownerId !== userId) {
      return unauthorizedResponse('Only the pool owner can delete the pool')
    }

    // Delete the pool (cascade will handle relations)
    await prisma.pool.delete({
      where: { poolId }
    })

    return successResponse({ message: 'Pool deleted successfully' })
  } catch (error) {
    console.error('Error deleting pool:', error)
    return errorResponse('Failed to delete pool', 500)
  }
}
