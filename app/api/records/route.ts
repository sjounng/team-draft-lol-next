import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/records - Get user's game records with pagination
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 20
    const offset = (page - 1) * limit

    // Get user's game records
    const [records, totalCount] = await Promise.all([
      prisma.userGameRecord.findMany({
        where: {
          userId,
        },
        include: {
          gameRecord: {
            include: {
              pool: {
                select: {
                  poolId: true,
                  name: true,
                  tag: true,
                },
              },
              userRecords: {
                include: {
                  user: {
                    select: {
                      id: true,
                      username: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          gameRecord: {
            createdAt: 'desc',
          },
        },
        skip: offset,
        take: limit,
      }),
      prisma.userGameRecord.count({
        where: {
          userId,
        },
      }),
    ])

    // Transform data
    const transformedRecords = records.map((record) => ({
      recordId: record.recordId.toString(),
      gameId: record.gameId.toString(),
      poolId: record.gameRecord.poolId.toString(),
      poolName: record.gameRecord.pool.name,
      poolTag: record.gameRecord.pool.tag,
      teamNumber: record.teamNumber,
      assignedPosition: record.assignedPosition,
      originalScore: record.originalScore,
      adjustedScore: record.adjustedScore,
      championId: record.championId,
      championName: record.championName,
      kills: record.kills,
      deaths: record.deaths,
      assists: record.assists,
      cs: record.cs,
      won: record.gameRecord.team1Won !== null
        ? (record.teamNumber === 1 ? record.gameRecord.team1Won : !record.gameRecord.team1Won)
        : null,
      status: record.gameRecord.status,
      isApplied: record.gameRecord.isApplied,
      gameDuration: record.gameRecord.gameDuration,
      team1Kills: record.gameRecord.team1Kills,
      team2Kills: record.gameRecord.team2Kills,
      createdAt: record.gameRecord.createdAt.toISOString(),
      allPlayers: record.gameRecord.userRecords.map((ur) => ({
        userId: ur.userId,
        username: ur.user.username,
        name: ur.user.name,
        teamNumber: ur.teamNumber,
        assignedPosition: ur.assignedPosition,
        championName: ur.championName,
        kills: ur.kills,
        deaths: ur.deaths,
        assists: ur.assists,
      })),
    }))

    return successResponse({
      records: transformedRecords,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching user records:', error)
    return errorResponse('전적을 불러오는 중 오류가 발생했습니다.', 500)
  }
}
