import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// POST /api/game-records/[gameId]/cancel - Cancel applied scores
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
      where: { gameId },
      include: {
        userRecords: {
          include: {
            user: true
          }
        }
      }
    })

    if (!gameRecord) {
      return notFoundResponse('Game record not found')
    }

    if (gameRecord.creatorId !== userId) {
      return unauthorizedResponse('You do not have access to this game record')
    }

    if (!gameRecord.isApplied) {
      return errorResponse('Scores have not been applied yet')
    }

    // Reverse score changes
    await prisma.$transaction(async (tx) => {
      for (const record of gameRecord.userRecords) {
        const won = (record.teamNumber === 1 && gameRecord.team1Won) ||
                   (record.teamNumber === 2 && !gameRecord.team1Won)

        let scoreChange = 0
        const currentStreak = record.user.winLossStreak || 0

        // Reverse the streak calculation
        let previousStreak = 0
        if (won) {
          scoreChange = -10
          const streakBonus = Math.abs(currentStreak) > 2 ? (Math.abs(currentStreak) - 2) * 2 : 0
          scoreChange -= streakBonus
          // Reverse win streak
          previousStreak = currentStreak > 1 ? currentStreak - 1 : 0
        } else {
          scoreChange = 10
          const streakBonus = Math.abs(currentStreak) > 2 ? (Math.abs(currentStreak) - 2) * 2 : 0
          scoreChange += streakBonus
          // Reverse loss streak
          previousStreak = currentStreak < -1 ? currentStreak + 1 : 0
        }

        // Update user
        await tx.user.update({
          where: { id: record.user.id },
          data: {
            score: (record.user.score || 0) + scoreChange,
            winLossStreak: previousStreak
          }
        })
      }

      // Mark game as not applied
      await tx.gameRecord.update({
        where: { gameId },
        data: { isApplied: false }
      })
    })

    return successResponse({ message: 'Score application cancelled successfully' })
  } catch (error) {
    console.error('Error cancelling scores:', error)
    return errorResponse('Failed to cancel scores', 500)
  }
}
