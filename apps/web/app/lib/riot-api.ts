// Riot API integration for fetching summoner rank information

const RIOT_API_KEY = process.env.RIOT_API_KEY

// API endpoints
const ASIA_API = 'https://asia.api.riotgames.com'
const KR_API = 'https://kr.api.riotgames.com'

interface RiotAccount {
  puuid: string
  gameName: string
  tagLine: string
}

interface Summoner {
  id: string
  accountId: string
  puuid: string
  name: string
  summonerLevel: number
}

interface LeagueEntry {
  queueType: string
  tier: string
  rank: string
  leaguePoints: number
  wins: number
  losses: number
}

/**
 * Calculate score based on tier, division, and LP
 *
 * Tier ranges (each tier = 400 points):
 * - Iron: 0-399
 * - Bronze: 400-799
 * - Silver: 800-1199
 * - Gold: 1200-1599
 * - Platinum: 1600-1999
 * - Emerald: 2000-2399
 * - Diamond: 2400-2799
 * - Master: 2800
 * - Grandmaster: 2900
 * - Challenger: 3000
 *
 * Division ranges (each division = 100 points):
 * - IV: 0-99
 * - III: 100-199
 * - II: 200-299
 * - I: 300-399
 */
export function calculateScoreFromRank(tier: string, rank: string, lp: number): number {
  const tierUpper = tier.toUpperCase()
  const rankUpper = rank.toUpperCase()

  // Tier base scores
  const tierScores: { [key: string]: number } = {
    'IRON': 0,
    'BRONZE': 400,
    'SILVER': 800,
    'GOLD': 1200,
    'PLATINUM': 1600,
    'EMERALD': 2000,
    'DIAMOND': 2400,
    'MASTER': 2800,
    'GRANDMASTER': 2900,
    'CHALLENGER': 3000,
  }

  // Division scores (only for Iron - Diamond)
  const divisionScores: { [key: string]: number } = {
    'IV': 0,
    'III': 100,
    'II': 200,
    'I': 300,
  }

  const tierBase = tierScores[tierUpper] ?? 0

  // Master, Grandmaster, Challenger don't have divisions
  if (['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(tierUpper)) {
    return tierBase + lp
  }

  // For tiered ranks (Iron - Diamond)
  const divisionScore = divisionScores[rankUpper] ?? 0
  return tierBase + divisionScore + lp
}

/**
 * Get Riot account by Riot ID (gameName#tagLine)
 */
async function getRiotAccount(gameName: string, tagLine: string): Promise<RiotAccount | null> {
  try {
    const url = `${ASIA_API}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
    const res = await fetch(url, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY || '',
      },
    })

    if (!res.ok) {
      console.error(`Riot Account API error: ${res.status} ${res.statusText}`)
      return null
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching Riot account:', error)
    return null
  }
}

/**
 * Get summoner by PUUID
 */
async function getSummonerByPUUID(puuid: string): Promise<Summoner | null> {
  try {
    const url = `${KR_API}/lol/summoner/v4/summoners/by-puuid/${puuid}`
    const res = await fetch(url, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY || '',
      },
    })

    if (!res.ok) {
      console.error(`Summoner API error: ${res.status} ${res.statusText}`)
      return null
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching summoner:', error)
    return null
  }
}

/**
 * Get league entries (rank info) by summoner ID
 */
async function getLeagueEntries(summonerId: string): Promise<LeagueEntry[]> {
  try {
    const url = `${KR_API}/lol/league/v4/entries/by-summoner/${summonerId}`
    const res = await fetch(url, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY || '',
      },
    })

    if (!res.ok) {
      console.error(`League API error: ${res.status} ${res.statusText}`)
      return []
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching league entries:', error)
    return []
  }
}

/**
 * Get ranked score for a Riot ID
 * Returns the score based on Solo/Duo Ranked queue
 * Returns 0 if unranked or if there's an error
 */
export async function getRankedScore(riotId: string, riotTag: string): Promise<number> {
  if (!RIOT_API_KEY || RIOT_API_KEY === 'YOUR_RIOT_API_KEY_HERE') {
    console.warn('Riot API key not configured')
    return 0
  }

  try {
    // Step 1: Get account by Riot ID
    const account = await getRiotAccount(riotId, riotTag)
    if (!account) {
      console.log(`Account not found for ${riotId}#${riotTag}`)
      return 0
    }

    // Step 2: Get summoner by PUUID
    const summoner = await getSummonerByPUUID(account.puuid)
    if (!summoner) {
      console.log(`Summoner not found for PUUID ${account.puuid}`)
      return 0
    }

    // Step 3: Get league entries
    const leagueEntries = await getLeagueEntries(summoner.id)
    if (leagueEntries.length === 0) {
      console.log(`No ranked data found for ${riotId}#${riotTag}`)
      return 0
    }

    // Find Solo/Duo queue entry
    const soloQueue = leagueEntries.find(entry => entry.queueType === 'RANKED_SOLO_5x5')
    if (!soloQueue) {
      console.log(`No Solo/Duo queue data found for ${riotId}#${riotTag}`)
      return 0
    }

    // Calculate score
    const score = calculateScoreFromRank(soloQueue.tier, soloQueue.rank, soloQueue.leaguePoints)
    console.log(`Score calculated for ${riotId}#${riotTag}: ${soloQueue.tier} ${soloQueue.rank} ${soloQueue.leaguePoints}LP = ${score} points`)

    return score
  } catch (error) {
    console.error('Error getting ranked score:', error)
    return 0
  }
}
