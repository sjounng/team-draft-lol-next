import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// POST /api/game-records/[gameId]/delete - Delete a game record
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { gameId: gameIdParam } = await params
    const gameId = BigInt(gameIdParam)

    const gameRecord = await prisma.gameRecord.findUnique({
      where: { gameId }
    })

    if (!gameRecord) {
      return notFoundResponse('Game record not found')
    }

    if (gameRecord.creatorId !== userId) {
      return unauthorizedResponse('You do not have access to this game record')
    }

    if (gameRecord.isApplied) {
      return errorResponse('Cannot delete a game record that has been applied. Please cancel it first.')
    }

    // Delete game record (cascade will delete user records)
    await prisma.gameRecord.delete({
      where: { gameId }
    })

    return successResponse({ message: 'Game record deleted successfully' })
  } catch (error) {
    console.error('Error deleting game record:', error)
    return errorResponse('Failed to delete game record', 500)
  }
}
