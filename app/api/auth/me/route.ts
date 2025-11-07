import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, unauthorizedResponse, errorResponse } from '@/app/lib/api-response'

export async function GET() {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
        winLossStreak: true,
        createdAt: true
      }
    })

    if (!user) {
      return unauthorizedResponse('User not found')
    }

    return successResponse(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return errorResponse('Failed to fetch user', 500)
  }
}
