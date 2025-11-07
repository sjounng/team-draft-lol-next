import { User } from '@repo/database'

const POSITIONS = ['TOP', 'JGL', 'MID', 'ADC', 'SUP'] as const
type Position = typeof POSITIONS[number]

export interface TeamPlayer {
  userId: string
  username: string
  name: string | null
  riotId: string | null
  riotTag: string | null
  originalScore: number
  adjustedScore: number
  assignedPosition: Position
  mainLane: string | null
  subLane: string | null
  positionType: 'MAIN' | 'SUB' | 'FILL'
}

export interface Team {
  teamNumber: number
  players: TeamPlayer[]
  totalScore: number
  topPlayer: TeamPlayer
  junglePlayer: TeamPlayer
  midPlayer: TeamPlayer
  adcPlayer: TeamPlayer
  supportPlayer: TeamPlayer
}

export interface TeamGenerationResult {
  team1: Team
  team2: Team
  scoreDifference: number
  preferredPositionCount: number  // MAIN + SUB positions
  preferredPositionLowScoreBonus: number  // Bonus for low score players in MAIN/SUB
  currentCombination?: number
  totalCombinations?: number
  availableCombinations?: number[]
}

// Cache for combinations
let cachedCombinations: TeamGenerationResult[] = []
let lastUserIds: string[] = []

export function generateTeams(users: User[], combinationIndex: number = 0): TeamGenerationResult {
  if (users.length !== 10) {
    throw new Error('Exactly 10 users are required')
  }

  // Sort users by ID for consistency
  const sortedUsers = [...users].sort((a, b) =>
    a.id.localeCompare(b.id)
  )

  // Check if we need to recalculate combinations
  const currentUserIds = sortedUsers.map(u => u.id).sort()
  const needsRecalculation = cachedCombinations.length === 0 ||
                            JSON.stringify(currentUserIds) !== JSON.stringify(lastUserIds)

  if (needsRecalculation) {
    cachedCombinations = calculateAllCombinations(sortedUsers)
    lastUserIds = currentUserIds
  }

  // Ensure we have at least one combination
  if (cachedCombinations.length === 0) {
    throw new Error('Failed to generate team combinations')
  }

  // Wrap around if index is out of bounds
  if (combinationIndex >= cachedCombinations.length || combinationIndex < 0) {
    combinationIndex = 0
  }

  const result = { ...cachedCombinations[combinationIndex] }
  result.currentCombination = combinationIndex + 1
  result.totalCombinations = cachedCombinations.length
  result.availableCombinations = Array.from(
    { length: cachedCombinations.length },
    (_, i) => i + 1
  )

  return result
}

function calculateAllCombinations(users: User[]): TeamGenerationResult[] {
  const combinations: TeamGenerationResult[] = []
  const uniqueCombinations = new Set<string>()

  // Find max score for bonus calculation
  const maxScore = Math.max(...users.map(u => u.score || 0))

  // Generate all combinations of 5 users from 10
  const team1Combinations = generateCombinations(users, 5)

  for (const team1Users of team1Combinations) {
    const team2Users = users.filter(u => !team1Users.includes(u))

    // Create unique key to avoid duplicate combinations
    const team1Ids = team1Users.map(u => u.id).sort()
    const team2Ids = team2Users.map(u => u.id).sort()

    let combinationKey: string
    let finalTeam1: User[]
    let finalTeam2: User[]

    if (team1Ids[0] < team2Ids[0]) {
      combinationKey = `${team1Ids.join(',')}:${team2Ids.join(',')}`
      finalTeam1 = team1Users
      finalTeam2 = team2Users
    } else {
      combinationKey = `${team2Ids.join(',')}:${team1Ids.join(',')}`
      finalTeam1 = team2Users
      finalTeam2 = team1Users
    }

    if (uniqueCombinations.has(combinationKey)) {
      continue
    }
    uniqueCombinations.add(combinationKey)

    // Assign positions to each team
    const team1 = assignPositions(finalTeam1, 1)
    const team2 = assignPositions(finalTeam2, 2)

    const scoreDifference = Math.abs(team1.totalScore - team2.totalScore)
    const preferredPositionCount = calculatePreferredPositionCount(team1, team2)
    const preferredPositionLowScoreBonus = calculatePreferredPositionLowScoreBonus(team1, team2, maxScore)

    combinations.push({
      team1,
      team2,
      scoreDifference,
      preferredPositionCount,
      preferredPositionLowScoreBonus
    })
  }

  // Sort by priority:
  // 1) Score difference under 800 points (hard requirement)
  // 2) More players in their preferred positions (MAIN + SUB)
  // 3) Low score players in preferred positions (more is better)
  // 4) Score difference (smaller is better)
  const scoreThreshold = 800

  // First, filter combinations with score difference under threshold
  const withinThreshold = combinations.filter(c => c.scoreDifference <= scoreThreshold)

  // If we have enough combinations within threshold, use those
  // Otherwise, use all combinations to ensure we have at least 10
  const candidateCombinations = withinThreshold.length >= 10 ? withinThreshold : combinations

  const sorted = candidateCombinations.sort((a, b) => {
    // 1st: Prioritize combinations within score threshold
    const aWithinThreshold = a.scoreDifference <= scoreThreshold
    const bWithinThreshold = b.scoreDifference <= scoreThreshold

    if (aWithinThreshold !== bWithinThreshold) {
      return bWithinThreshold ? 1 : -1
    }

    // 2nd: More players in their preferred positions (MAIN/SUB)
    if (a.preferredPositionCount !== b.preferredPositionCount) {
      return b.preferredPositionCount - a.preferredPositionCount
    }

    // 3rd: Bonus for low score players in preferred positions
    if (a.preferredPositionLowScoreBonus !== b.preferredPositionLowScoreBonus) {
      return b.preferredPositionLowScoreBonus - a.preferredPositionLowScoreBonus
    }

    // 4th: Smaller score difference
    return a.scoreDifference - b.scoreDifference
  })

  // Return up to 10 combinations, or all if less than 10 available
  return sorted.slice(0, 10)
}

