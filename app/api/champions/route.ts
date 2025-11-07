import { NextRequest } from 'next/server'
import { successResponse, errorResponse } from '@/app/lib/api-response'

// Cache for champion data
let championCache: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

// GET /api/champions - Get champion list from Riot Data Dragon
export async function GET(request: NextRequest) {
  try {
    // Check cache first
    const now = Date.now()
    if (championCache && now - cacheTimestamp < CACHE_DURATION) {
      return successResponse(championCache)
    }

    // Get latest version
    const versionRes = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
    if (!versionRes.ok) {
      return errorResponse('버전 정보를 가져오는데 실패했습니다.', 500)
    }
    const versions = await versionRes.json()
    const latestVersion = versions[0]

    // Get champion data
    const championRes = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`
    )
    if (!championRes.ok) {
      return errorResponse('챔피언 데이터를 가져오는데 실패했습니다.', 500)
    }
    const championData = await championRes.json()

    // Transform data to array format
    const champions = Object.values(championData.data).map((champ: any) => ({
      id: champ.id,
      key: champ.key,
      name: champ.name,
      title: champ.title,
      image: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champ.id}.png`,
      tags: champ.tags,
    }))

    // Sort by name
    champions.sort((a: any, b: any) => a.name.localeCompare(b.name, 'ko'))

    const result = {
      version: latestVersion,
      champions,
    }

    // Update cache
    championCache = result
    cacheTimestamp = now

    return successResponse(result)
  } catch (error) {
    console.error('Error fetching champions:', error)
    return errorResponse('챔피언 목록을 불러오는 중 오류가 발생했습니다.', 500)
  }
}
