import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// PUT /api/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { name, riotId, riotTag, mainLane, subLane } = body

    // Validate that mainLane and subLane are different if both are provided
    if (mainLane && subLane && mainLane === subLane) {
      return errorResponse('Main lane and sub lane must be different', 400)
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || null,
        riotId: riotId || null,
        riotTag: riotTag || null,
        mainLane: mainLane || null,
        subLane: subLane || null
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