function calculatePreferredPositionCount(team1: Team, team2: Team): number {
  const team1Count = team1.players.filter(
    p => p.positionType === 'MAIN' || p.positionType === 'SUB'
  ).length
  const team2Count = team2.players.filter(
    p => p.positionType === 'MAIN' || p.positionType === 'SUB'
  ).length
  return team1Count + team2Count
}

function calculatePreferredPositionLowScoreBonus(team1: Team, team2: Team, maxScore: number): number {
  const team1Bonus = team1.players
    .filter(p => p.positionType === 'MAIN' || p.positionType === 'SUB')
    .reduce((sum, p) => sum + (maxScore - p.originalScore), 0)

  const team2Bonus = team2.players
    .filter(p => p.positionType === 'MAIN' || p.positionType === 'SUB')
    .reduce((sum, p) => sum + (maxScore - p.originalScore), 0)

  return team1Bonus + team2Bonus
}

function assignPositions(teamUsers: User[], teamNumber: number): Team {
  const assignedPositions: Partial<Record<Position, TeamPlayer>> = {}
  const teamPlayerResponses: TeamPlayer[] = []
  const assignedUserIds = new Set<string>()

  // Step 1: Assign users whose main lane matches the position (lowest score first)
  for (const position of POSITIONS) {
    const bestUser = teamUsers
      .filter(u => !assignedUserIds.has(u.id))
      .filter(u => position === u.mainLane)
      .sort((a, b) => (a.score || 0) - (b.score || 0))[0]

    if (bestUser) {
      const teamPlayer = createTeamPlayer(bestUser, position, 'MAIN', 1.0)
      assignedPositions[position] = teamPlayer
      teamPlayerResponses.push(teamPlayer)
      assignedUserIds.add(bestUser.id)
    }
  }

  // Step 2: Assign users whose sub lane matches remaining positions
  for (const position of POSITIONS) {
    if (!assignedPositions[position]) {
      const bestUser = teamUsers
        .filter(u => !assignedUserIds.has(u.id))
        .filter(u => position === u.subLane)
        .sort((a, b) => (a.score || 0) - (b.score || 0))[0]

      if (bestUser) {
        const scoreRatio = bestUser.mainLane === 'SUP' ? 0.90 : 0.95
        const teamPlayer = createTeamPlayer(bestUser, position, 'SUB', scoreRatio)
        assignedPositions[position] = teamPlayer
        teamPlayerResponses.push(teamPlayer)
        assignedUserIds.add(bestUser.id)
      }
    }
  }

  // Step 3: Fill remaining positions with remaining users (lowest score first)
  const remainingUsers = teamUsers
    .filter(u => !assignedUserIds.has(u.id))
    .sort((a, b) => (a.score || 0) - (b.score || 0))

  for (const user of remainingUsers) {
    for (const position of POSITIONS) {
      if (!assignedPositions[position]) {
        const scoreRatio = user.mainLane === 'SUP' ? 0.80 : 0.90
        const teamPlayer = createTeamPlayer(user, position, 'FILL', scoreRatio)
        assignedPositions[position] = teamPlayer
        teamPlayerResponses.push(teamPlayer)
        assignedUserIds.add(user.id)
        break
      }
    }
  }

  const totalScore = teamPlayerResponses.reduce((sum, p) => sum + p.adjustedScore, 0)

  return {
    teamNumber,
    players: teamPlayerResponses,
    totalScore,
    topPlayer: assignedPositions.TOP!,
    junglePlayer: assignedPositions.JGL!,
    midPlayer: assignedPositions.MID!,
    adcPlayer: assignedPositions.ADC!,
    supportPlayer: assignedPositions.SUP!
  }
}

function createTeamPlayer(
  user: User,
  position: Position,
  positionType: 'MAIN' | 'SUB' | 'FILL',
  scoreRatio: number
): TeamPlayer {
  const adjustedScore = Math.round((user.score || 0) * scoreRatio)

  return {
    userId: user.id,
    username: user.username,
    name: user.name,
    riotId: user.riotId,
    riotTag: user.riotTag,
    originalScore: user.score || 0,
    adjustedScore,
    assignedPosition: position,
    mainLane: user.mainLane,
    subLane: user.subLane,
    positionType
  }
}

function generateCombinations<T>(items: T[], r: number): T[][] {
  const combinations: T[][] = []

  function helper(start: number, current: T[]) {
    if (current.length === r) {
      combinations.push([...current])
      return
    }

    for (let i = start; i < items.length; i++) {
      current.push(items[i])
      helper(i + 1, current)
      current.pop()
    }
  }

  helper(0, [])
  return combinations
}
