import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// POST /api/game-records/[gameId]/apply - Apply game result to user scores
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

    if (gameRecord.isApplied) {
      return errorResponse('Scores have already been applied for this game')
    }

    // Calculate score changes and update users
    await prisma.$transaction(async (tx) => {
      for (const record of gameRecord.userRecords) {
        const won = (record.teamNumber === 1 && gameRecord.team1Won) ||
                   (record.teamNumber === 2 && !gameRecord.team1Won)

        let scoreChange = 0
        let newStreak = record.user.winLossStreak || 0

        if (won) {
          // Win: add points
          scoreChange = 10
          newStreak = newStreak >= 0 ? newStreak + 1 : 1
        } else {
          // Loss: subtract points
          scoreChange = -10
          newStreak = newStreak <= 0 ? newStreak - 1 : -1
        }

        // Apply streak bonus/penalty
        const streakBonus = Math.abs(newStreak) > 2 ? (Math.abs(newStreak) - 2) * 2 : 0
        if (won) {
          scoreChange += streakBonus
        } else {
          scoreChange -= streakBonus
        }

        // Update user
        await tx.user.update({
          where: { id: record.user.id },
          data: {
            score: (record.user.score || 0) + scoreChange,
            winLossStreak: newStreak
          }
        })
      }

      // Mark game as applied
      await tx.gameRecord.update({
        where: { gameId },
        data: { isApplied: true }
      })
    })

    return successResponse({ message: 'Scores applied successfully' })
  } catch (error) {
    console.error('Error applying scores:', error)
    return errorResponse('Failed to apply scores', 500)
  }
}
