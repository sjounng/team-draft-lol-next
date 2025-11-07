import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/app/lib/api-response'

// POST /api/pools/join - Join a pool
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { poolId, poolName } = body

    if (!poolId && !poolName) {
      return errorResponse('Pool ID or Pool Name#Tag is required')
    }

    // Parse poolName if it contains # (name#tag format)
    let name: string | undefined
    let tag: string | undefined

    if (poolName && poolName.includes('#')) {
      const parts = poolName.split('#')
      name = parts[0]?.trim()
      tag = parts[1]?.trim()
    } else if (poolName) {
      // If no # provided, treat as tag only for backward compatibility
      tag = poolName.trim()
    }

    // Find pool by ID or name#tag
    const pool = await prisma.pool.findFirst({
      where: poolId
        ? { poolId: BigInt(poolId) }
        : name && tag
        ? { name, tag }
        : tag
        ? { tag }
        : undefined,
      include: {
        memberships: true,
        owner: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true
          }
        }
      }
    })

    if (!pool) {
      return notFoundResponse('Pool not found')
    }

    // Check if already a member
    if (pool.memberships.some(m => m.userId === userId) || pool.ownerId === userId) {
      return errorResponse('You are already a member of this pool')
    }

    // Add user to pool members using Prisma
    await prisma.poolMember.create({
      data: {
        poolId: pool.poolId,
        userId: userId
      }
    })

    // Fetch updated pool
    const updatedPool = await prisma.pool.findUnique({
      where: { poolId: pool.poolId },
      include: {
        memberships: {
          include: {
            user: {
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
            }
          }
        },
        owner: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true
          }
        }
      }
    })

    // Transform to include members array
    const responsePool = {
      ...updatedPool,
      members: updatedPool?.memberships.map(m => m.user) || []
    }

    return successResponse(responsePool)
  } catch (error) {
    console.error('Error joining pool:', error)
    return errorResponse('Failed to join pool', 500)
  }
}
