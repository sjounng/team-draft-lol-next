import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// DELETE /api/pools/[poolId]/members/[userId] - Remove member from pool
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string; userId: string }> }
) {
  try {
    const currentUserId = await getCurrentUserId()
    if (!currentUserId) {
      return unauthorizedResponse()
    }

    const { poolId: poolIdParam, userId } = await params
    const poolId = BigInt(poolIdParam)
    const targetUserId = userId

    const pool = await prisma.pool.findUnique({
      where: { poolId },
      include: {
        memberships: true
      }
    })

    if (!pool) {
      return notFoundResponse('Pool not found')
    }

    // Check if current user is the pool owner or removing themselves
    const isOwner = pool.ownerId === currentUserId
    const isSelf = currentUserId === targetUserId

    if (!isOwner && !isSelf) {
      return unauthorizedResponse('Only the pool owner can remove members')
    }

    // Check if target user is actually a member
    const isMember = pool.memberships.some(m => m.userId === targetUserId)
    if (!isMember) {
      return errorResponse('User is not a member of this pool')
    }

    // Remove user from pool members using Prisma
    await prisma.poolMember.delete({
      where: {
        poolId_userId: {
          poolId: poolId,
          userId: targetUserId
        }
      }
    })

    return successResponse({ message: 'Member removed from pool successfully' })
  } catch (error) {
    console.error('Error removing member from pool:', error)
    return errorResponse('Failed to remove member from pool', 500)
  }
}
