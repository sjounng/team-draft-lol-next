import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/users/search?q=searchQuery
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query) {
      return errorResponse('Search query is required')
    }

    // Search for users by username or email
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ],
        // Exclude current user
        id: {
          not: userId
        }
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
        score: true
      },
      orderBy: {
        username: 'asc'
      },
      take: 20
    })

    return successResponse(users)
  } catch (error) {
    console.error('Error searching users:', error)
    return errorResponse('Failed to search users', 500)
  }
}
