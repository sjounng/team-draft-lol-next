import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/invitations - Get received invitations
export async function GET() {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const invitations = await prisma.invitation.findMany({
      where: {
        receiverId: userId,
        type: 'INVITATION', // Only show invitations (owner->user), not requests
        status: 'PENDING'
      },
      include: {
        pool: {
          select: {
            poolId: true,
            name: true,
            tag: true,
            owner: {
              select: {
                id: true,
                username: true
              }
            }
          }
        },
        sender: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return successResponse(invitations)
  } catch (error) {
    console.error('Error fetching invitations:', error)
    return errorResponse('Failed to fetch invitations', 500)
  }
}

// POST /api/invitations - Send invitation
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { poolId, receiverId, type = 'INVITATION' } = body

    if (!poolId || !receiverId) {
      return errorResponse('Pool ID and receiver ID are required')
    }

    if (type !== 'INVITATION' && type !== 'REQUEST') {
      return errorResponse('Invalid invitation type')
    }

    // Verify pool exists
    const pool = await prisma.pool.findUnique({
      where: { poolId: BigInt(poolId) },
      include: {
        memberships: true
      }
    })

    if (!pool) {
      return errorResponse('Pool not found', 404)
    }

    // For INVITATION: sender must be owner, receiver is the user
    // For REQUEST: sender is the user, receiver is the owner
    if (type === 'INVITATION') {
      if (pool.ownerId !== userId) {
        return unauthorizedResponse('Only pool owner can send invitations')
      }
    } else if (type === 'REQUEST') {
      if (pool.ownerId === userId) {
        return errorResponse('Pool owner cannot send join request to themselves')
      }
      // For REQUEST, swap sender and receiver logic
      // The actual receiver should be the pool owner
    }

    // Determine actual sender and receiver based on type
    let actualSenderId = userId
    let actualReceiverId = receiverId

    if (type === 'REQUEST') {
      // For REQUEST: user sends to pool owner
      actualSenderId = userId
      actualReceiverId = pool.ownerId
    }

    // Check if user is already a member
    const checkUserId = type === 'INVITATION' ? receiverId : userId
    const isAlreadyMember = pool.memberships.some(m => m.userId === checkUserId)
    if (isAlreadyMember) {
      return errorResponse('User is already a member of this pool')
    }

    // Check if invitation/request already exists
    const existingInvitation = await prisma.invitation.findUnique({
      where: {
        poolId_receiverId_type: {
          poolId: BigInt(poolId),
          receiverId: actualReceiverId,
          type
        }
      }
    })

    if (existingInvitation) {
      if (existingInvitation.status === 'PENDING') {
        return errorResponse(
          type === 'INVITATION'
            ? 'Invitation already sent to this user'
            : 'Join request already sent'
        )
      }
      // If rejected, update to pending again
      if (existingInvitation.status === 'REJECTED') {
        const updated = await prisma.invitation.update({
          where: { invitationId: existingInvitation.invitationId },
          data: { status: 'PENDING', senderId: actualSenderId }
        })
        return successResponse(updated, 200)
      }
    }

    // Create new invitation/request
    const invitation = await prisma.invitation.create({
      data: {
        poolId: BigInt(poolId),
        senderId: actualSenderId,
        receiverId: actualReceiverId,
        type
      },
      include: {
        pool: {
          select: {
            poolId: true,
            name: true,
            tag: true
          }
        },
        sender: {
          select: {
            id: true,
            username: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true
          }
        }
      }
    })

    return successResponse(invitation, 201)
  } catch (error) {
    console.error('Error creating invitation:', error)
    return errorResponse('Failed to send invitation', 500)
  }
}
