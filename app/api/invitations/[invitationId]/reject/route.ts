import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'
import { parseBigInt } from '@/app/lib/bigint-utils'

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
    const invitationId = parseBigInt(invitationIdParam, 'Invitation ID')

    const invitation = await prisma.invitation.findUnique({
      where: { invitationId }
    })

    if (!invitation) {
      return notFoundResponse('Invitation not found')
    }

    if (invitation.receiverId !== userId) {
      return unauthorizedResponse('You can only reject invitations sent to you')
    }

    // Delete invitation
    await prisma.invitation.delete({
      where: { invitationId }
    })

    return successResponse({ message: 'Invitation rejected' })
  } catch (error) {
    console.error('Error rejecting invitation:', error)
    if (error instanceof Error && error.message.includes('Invalid')) {
      return errorResponse(error.message, 400)
    }
    return errorResponse('Failed to reject invitation', 500)
  }
}
