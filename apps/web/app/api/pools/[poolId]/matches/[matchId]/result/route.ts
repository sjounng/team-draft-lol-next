import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'
import { calculateScore } from '@/app/lib/score-calculator'

interface PlayerStats {
  userId: string
  kills: number
  deaths: number
  assists: number
  cs: number
}

// POST /api/pools/[poolId]/matches/[matchId]/result - Submit match result
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
    const { team1Won, team1Kills, team2Kills, team1Gold, team2Gold, gameDuration, playerStats } = body

    // Validate
    if (typeof team1Won !== 'boolean') {
      return errorResponse('승리 팀을 선택해주세요.')
    }

    if (!gameDuration || typeof gameDuration !== 'number' || gameDuration <= 0) {
      return errorResponse('게임 시간을 입력해주세요.')
    }

    if (!Array.isArray(playerStats) || playerStats.length !== 10) {
      return errorResponse('플레이어 통계가 올바르지 않습니다.')
    }

    // Get game record
    const gameRecord = await prisma.gameRecord.findUnique({
      where: { gameId: matchId },
    })

    if (!gameRecord) {
      return errorResponse('전적을 찾을 수 없습니다.', 404)
    }

    if (gameRecord.status !== 'DRAFT_COMPLETE' && gameRecord.status !== 'RESULT_PENDING') {
      return errorResponse('밴픽이 완료된 전적만 결과를 입력할 수 있습니다.', 400)
    }

    // Update game record with result
    await prisma.gameRecord.update({
      where: { gameId: matchId },
      data: {
        status: 'RESULT_PENDING',
        team1Won,
        team1Kills,
        team2Kills,
        team1Gold,
        team2Gold,
        gameDuration,
      },
    })

    // Update user game records with player stats AND calculate predicted scores
    const gameDurationMinutes = gameDuration / 60

    // Get all user records for this game
    const allUserRecords = await prisma.userGameRecord.findMany({
      where: { gameId: matchId },
      include: {
        user: {
          select: { score: true }
        }
      }
    })

    for (const stats of playerStats as PlayerStats[]) {
      const userRecord = allUserRecords.find(r => r.userId === stats.userId)
      if (!userRecord) continue

      // Determine if winner
      const isWinner = (team1Won && userRecord.teamNumber === 1) || (!team1Won && userRecord.teamNumber === 2)

      // Find lane opponent
      const opponentTeam = userRecord.teamNumber === 1 ? 2 : 1
      const opponentRecord = allUserRecords.find(
        r => r.teamNumber === opponentTeam && r.assignedPosition === userRecord.assignedPosition
      )

      let predictedScore = 0

      if (opponentRecord) {
        // Get opponent stats
        const opponentStats = (playerStats as PlayerStats[]).find(s => s.userId === opponentRecord.userId)

        if (opponentStats) {
          // Calculate streak
          const userRecentGames = await prisma.gameRecord.findMany({
            where: {
              poolId,
              status: 'COMPLETED',
              isApplied: true,
              gameId: { not: matchId },
              userRecords: {
                some: { userId: stats.userId }
              }
            },
            include: {
              userRecords: {
                where: { userId: stats.userId }
              }
            },
            orderBy: { createdAt: 'desc' },
            take: 10
          })

          let streakCount = 0
          if (userRecentGames.length > 0) {
            const recentResults = userRecentGames.map(game => {
              const userRec = game.userRecords[0]
              const userWon = (game.team1Won && userRec.teamNumber === 1) || (!game.team1Won && userRec.teamNumber === 2)
              return userWon
            })

            const firstResult = recentResults[0]
            let count = 0
            for (const result of recentResults) {
              if (result === firstResult) count++
              else break
            }
            streakCount = firstResult ? count : -count
          }

          // Get team total kills
          const teamTotalKills = userRecord.teamNumber === 1 ? team1Kills : team2Kills

          // Calculate predicted score
          predictedScore = calculateScore({
            userRecord: {
              userId: userRecord.userId,
              teamNumber: userRecord.teamNumber,
              assignedPosition: userRecord.assignedPosition,
              kills: stats.kills,
              deaths: stats.deaths,
              assists: stats.assists,
              cs: stats.cs,
              championId: userRecord.championId,
              championName: userRecord.championName,
              originalScore: userRecord.user.score
            },
            opponentRecord: {
              userId: opponentRecord.userId,
              teamNumber: opponentRecord.teamNumber,
              assignedPosition: opponentRecord.assignedPosition,
              kills: opponentStats.kills,
              deaths: opponentStats.deaths,
              assists: opponentStats.assists,
              cs: opponentStats.cs,
              championId: opponentRecord.championId,
              championName: opponentRecord.championName,
              originalScore: opponentRecord.user.score
            },
            isWinner,
            streakCount,
            gameDurationMinutes,
            teamTotalKills
          })
        }
      }

      console.log(`[Result] Saving stats for user ${stats.userId}: K/D/A/CS = ${stats.kills}/${stats.deaths}/${stats.assists}/${stats.cs}, adjustedScore = ${predictedScore}`)

      // Update with stats and predicted score
      await prisma.userGameRecord.updateMany({
        where: {
          gameId: matchId,
          userId: stats.userId,
        },
        data: {
          kills: stats.kills,
          deaths: stats.deaths,
          assists: stats.assists,
          cs: stats.cs,
          adjustedScore: predictedScore, // 예상 점수 변화량 저장
        },
      })
    }

    console.log(`[Result] Match ${matchId} result submitted by user ${userId}`)
    console.log(`[Result] All player stats saved with adjusted scores`)

    return successResponse({ message: '결과가 제출되었습니다.' })
  } catch (error) {
    console.error('Error submitting result:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })
    return errorResponse('결과 제출 중 오류가 발생했습니다.', 500)
  }
}
