import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// GET /api/game-records/[gameId]
export async function GET(
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
        pool: true,
        userRecords: {
          include: {
            user: true
          },
          orderBy: { teamNumber: 'asc' }
        }
      }
    })

    if (!gameRecord) {
      return notFoundResponse('Game record not found')
    }

    if (gameRecord.creatorId !== userId) {
      return unauthorizedResponse('You do not have access to this game record')
    }

    return successResponse(gameRecord)
  } catch (error) {
    console.error('Error fetching game record:', error)
    return errorResponse('Failed to fetch game record', 500)
  }
}

// PUT /api/game-records/[gameId]
export async function PUT(
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
    const body = await request.json()

    const existingRecord = await prisma.gameRecord.findUnique({
      where: { gameId }
    })

    if (!existingRecord) {
      return notFoundResponse('Game record not found')
    }

    if (existingRecord.creatorId !== userId) {
      return unauthorizedResponse('You do not have access to this game record')
    }

    if (existingRecord.isApplied) {
      return errorResponse('Cannot update a game record that has been applied to scores')
    }

    const {
      team1Won,
      team1Kills,
      team2Kills,
      team1Gold,
      team2Gold,
      userRecords
    } = body

    // Update game record
    const updatedRecord = await prisma.gameRecord.update({
      where: { gameId },
      data: {
        ...(team1Won !== undefined && { team1Won }),
        ...(team1Kills !== undefined && { team1Kills }),
        ...(team2Kills !== undefined && { team2Kills }),
        ...(team1Gold !== undefined && { team1Gold }),
        ...(team2Gold !== undefined && { team2Gold })
      },
      include: {
        pool: true,
        userRecords: {
          include: {
            user: true
          }
        }
      }
    })

    // Update user records if provided
    if (userRecords && Array.isArray(userRecords)) {
      for (const ur of userRecords) {
        await prisma.userGameRecord.update({
          where: { recordId: BigInt(ur.recordId) },
          data: {
            kills: ur.kills,
            deaths: ur.deaths,
            assists: ur.assists,
            cs: ur.cs
          }
        })
      }
    }

    return successResponse(updatedRecord)
  } catch (error) {
    console.error('Error updating game record:', error)
    return errorResponse('Failed to update game record', 500)
  }
}
