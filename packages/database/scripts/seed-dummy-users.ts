import { PrismaClient } from '../generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const lanes = ['TOP', 'JGL', 'MID', 'ADC', 'SUP']

const dummyUsers = [
  { main: 'TOP', sub: 'JGL' },
  { main: 'JGL', sub: 'MID' },
  { main: 'MID', sub: 'ADC' },
  { main: 'ADC', sub: 'SUP' },
  { main: 'SUP', sub: 'TOP' },
  { main: 'TOP', sub: 'MID' },
  { main: 'JGL', sub: 'ADC' },
  { main: 'MID', sub: 'SUP' },
  { main: 'ADC', sub: 'TOP' },
  { main: 'SUP', sub: 'JGL' },
]

async function main() {
  console.log('Creating 10 dummy users...')

  // Hash the password once (same password for all: "dummy123")
  const hashedPassword = await bcrypt.hash('dummy123', 10)

  for (let i = 1; i <= 10; i++) {
    const userData = {
      username: `더미${i}`,
      email: `dummy${i}@example.com`,
      password: hashedPassword,
      name: `더미${i}`,
      riotId: `더미`,
      riotTag: `${i}`,
      mainLane: dummyUsers[i - 1].main,
      subLane: dummyUsers[i - 1].sub,
      score: Math.floor(Math.random() * 500) + 500, // Random score between 500-1000
      winLossStreak: Math.floor(Math.random() * 11) - 5, // Random streak between -5 to 5
    }

    try {
      const user = await prisma.user.create({
        data: userData,
      })
      console.log(`✓ Created user: ${user.username} (${user.riotId}#${user.riotTag}) - ${user.mainLane}/${user.subLane}`)
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`✗ User ${userData.username} already exists, skipping...`)
      } else {
        console.error(`✗ Error creating user ${userData.username}:`, error.message)
      }
    }
  }

  console.log('\nDone! All dummy users created.')
  console.log('Default password for all dummy users: dummy123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
