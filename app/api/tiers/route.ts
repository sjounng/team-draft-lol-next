import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/tiers - Get champion tier list by position
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { searchParams } = new URL(request.url)
    const position = searchParams.get('position') || 'TOP'

    // Validate position
    const validPositions = ['TOP', 'JGL', 'MID', 'ADC', 'SUP']
    if (!validPositions.includes(position)) {
      return errorResponse('유효하지 않은 포지션입니다.', 400)
    }

    // Get champion stats for the position
    const stats = await prisma.globalChampionStat.findMany({
      where: {
        position,
      },
    })

    // Calculate SCORE for each champion and transform data
    const championsWithScore = stats.map((champ) => {
      // Calculate CS per minute (assuming average game duration of 30 minutes)
      const csPerMin = champ.avgCs / 30

      // Calculate SCORE: Win Rate (as percentage) + KDA + CS/min
      const score = (champ.winRate * 100) + champ.avgKda + csPerMin

      return {
        statId: champ.statId.toString(),
        championId: champ.championId,
        championName: champ.championName,
        position: champ.position,
        totalGames: champ.totalGames,
        wins: champ.wins,
        losses: champ.losses,
        winRate: champ.winRate,
        pickRate: champ.pickRate,
        avgKda: champ.avgKda,
        avgKills: champ.avgKills,
        avgDeaths: champ.avgDeaths,
        avgAssists: champ.avgAssists,
        avgCs: champ.avgCs,
        tier: '',
        score,
        csPerMin,
        updatedAt: champ.updatedAt.toISOString(),
      }
    })

    // Sort by score in descending order
    const sortedChampions = championsWithScore.sort((a, b) => b.score - a.score)

    // Calculate tier based on percentile
    // S: Top 10%, A: Next 25%, B: Next 30%, C: Next 25%, D: Bottom 10%
    const totalChampions = sortedChampions.length
    sortedChampions.forEach((champ, index) => {
      const percentile = (index / totalChampions) * 100

      if (percentile < 10) {
        champ.tier = 'S'
      } else if (percentile < 35) { // 10% + 25%
        champ.tier = 'A'
      } else if (percentile < 65) { // 35% + 30%
        champ.tier = 'B'
      } else if (percentile < 90) { // 65% + 25%
        champ.tier = 'C'
      } else {
        champ.tier = 'D'
      }
    })

    // Get total games played in this position (for pick rate calculation)
    const totalPositionGames = await prisma.userGameRecord.count({
      where: {
        assignedPosition: position,
        gameRecord: {
          isApplied: true,
        },
      },
    })

    return successResponse({
      position,
      champions: sortedChampions,
      totalPositionGames,
    })
  } catch (error) {
    console.error('Error fetching tiers:', error)
    return errorResponse('티어 목록을 불러오는 중 오류가 발생했습니다.', 500)
  }
}
