import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// PUT /api/pools/[poolId]/players/[playerId] - Update player
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string; playerId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { poolId: poolIdParam, playerId: playerIdParam } = await params
    const poolId = BigInt(poolIdParam)
    const playerId = BigInt(playerIdParam)
    const body = await request.json()
    const { name, lolId, mainLane, subLane, score, winLossStreak } = body

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

    const player = await prisma.player.findUnique({
      where: { playerId }
    })

    if (!player) {
      return notFoundResponse('Player not found')
    }

    // Check if user owns the player
    if (player.ownerId !== profile.id) {
      return unauthorizedResponse('You do not have permission to update this player')
    }

    // Update player
    const updatedPlayer = await prisma.player.update({
      where: { playerId },
      data: {
        ...(name && { name }),
        ...(lolId !== undefined && { lolId }),
        ...(mainLane !== undefined && { mainLane }),
        ...(subLane !== undefined && { subLane }),
        ...(score !== undefined && { score }),
        ...(winLossStreak !== undefined && { winLossStreak })
      }
    })

    return successResponse(updatedPlayer)
  } catch (error) {
    console.error('Error updating player:', error)
    return errorResponse('Failed to update player', 500)
  }
}

// DELETE /api/pools/[poolId]/players/[playerId] - Remove player from pool
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ poolId: string; playerId: string }> }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const { poolId: poolIdParam, playerId: playerIdParam } = await params
    const poolId = BigInt(poolIdParam)
    const playerId = BigInt(playerIdParam)

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

    if (pool.ownerId !== profile.id) {
      return unauthorizedResponse('Only the pool owner can remove players')
    }

    // Remove player from pool
    await prisma.$executeRaw`
      DELETE FROM pool_players
      WHERE pool_id = ${poolId} AND player_id = ${playerId}
    `

    return successResponse({ message: 'Player removed from pool successfully' })
  } catch (error) {
    console.error('Error removing player from pool:', error)
    return errorResponse('Failed to remove player from pool', 500)
  }
}
