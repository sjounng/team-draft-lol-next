import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Checking for pools where owner is not a member...\n')

  // Get all pools
  const pools = await prisma.pool.findMany({
    include: {
      memberships: {
        select: {
          userId: true
        }
      },
      owner: {
        select: {
          id: true,
          username: true
        }
      }
    }
  })

  let fixedCount = 0
  let alreadyMemberCount = 0

  for (const pool of pools) {
    const isOwnerMember = pool.memberships.some(m => m.userId === pool.ownerId)

    if (!isOwnerMember) {
      console.log(`⚠️  Pool "${pool.name}" (${pool.tag}) - Owner ${pool.owner.username} is not a member`)

      try {
        await prisma.poolMember.create({
          data: {
            poolId: pool.poolId,
            userId: pool.ownerId
          }
        })
        console.log(`✓  Added ${pool.owner.username} as member to pool "${pool.name}"`)
        fixedCount++
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log(`✓  ${pool.owner.username} is already a member (race condition)`)
          alreadyMemberCount++
        } else {
          console.error(`✗  Error adding owner to pool "${pool.name}":`, error.message)
        }
      }
    } else {
      alreadyMemberCount++
    }
  }

  console.log('\n======================')
  console.log('Summary:')
  console.log(`Total pools: ${pools.length}`)
  console.log(`Already correct: ${alreadyMemberCount}`)
  console.log(`Fixed: ${fixedCount}`)
  console.log('======================\n')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
