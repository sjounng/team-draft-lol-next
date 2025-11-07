import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/game-records - Get user's game records
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '0')
    const size = parseInt(searchParams.get('size') || '20')

    const gameRecords = await prisma.gameRecord.findMany({
      where: { creatorId: userId },
      include: {
        pool: {
          select: {
            poolId: true,
            name: true
          }
        },
        userRecords: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                riotId: true,
                riotTag: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: page * size,
      take: size
    })

    // Transform to summary response
    const summaries = gameRecords.map(record => ({
      gameId: record.gameId,
      poolName: record.pool.name,
      team1Won: record.team1Won,
      team1Kills: record.team1Kills,
      team2Kills: record.team2Kills,
      team1Gold: record.team1Gold,
      team2Gold: record.team2Gold,
      isApplied: record.isApplied,
      createdAt: record.createdAt,
      playerCount: record.userRecords.length
    }))

    return successResponse(summaries)
  } catch (error) {
    console.error('Error fetching game records:', error)
    return errorResponse('Failed to fetch game records', 500)
  }
}

// POST /api/game-records - Create a new game record
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const {
      poolId,
      team1Won,
      team1Kills,
      team2Kills,
      team1Gold,
      team2Gold,
      userRecords
    } = body

    if (!poolId || team1Won === undefined || !userRecords || userRecords.length !== 10) {
      return errorResponse('Invalid game record data. Must include 10 user records.')
    }

    // Verify pool access
    const pool = await prisma.pool.findUnique({
      where: { poolId: BigInt(poolId) },
      include: { memberships: true }
    })

    if (!pool) {
      return errorResponse('Pool not found')
    }

    const hasAccess = pool.ownerId === userId ||
                     pool.memberships.some(m => m.userId === userId)

    if (!hasAccess) {
      return unauthorizedResponse('You do not have access to this pool')
    }

    // Create game record with user records
    const gameRecord = await prisma.gameRecord.create({
      data: {
        creatorId: userId,
        poolId: BigInt(poolId),
        team1Data: JSON.stringify({}),
        team2Data: JSON.stringify({}),
        team1Won,
        team1Kills: team1Kills || 0,
        team2Kills: team2Kills || 0,
        team1Gold: team1Gold || 0,
        team2Gold: team2Gold || 0,
        isApplied: false,
        userRecords: {
          create: userRecords.map((ur: any) => ({
            userId: ur.userId,
            teamNumber: ur.teamNumber,
            assignedPosition: ur.assignedPosition,
            kills: ur.kills || 0,
            deaths: ur.deaths || 0,
            assists: ur.assists || 0,
            cs: ur.cs || 0
          }))
        }
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

    return successResponse(gameRecord, 201)
  } catch (error) {
    console.error('Error creating game record:', error)
    return errorResponse('Failed to create game record: ' + error, 500)
  }
}
