import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { generateTeams } from '@/app/lib/team-generation'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// POST /api/teams/generate - Generate balanced teams
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { userIds } = body

    if (!userIds || !Array.isArray(userIds) || userIds.length !== 10) {
      return errorResponse('Exactly 10 user IDs are required')
    }

    // Fetch users
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds
        }
      }
    })

    if (users.length !== 10) {
      return errorResponse('Some users were not found')
    }

    // Generate teams
    const result = generateTeams(users, 0)

    return successResponse(result)
  } catch (error) {
    console.error('Error generating teams:', error)
    return errorResponse('Failed to generate teams: ' + error, 500)
  }
}
