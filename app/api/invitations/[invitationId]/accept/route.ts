import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// PUT /api/invitations/:id/accept - Accept invitation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ invitationId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { invitationId: invitationIdParam } = await params
    const invitationId = BigInt(invitationIdParam)

    const invitation = await prisma.invitation.findUnique({
      where: { invitationId }
    })

    if (!invitation) {
      return notFoundResponse('Invitation not found')
    }

    if (invitation.receiverId !== userId) {
      return unauthorizedResponse('You can only accept invitations sent to you')
    }

    if (invitation.status !== 'PENDING') {
      return errorResponse('Invitation is no longer pending')
    }

    // Determine which user should be added to the pool
    // For INVITATION: receiverId (the person who was invited)
    // For REQUEST: senderId (the person who requested to join)
    const userToAdd = invitation.type === 'INVITATION' ? userId : invitation.senderId

    // Check if already a member
    const existingMember = await prisma.poolMember.findUnique({
      where: {
        poolId_userId: {
          poolId: invitation.poolId,
          userId: userToAdd
        }
      }
    })

    if (existingMember) {
      // Update invitation status but don't add to pool again
      await prisma.invitation.update({
        where: { invitationId },
        data: { status: 'ACCEPTED' }
      })
      return errorResponse('User is already a member of this pool')
    }

    // Accept invitation/request and add user to pool
    await prisma.$transaction([
      prisma.invitation.update({
        where: { invitationId },
        data: { status: 'ACCEPTED' }
      }),
      prisma.poolMember.create({
        data: {
          poolId: invitation.poolId,
          userId: userToAdd
        }
      })
    ])

    return successResponse({ message: 'Invitation accepted successfully' })
  } catch (error) {
    console.error('Error accepting invitation:', error)
    return errorResponse('Failed to accept invitation', 500)
  }
}
