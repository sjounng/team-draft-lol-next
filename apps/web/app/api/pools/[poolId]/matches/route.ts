import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/pools/[poolId]/matches
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { poolId: poolIdParam } = await params
    const poolId = BigInt(poolIdParam)

    // Check if user is a member of the pool
    const membership = await prisma.poolMember.findUnique({
      where: {
        poolId_userId: {
          poolId,
          userId,
        },
      },
    })

    if (!membership) {
      return errorResponse('이 Pool에 접근할 권한이 없습니다.', 403)
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') // DRAFT_PENDING, DRAFT_COMPLETE, RESULT_PENDING, COMPLETED

    // Build where clause
    const where: any = { poolId }
    if (status) {
      where.status = status
    }

    // Fetch matches with creator info
    const matches = await prisma.gameRecord.findMany({
      where,
      include: {
        userRecords: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                score: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform data
    const transformedMatches = matches.map((match) => {
      const team1Data = JSON.parse(match.team1Data)
      const team2Data = JSON.parse(match.team2Data)

      // Update team data with latest champion info from userRecords
      const team1Players = team1Data.players.map((player: any) => {
        const userRecord = match.userRecords.find(
          (r) => r.userId === player.userId && r.teamNumber === 1
        )
        return {
          ...player,
          championId: userRecord?.championId || player.championId,
          championName: userRecord?.championName || player.championName,
        }
      })

      const team2Players = team2Data.players.map((player: any) => {
        const userRecord = match.userRecords.find(
          (r) => r.userId === player.userId && r.teamNumber === 2
        )
        return {
          ...player,
          championId: userRecord?.championId || player.championId,
          championName: userRecord?.championName || player.championName,
        }
      })

      return {
        gameId: match.gameId.toString(),
        creatorId: match.creatorId,
        status: match.status,
        team1Data: {
          ...team1Data,
          players: team1Players,
        },
        team2Data: {
          ...team2Data,
          players: team2Players,
        },
        banPickData: match.banPickData ? JSON.parse(match.banPickData) : null,
        team1Won: match.team1Won,
        team1Kills: match.team1Kills,
        team2Kills: match.team2Kills,
        team1Gold: match.team1Gold,
        team2Gold: match.team2Gold,
        isApplied: match.isApplied,
        createdAt: match.createdAt.toISOString(),
        updatedAt: match.updatedAt.toISOString(),
        userRecords: match.userRecords,
      }
    })

    return successResponse(transformedMatches)
  } catch (error) {
    console.error('Error fetching matches:', error)
    return errorResponse('전적 목록을 불러오는 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/pools/[poolId]/matches - Create new match from team generation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { poolId: poolIdParam } = await params
    const poolId = BigInt(poolIdParam)

    // Check if user is a member of the pool
    const membership = await prisma.poolMember.findUnique({
      where: {
        poolId_userId: {
          poolId,
          userId,
        },
      },
    })

    if (!membership) {
      return errorResponse('이 Pool에 접근할 권한이 없습니다.', 403)
    }

    const body = await request.json()
    const { team1, team2 } = body

    if (!team1 || !team2 || !team1.players || !team2.players) {
      return errorResponse('팀 데이터가 올바르지 않습니다.')
    }

    if (team1.players.length !== 5 || team2.players.length !== 5) {
      return errorResponse('각 팀은 5명의 플레이어가 필요합니다.')
    }

    // Create game record and user records in a transaction
    const gameRecord = await prisma.$transaction(async (tx) => {
      const record = await tx.gameRecord.create({
        data: {
          creatorId: userId,
          poolId,
          status: 'DRAFT_PENDING',
          team1Data: JSON.stringify(team1),
          team2Data: JSON.stringify(team2),
        },
      })

      // Create user game records for each player
      const userRecordsData = [
        ...team1.players.map((player: any) => ({
          gameId: record.gameId,
          userId: player.userId,
          teamNumber: 1,
          assignedPosition: player.assignedPosition,
          originalScore: player.originalScore || player.score || 0,
          adjustedScore: 0, // Will be calculated when result is submitted
        })),
        ...team2.players.map((player: any) => ({
          gameId: record.gameId,
          userId: player.userId,
          teamNumber: 2,
          assignedPosition: player.assignedPosition,
          originalScore: player.originalScore || player.score || 0,
          adjustedScore: 0, // Will be calculated when result is submitted
        })),
      ]

      await tx.userGameRecord.createMany({
        data: userRecordsData,
      })

      return record
    })

    return successResponse({
      gameId: gameRecord.gameId.toString(),
      status: gameRecord.status,
      createdAt: gameRecord.createdAt.toISOString(),
    })
  } catch (error) {
    console.error('Error creating match:', error)
    return errorResponse('전적 생성 중 오류가 발생했습니다.', 500)
  }
}
