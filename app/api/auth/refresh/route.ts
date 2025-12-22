import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  isRefreshTokenValid,
  revokeRefreshToken,
  storeRefreshToken
} from '@/app/lib/token'
import { successResponse, errorResponse, unauthorizedResponse } from '@/app/lib/api-response'

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token (with rotation)
 */
export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookie
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
      return unauthorizedResponse('No refresh token provided')
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken)
    if (!payload) {
      return unauthorizedResponse('Invalid refresh token')
    }

    // Check if refresh token exists in Redis (not revoked)
    const isValid = await isRefreshTokenValid(payload.userId, payload.tokenId)
    if (!isValid) {
      return unauthorizedResponse('Refresh token has been revoked')
    }

    // Revoke old refresh token (rotation)
    await revokeRefreshToken(payload.userId, payload.tokenId)

    // Generate new tokens
    const tokenPayload = {
      userId: payload.userId,
      email: payload.email
    }

    const newAccessToken = generateAccessToken(tokenPayload)
    const newRefreshToken = generateRefreshToken(tokenPayload)

    // Extract tokenId from new refresh token
    const newRefreshPayload = verifyRefreshToken(newRefreshToken)
    if (!newRefreshPayload) {
      return errorResponse('Failed to generate new refresh token', 500)
    }

    // Store new refresh token in Redis
    await storeRefreshToken(payload.userId, newRefreshPayload.tokenId, newRefreshToken)

    // Set new refresh token as HttpOnly cookie
    cookieStore.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false, // Set to true when using HTTPS
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return successResponse({
      accessToken: newAccessToken
    })
  } catch (error) {
    console.error('Error refreshing token:', error)
    return errorResponse('Failed to refresh token', 500)
  }
}
