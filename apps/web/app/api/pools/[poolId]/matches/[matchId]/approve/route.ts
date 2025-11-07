import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// POST /api/pools/[poolId]/matches/[matchId]/approve - Approve match result
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string; matchId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { poolId: poolIdParam, matchId: matchIdParam } = await params
    const poolId = BigInt(poolIdParam)
    const matchId = BigInt(matchIdParam)

    // Check if user is pool owner
    const pool = await prisma.pool.findUnique({
      where: { poolId },
    })

    if (!pool) {
      return errorResponse('Pool을 찾을 수 없습니다.', 404)
    }

    if (pool.ownerId !== userId) {
      return errorResponse('Pool 관리자만 결과를 승인할 수 있습니다.', 403)
    }

    // Get game record with user records
    const gameRecord = await prisma.gameRecord.findUnique({
      where: { gameId: matchId },
      include: {
        userRecords: true,
      },
    })

    if (!gameRecord) {
      return errorResponse('전적을 찾을 수 없습니다.', 404)
    }

    if (gameRecord.status !== 'RESULT_PENDING') {
      return errorResponse('승인 대기 중인 전적만 승인할 수 있습니다.', 400)
    }

    if (gameRecord.isApplied) {
      return errorResponse('이미 점수가 반영된 전적입니다.', 400)
    }

    // Get game duration
    if (!gameRecord.gameDuration) {
      return errorResponse('게임 시간 정보가 없습니다.', 400)
    }

    // Use pre-calculated adjustedScore from result submission
    // No need to recalculate - just apply the scores to users
    const scoreUpdates: { userId: string; score: number }[] = []

    for (const userRecord of gameRecord.userRecords) {
      const isWinner =
        (gameRecord.team1Won && userRecord.teamNumber === 1) ||
        (!gameRecord.team1Won && userRecord.teamNumber === 2)

      // Use the adjustedScore that was calculated during result submission
      const scoreChange = userRecord.adjustedScore || 0

      if (scoreChange === 0) {
        console.warn(`[Score] WARNING: adjustedScore is 0 for user ${userRecord.userId}`)
      }

      scoreUpdates.push({ userId: userRecord.userId, score: scoreChange })

      console.log(`[Score] User ${userRecord.userId} (${userRecord.assignedPosition}): score change = ${scoreChange} (${isWinner ? 'WIN' : 'LOSS'})`)
    }

    console.log('[Approve] Score updates prepared:', scoreUpdates)

    // Use transaction to ensure all updates succeed or all fail
    await prisma.$transaction(async (tx) => {
      // Update game record status
      await tx.gameRecord.update({
        where: { gameId: matchId },
        data: {
          status: 'COMPLETED',
          isApplied: true,
        },
      })

      // Update user scores and champion stats
      for (const scoreUpdate of scoreUpdates) {
        const userRecord = gameRecord.userRecords.find(r => r.userId === scoreUpdate.userId)
        if (!userRecord) continue

        const isWinner =
          (gameRecord.team1Won && userRecord.teamNumber === 1) ||
          (!gameRecord.team1Won && userRecord.teamNumber === 2)

        // Get user's current score and streak before update
        const userBefore = await tx.user.findUnique({
          where: { id: scoreUpdate.userId },
          select: { id: true, username: true, score: true, winLossStreak: true }
        })

        console.log(`[Score] Updating user ${scoreUpdate.userId}: current score = ${userBefore?.score}, change = ${scoreUpdate.score}`)

        // Calculate new win/loss streak
        const currentStreak = userBefore?.winLossStreak || 0
        let newStreak = currentStreak

        if (isWinner) {
          // Win: 연승 중이면 +1, 연패 중이었으면 1연승으로 초기화
          newStreak = currentStreak >= 0 ? currentStreak + 1 : 1
        } else {
          // Loss: 연패 중이면 -1, 연승 중이었으면 1연패(-1)로 초기화
          newStreak = currentStreak <= 0 ? currentStreak - 1 : -1
        }

        console.log(`[Streak] User ${scoreUpdate.userId}: ${currentStreak} -> ${newStreak} (${isWinner ? 'WIN' : 'LOSS'})`)

        // Update user score and streak
        const updatedUser = await tx.user.update({
          where: { id: scoreUpdate.userId },
          data: {
            score: {
              increment: scoreUpdate.score,
            },
            winLossStreak: newStreak,
          },
        })

        console.log(`[Score] User ${scoreUpdate.userId} updated: ${userBefore?.score} -> ${updatedUser.score} (change: ${scoreUpdate.score}), streak: ${newStreak}`)

        // Update champion stats if champion was played
        if (userRecord.championId && userRecord.championName) {
          // Update UserChampionStat (pool-specific)
          const existingUserStat = await tx.userChampionStat.findUnique({
            where: {
              userId_poolId_championId: {
                userId: userRecord.userId,
                poolId,
                championId: userRecord.championId,
              },
            },
          })

          if (existingUserStat) {
            await tx.userChampionStat.update({
              where: {
                userId_poolId_championId: {
                  userId: userRecord.userId,
                  poolId,
                  championId: userRecord.championId,
                },
              },
              data: {
                totalGames: { increment: 1 },
                wins: isWinner ? { increment: 1 } : undefined,
                losses: !isWinner ? { increment: 1 } : undefined,
                totalKills: { increment: userRecord.kills || 0 },
                totalDeaths: { increment: userRecord.deaths || 0 },
                totalAssists: { increment: userRecord.assists || 0 },
                totalCs: { increment: userRecord.cs || 0 },
              },
            })
          } else {
            await tx.userChampionStat.create({
              data: {
                userId: userRecord.userId,
                poolId,
                championId: userRecord.championId,
                championName: userRecord.championName,
                totalGames: 1,
                wins: isWinner ? 1 : 0,
                losses: !isWinner ? 1 : 0,
                totalKills: userRecord.kills || 0,
                totalDeaths: userRecord.deaths || 0,
                totalAssists: userRecord.assists || 0,
                totalCs: userRecord.cs || 0,
              },
            })
          }

          // Update GlobalChampionStat (per position)
          const existingGlobalStat = await tx.globalChampionStat.findFirst({
            where: {
              championId: userRecord.championId,
              position: userRecord.assignedPosition,
            },
          })

          if (existingGlobalStat) {
            const newTotalGames = existingGlobalStat.totalGames + 1
            const newWins = existingGlobalStat.wins + (isWinner ? 1 : 0)
            const newLosses = existingGlobalStat.losses + (!isWinner ? 1 : 0)
            const newTotalKills = existingGlobalStat.totalKills + (userRecord.kills || 0)
            const newTotalDeaths = existingGlobalStat.totalDeaths + (userRecord.deaths || 0)
            const newTotalAssists = existingGlobalStat.totalAssists + (userRecord.assists || 0)
            const newTotalCs = existingGlobalStat.totalCs + (userRecord.cs || 0)

            // Calculate new stats
            const newWinRate = newWins / newTotalGames
            const newAvgKills = newTotalKills / newTotalGames
            const newAvgDeaths = newTotalDeaths / newTotalGames
            const newAvgAssists = newTotalAssists / newTotalGames
            const newAvgCs = newTotalCs / newTotalGames
            const newAvgKda = newAvgDeaths > 0 ? (newAvgKills + newAvgAssists) / newAvgDeaths : newAvgKills + newAvgAssists

            // Calculate tier (will be updated by a separate calculation service later)
            let tier = 'UNRANKED'
            if (newTotalGames >= 10) {
              if (newWinRate >= 0.55) tier = 'S'
              else if (newWinRate >= 0.50) tier = 'A'
              else if (newWinRate >= 0.45) tier = 'B'
              else if (newWinRate >= 0.40) tier = 'C'
              else tier = 'D'
            }

            await tx.globalChampionStat.update({
              where: {
                statId: existingGlobalStat.statId,
              },
              data: {
                totalGames: newTotalGames,
                wins: newWins,
                losses: newLosses,
                totalKills: newTotalKills,
                totalDeaths: newTotalDeaths,
                totalAssists: newTotalAssists,
                totalCs: newTotalCs,
                winRate: newWinRate,
                avgKills: newAvgKills,
                avgDeaths: newAvgDeaths,
                avgAssists: newAvgAssists,
                avgCs: newAvgCs,
                avgKda: newAvgKda,
                tier,
              },
            })
          } else {
            const winRate = isWinner ? 1.0 : 0.0
            const avgKills = userRecord.kills || 0
            const avgDeaths = userRecord.deaths || 0
            const avgAssists = userRecord.assists || 0
            const avgCs = userRecord.cs || 0
            const avgKda = avgDeaths > 0 ? (avgKills + avgAssists) / avgDeaths : avgKills + avgAssists

            await tx.globalChampionStat.create({
              data: {
                championId: userRecord.championId,
                championName: userRecord.championName,
                position: userRecord.assignedPosition,
                totalGames: 1,
                wins: isWinner ? 1 : 0,
                losses: !isWinner ? 1 : 0,
                totalKills: userRecord.kills || 0,
                totalDeaths: userRecord.deaths || 0,
                totalAssists: userRecord.assists || 0,
                totalCs: userRecord.cs || 0,
                winRate,
                avgKills,
                avgDeaths,
                avgAssists,
                avgCs,
                avgKda,
                tier: 'UNRANKED', // Not enough games yet
              },
            })
          }
        }
      }

      console.log(`[Approve] Match ${matchId} approved by user ${userId}`)

      // Verify all scores were updated
      console.log('[Approve] Verifying score updates...')
      for (const scoreUpdate of scoreUpdates) {
        const verifyUser = await tx.user.findUnique({
          where: { id: scoreUpdate.userId },
          select: { id: true, username: true, score: true, winLossStreak: true }
        })
        console.log(`[Approve] User ${scoreUpdate.userId} final score: ${verifyUser?.score}, streak: ${verifyUser?.winLossStreak}`)
      }
    })

    return successResponse({ message: '결과가 승인되었습니다.' })
  } catch (error) {
    console.error('Error approving result:', error)
    return errorResponse('결과 승인 중 오류가 발생했습니다.', 500)
  }
}
