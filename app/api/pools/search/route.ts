import { NextRequest } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getCurrentUserId } from '@/app/lib/auth'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

// GET /api/pools/search?q=searchQuery
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

    // Parse query if it contains # (name#tag format or #tag format)
    let searchName: string | undefined
    let searchTag: string | undefined

    if (query.includes('#')) {
      const parts = query.split('#')
      searchName = parts[0]?.trim() || undefined // Convert empty string to undefined
      searchTag = parts[1]?.trim() || undefined
    }

    // Build search condition
    let searchCondition: any
    if (searchName && searchTag) {
      // Case: "MyPool#A1B2" - search for name AND tag
      searchCondition = {
        AND: [
          { name: { contains: searchName, mode: 'insensitive' as const } },
          { tag: { contains: searchTag, mode: 'insensitive' as const } }
        ]
      }
    } else if (searchTag) {
      // Case: "#A1B2" - search tag only
      searchCondition = {
        tag: { contains: searchTag, mode: 'insensitive' as const }
      }
    } else {
      // Case: "MyPool" - search name OR tag
      searchCondition = {
        OR: [
          { name: { contains: query, mode: 'insensitive' as const } },
          { tag: { contains: query, mode: 'insensitive' as const } }
        ]
      }
    }

    // Search for pools by name and/or tag (exclude pools where user is already a member)
    const pools = await prisma.pool.findMany({
      where: {
        AND: [
          searchCondition,
          // Exclude pools where user is already a member
          {
            memberships: {
              none: {
                userId: userId
              }
            }
          },
          // Exclude pools where user is the owner
          {
            ownerId: {
              not: userId
            }
          }
        ]
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true
          }
        },
        memberships: {
          select: {
            userId: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })

    // Transform results
    const results = pools.map(pool => ({
      poolId: pool.poolId.toString(),
      name: pool.name,
      tag: pool.tag,
      ownerId: pool.ownerId,
      ownerUsername: pool.owner.username,
      memberCount: pool.memberships.length,
      createdAt: pool.createdAt
    }))

    return successResponse(results)
  } catch (error) {
    console.error('Error searching pools:', error)
    return errorResponse('Failed to search pools', 500)
  }
}
