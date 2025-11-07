import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// POST /api/pools/[poolId]/players - Add player to pool
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { poolId: poolIdParam } = await params
    const poolId = BigInt(poolIdParam)
    const body = await request.json()
    const { name, lolId, mainLane, subLane } = body

    if (!name) {
      return errorResponse('Name is required')
    }

    const profile = await prisma.profile.findUnique({
      where: { auth0Id: userId }
    })

    if (!profile) {
      return unauthorizedResponse()
    }

    const pool = await prisma.pool.findUnique({
      where: { poolId }
    })

    if (!pool) {
      return notFoundResponse('Pool not found')
    }

    // Check if user has access
    const hasAccess = pool.ownerId === profile.id

    if (!hasAccess) {
      return unauthorizedResponse('Only the pool owner can add players')
    }

    // Create the player
    const player = await prisma.player.create({
      data: {
        ownerId: profile.id,
        name,
        lolId,
        mainLane,
        subLane,
        score: 0,
        winLossStreak: 0
      }
    })

    // Add player to pool using raw SQL (since we have explicit join table)
    await prisma.$executeRaw`
      INSERT INTO pool_players (pool_id, player_id)
      VALUES (${poolId}, ${player.playerId})
    `

    return successResponse(player, 201)
  } catch (error) {
    console.error('Error adding player to pool:', error)
    return errorResponse('Failed to add player to pool', 500)
  }
}
