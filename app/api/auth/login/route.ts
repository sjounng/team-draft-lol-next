import { NextRequest } from 'next/server'
import { compare } from 'bcryptjs'
import { prisma } from '@/app/lib/prisma'
import { signToken } from '@/app/lib/jwt'
import { successResponse, errorResponse } from '@/app/lib/api-response'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return errorResponse('Email and password are required')
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return errorResponse('Invalid email or password', 401)
    }

    // Verify password
    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) {
      return errorResponse('Invalid email or password', 401)
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      username: user.username
    })

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return successResponse({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        riotId: user.riotId,
        riotTag: user.riotTag,
        mainLane: user.mainLane,
        subLane: user.subLane,
        score: user.score,
        winLossStreak: user.winLossStreak
      },
      token
    })
  } catch (error) {
    console.error('Error logging in:', error)
    return errorResponse('Failed to login', 500)
  }
}
