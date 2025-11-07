import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// Generate a unique 4-character tag for pool
async function generateUniqueTag(): Promise<string> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const maxAttempts = 100

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Generate 4-character random tag
    let tag = ''
    for (let i = 0; i < 4; i++) {
      tag += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    // Check if tag already exists
    const existing = await prisma.pool.findUnique({
      where: { tag }
    })

    if (!existing) {
      return tag
    }
  }

  throw new Error('Failed to generate unique tag')
}

// GET /api/pools - List all pools for current user
export async function GET() {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    // Get pools where user is owner or member - in parallel
    const [ownedPools, memberPools] = await Promise.all([
      prisma.pool.findMany({
        where: { ownerId: userId },
        include: {
          _count: {
            select: {
              memberships: true
            }
          },
          owner: {
            select: {
              id: true,
              username: true,
              email: true,
              name: true
            }
          },
          invitations: {
            where: {
              type: 'REQUEST',
              status: 'PENDING'
            },
            select: {
              invitationId: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.pool.findMany({
        where: {
          memberships: {
            some: {
              userId: userId
            }
          },
          ownerId: { not: userId }
        },
        include: {
          _count: {
            select: {
              memberships: true
            }
          },
          owner: {
            select: {
              id: true,
              username: true,
              email: true,
              name: true
            }
          },
          invitations: {
            where: {
              type: 'REQUEST',
              status: 'PENDING'
            },
            select: {
              invitationId: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    ])

    // Transform pools to include additional metadata
    const transformPool = (pool: any, isOwner: boolean) => ({
      poolId: pool.poolId.toString(),
      name: pool.name,
      tag: pool.tag,
      ownerId: pool.ownerId,
      createdAt: pool.createdAt,
      isOwner,
      memberCount: pool._count.memberships,
      pendingRequestCount: pool.invitations?.length || 0,
      owner: pool.owner
    })

    return successResponse([
      ...ownedPools.map(pool => transformPool(pool, true)),
      ...memberPools.map(pool => transformPool(pool, false))
    ])
  } catch (error) {
    console.error('Error fetching pools:', error)
    return errorResponse('Failed to fetch pools', 500)
  }
}

// POST /api/pools - Create a new pool
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { name } = body

    if (!name) {
      return errorResponse('Pool name is required')
    }

    // Generate unique tag for the pool
    const tag = await generateUniqueTag()

    // Create pool and add owner as member in a transaction
    const pool = await prisma.$transaction(async (tx) => {
      // Create pool
      const newPool = await tx.pool.create({
        data: {
          name,
          tag,
          ownerId: userId
        }
      })

      // Add owner as member
      await tx.poolMember.create({
        data: {
          poolId: newPool.poolId,
          userId: userId
        }
      })

      // Fetch pool with all relations
      return await tx.pool.findUnique({
        where: { poolId: newPool.poolId },
        include: {
          owner: {
            select: {
              id: true,
              username: true,
              email: true,
              name: true
            }
          },
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
          }
        }
      })
    })

    if (!pool) {
      return errorResponse('Failed to create pool', 500)
    }

    // Transform to include members array
    const responsePool = {
      ...pool,
      members: pool.memberships.map(m => m.user)
    }

    return successResponse(responsePool, 201)
  } catch (error) {
    console.error('Error creating pool:', error)
    return errorResponse('Failed to create pool', 500)
  }
}
