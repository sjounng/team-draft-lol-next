import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/users/me/champions - Get user's top champions
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '3')

    // Get user's played champions from UserGameRecord
    const userRecords = await prisma.userGameRecord.findMany({
      where: {
        userId,
        championId: {
          not: null,
        },
        gameRecord: {
          isApplied: true, // Only count approved games
        },
      },
      include: {
        gameRecord: true,
      },
    })

    // Aggregate stats by champion
    const championStats = new Map<
      string,
      {
        championId: string
        championName: string
        totalGames: number
        wins: number
        losses: number
        totalKills: number
        totalDeaths: number
        totalAssists: number
        totalCs: number
        totalGameDuration: number
      }
    >()

    for (const record of userRecords) {
      if (!record.championId || !record.championName) continue

      const isWin =
        (record.gameRecord.team1Won && record.teamNumber === 1) ||
        (!record.gameRecord.team1Won && record.teamNumber === 2)

      const key = record.championId
      const existing = championStats.get(key) || {
        championId: record.championId,
        championName: record.championName,
        totalGames: 0,
        wins: 0,
        losses: 0,
        totalKills: 0,
        totalDeaths: 0,
        totalAssists: 0,
        totalCs: 0,
        totalGameDuration: 0,
      }

      existing.totalGames++
      if (isWin) {
        existing.wins++
      } else {
        existing.losses++
      }
      existing.totalKills += record.kills || 0
      existing.totalDeaths += record.deaths || 0
      existing.totalAssists += record.assists || 0
      existing.totalCs += record.cs || 0
      existing.totalGameDuration += record.gameRecord.gameDuration || 1800 // Default 30 min

      championStats.set(key, existing)
    }

    // Calculate derived stats and sort by total games
    const champions = Array.from(championStats.values())
      .map((stat) => {
        const avgKills = stat.totalGames > 0 ? stat.totalKills / stat.totalGames : 0
        const avgDeaths = stat.totalGames > 0 ? stat.totalDeaths / stat.totalGames : 0
        const avgAssists = stat.totalGames > 0 ? stat.totalAssists / stat.totalGames : 0
        const avgCs = stat.totalGames > 0 ? stat.totalCs / stat.totalGames : 0
        const avgGameDuration = stat.totalGames > 0 ? stat.totalGameDuration / stat.totalGames : 1800
        const csPerMin = avgCs / (avgGameDuration / 60)
        const kda = avgDeaths > 0 ? (avgKills + avgAssists) / avgDeaths : avgKills + avgAssists
        const winRate = stat.totalGames > 0 ? stat.wins / stat.totalGames : 0

        return {
          championId: stat.championId,
          championName: stat.championName,
          totalGames: stat.totalGames,
          wins: stat.wins,
          losses: stat.losses,
          winRate,
          kda,
          avgKills,
          avgDeaths,
          avgAssists,
          avgCs,
          csPerMin,
        }
      })
      .sort((a, b) => b.totalGames - a.totalGames)
      .slice(0, limit)

    return successResponse(champions)
  } catch (error) {
    console.error('Error fetching user champions:', error)
    return errorResponse('챔피언 통계를 불러오는 중 오류가 발생했습니다.', 500)
  }
}
