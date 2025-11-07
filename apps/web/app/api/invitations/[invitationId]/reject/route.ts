import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// PUT /api/invitations/:id/reject - Reject invitation
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
      return unauthorizedResponse('You can only reject invitations sent to you')
    }

    if (invitation.status !== 'PENDING') {
      return errorResponse('Invitation is no longer pending')
    }

    // Reject invitation
    await prisma.invitation.update({
      where: { invitationId },
      data: { status: 'REJECTED' }
    })

    return successResponse({ message: 'Invitation rejected' })
  } catch (error) {
    console.error('Error rejecting invitation:', error)
    return errorResponse('Failed to reject invitation', 500)
  }
}
