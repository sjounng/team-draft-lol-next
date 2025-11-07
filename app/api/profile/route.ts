import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'
import { getRankedScore, verifyRiotAccount } from '@/app/lib/riot-api'

// PUT /api/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { name, riotId, riotTag, mainLane, subLane } = body

    // Validate required fields
    if (!riotId || !riotTag) {
      return errorResponse('라이엇 계정은 필수입니다.', 400)
    }

    if (!mainLane || !subLane) {
      return errorResponse('메인 포지션과 서브 포지션은 필수입니다.', 400)
    }

    // Validate that mainLane and subLane are different
    if (mainLane === subLane) {
      return errorResponse('메인 포지션과 서브 포지션은 달라야 합니다.', 400)
    }

    // Get current user to check if Riot account changed
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { riotId: true, riotTag: true, score: true }
    })

    if (!currentUser) {
      return unauthorizedResponse()
    }

    const riotAccountChanged = currentUser.riotId !== riotId || currentUser.riotTag !== riotTag
    let newScore = currentUser.score

    // If Riot account changed, verify and fetch new score
    if (riotAccountChanged) {
      // Verify Riot account exists
      try {
        const isValidAccount = await verifyRiotAccount(riotId, riotTag)
        if (!isValidAccount) {
          return errorResponse(
            '라이엇 계정을 찾을 수 없습니다. 계정명과 태그를 확인해주세요.',
            400
          )
        }
      } catch (error: any) {
        console.error('Error verifying Riot account:', error)
        return errorResponse(
          '라이엇 계정 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          500
        )
      }

      // Fetch new ranked score
      const fetchedScore = await getRankedScore(riotId, riotTag)

      if (fetchedScore === null) {
        return errorResponse(
          '랭크 정보를 불러올 수 없습니다. 랭크 게임을 먼저 진행해주세요.',
          400
        )
      }

      newScore = fetchedScore
      console.log(`Updated score for ${riotId}#${riotTag}: ${newScore}`)
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || null,
        riotId,
        riotTag,
        mainLane,
        subLane,
        score: newScore
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        riotId: true,
        riotTag: true,
        mainLane: true,
        subLane: true,
        score: true,
        winLossStreak: true
      }
    })

    return successResponse(updatedUser)
  } catch (error) {
    console.error('Error updating profile:', error)
    return errorResponse('Failed to update profile', 500)
  }
}
