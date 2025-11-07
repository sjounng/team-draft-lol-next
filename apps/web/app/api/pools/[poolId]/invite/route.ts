import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// POST /api/pools/[poolId]/invite - Invite a user to the pool (owner only)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { poolId } = await params
    const body = await request.json()
    const { userId: invitedUserId } = body

    if (!invitedUserId) {
      return errorResponse('User ID is required')
    }

    // Check if pool exists
    const pool = await prisma.pool.findUnique({
      where: { poolId: BigInt(poolId) },
      include: {
        memberships: {
          select: {
            userId: true
          }
        }
      }
    })

    if (!pool) {
      return errorResponse('Pool not found', 404)
    }

    // Check if current user is the owner
    if (pool.ownerId !== userId) {
      return errorResponse('Only the pool owner can invite members', 403)
    }

    // Check if user is already a member
    const isAlreadyMember = pool.memberships.some(m => m.userId === invitedUserId)
    if (isAlreadyMember) {
      return errorResponse('User is already a member of this pool', 400)
    }

    // Check if invited user exists
    const invitedUser = await prisma.user.findUnique({
      where: { id: invitedUserId }
    })

    if (!invitedUser) {
      return errorResponse('User not found', 404)
    }

    // Check if there's already a pending invitation
    const existingInvitation = await prisma.invitation.findUnique({
      where: {
        poolId_receiverId_type: {
          poolId: pool.poolId,
          receiverId: invitedUserId,
          type: 'INVITATION'
        },
        status: 'PENDING'
      }
    })

    if (existingInvitation) {
      return errorResponse('User already has a pending invitation', 400)
    }

    // Create invitation instead of directly adding to pool
    await prisma.invitation.create({
      data: {
        poolId: pool.poolId,
        senderId: userId, // Owner sending invitation
        receiverId: invitedUserId, // User receiving invitation
        type: 'INVITATION',
        status: 'PENDING'
      }
    })

    return successResponse({ message: 'Invitation sent successfully' }, 201)
  } catch (error) {
    console.error('Error inviting user:', error)
    return errorResponse('Failed to invite user', 500)
  }
}
