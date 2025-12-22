import { NextRequest } from 'next/server'
import { compare } from 'bcryptjs'
import { prisma } from '@/app/lib/prisma'
import {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  verifyRefreshToken
} from '@/app/lib/token'
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

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email
    }

    const accessToken = generateAccessToken(tokenPayload)
    const refreshToken = generateRefreshToken(tokenPayload)

    // Extract tokenId from refresh token
    const refreshPayload = verifyRefreshToken(refreshToken)
    if (!refreshPayload) {
      return errorResponse('Failed to generate refresh token', 500)
    }

    // Store refresh token in Redis
    await storeRefreshToken(user.id, refreshPayload.tokenId, refreshToken)

    // Set refresh token as HttpOnly cookie
    const cookieStore = await cookies()
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
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
      accessToken // Return access token to be stored in memory/localStorage by client
    })
  } catch (error) {
    console.error('Error logging in:', error)
    return errorResponse('Failed to login', 500)
  }
}
