// Shared score calculation logic for MMR system

interface UserStats {
  userId: string
  teamNumber: number
  assignedPosition: string
  kills: number | null
  deaths: number | null
  assists: number | null
  cs: number | null
  championId: string | null
  championName: string | null
  originalScore: number
}

interface ScoreCalculationParams {
  userRecord: UserStats
  opponentRecord: UserStats
  isWinner: boolean
  streakCount: number
  gameDurationMinutes: number
  teamTotalKills: number
}

export function calculateScore(params: ScoreCalculationParams): number {
  const {
    userRecord,
    opponentRecord,
    isWinner,
    streakCount,
    gameDurationMinutes,
    teamTotalKills,
  } = params

  // Constants
  const BASE_WIN_SCORE = 30
  const BASE_LOSS_SCORE = -30
  const K_PERF = 8 // Performance difference coefficient
  const K_KP = 10 // Kill participation coefficient

  // Weights for performance calculation
  const W_KILLS = 2.0
  const W_ASSISTS = 1.0
  const W_CS = 0.1
  const W_DEATHS = 3.0

  // Prevent division by zero
  let duration = gameDurationMinutes
  if (duration <= 0) {
    duration = 1
  }

  // User stats
  const kills = userRecord.kills || 0
  const deaths = userRecord.deaths || 0
  const assists = userRecord.assists || 0
  const cs = userRecord.cs || 0

  // Opponent stats
  const oppKills = opponentRecord.kills || 0
  const oppDeaths = opponentRecord.deaths || 0
  const oppAssists = opponentRecord.assists || 0
  const oppCs = opponentRecord.cs || 0

  // 1. Calculate normalized performance score
  // Perf = kills/min * w_k + assists/min * w_a + cs/min * w_cs - deaths/min * w_d
  const killsPerMin = kills / duration
  const assistsPerMin = assists / duration
  const csPerMin = cs / duration
  const deathsPerMin = deaths / duration

  const userPerf =
    killsPerMin * W_KILLS +
    assistsPerMin * W_ASSISTS +
    csPerMin * W_CS -
    deathsPerMin * W_DEATHS

  // Opponent performance
  const oppKillsPerMin = oppKills / duration
  const oppAssistsPerMin = oppAssists / duration
  const oppCsPerMin = oppCs / duration
  const oppDeathsPerMin = oppDeaths / duration

  const oppPerf =
    oppKillsPerMin * W_KILLS +
    oppAssistsPerMin * W_ASSISTS +
    oppCsPerMin * W_CS -
    oppDeathsPerMin * W_DEATHS

  // Performance difference
  const perfDiff = userPerf - oppPerf

  // 2. Calculate Kill Participation (KP)
  // KP = (kills + assists) / team_total_kills
  let kpBonus = 0
  if (teamTotalKills > 0) {
    const kp = (kills + assists) / teamTotalKills
    const avgKp = 0.5 // Average KP for 10 players
    kpBonus = (kp - avgKp) * K_KP
  }

  // 3. Base score + performance adjustment
  const baseScore = isWinner ? BASE_WIN_SCORE : BASE_LOSS_SCORE
  let totalScore = baseScore + K_PERF * perfDiff + kpBonus

  // 4. Streak bonus/penalty
  if (streakCount > 2 && isWinner) {
    totalScore += streakCount * 2 // Win streak bonus
  } else if (streakCount < -2 && !isWinner) {
    totalScore += streakCount * 2 // Loss streak penalty (negative)
  }

  // 5. Apply bounds to keep average around ±30
  // Maximum gain/loss capped
  if (isWinner) {
    totalScore = Math.max(10, Math.min(50, totalScore)) // Win: 10~50
  } else {
    totalScore = Math.max(-50, Math.min(-10, totalScore)) // Loss: -50~-10
  }

  return Math.round(totalScore)
}
