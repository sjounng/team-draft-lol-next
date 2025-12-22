import { NextRequest } from 'next/server'
import { cookies, headers } from 'next/headers'
import {
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllRefreshTokens,
  blacklistAccessToken,
  getTokenExpiry
} from '@/app/lib/token'
import { successResponse, errorResponse } from '@/app/lib/api-response'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const headersList = await headers()

    // Get access token from header
    const authorization = headersList.get('authorization')
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.substring(7)
      : null

    // Get refresh token from cookie
    const refreshToken = cookieStore.get('refreshToken')?.value

    // Blacklist access token if provided
    if (accessToken) {
      const expirySeconds = getTokenExpiry(accessToken)
      if (expirySeconds > 0) {
        await blacklistAccessToken(accessToken, expirySeconds)
      }
    }

    // Revoke refresh token if provided
    if (refreshToken) {
      const payload = verifyRefreshToken(refreshToken)
      if (payload) {
        // Option 1: Revoke just this refresh token
        await revokeRefreshToken(payload.userId, payload.tokenId)

        // Option 2: Revoke all refresh tokens for this user (uncomment if needed)
        // await revokeAllRefreshTokens(payload.userId)
      }
    }

    // Delete refresh token cookie
    cookieStore.delete('refreshToken')

    return successResponse({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error during logout:', error)
    return errorResponse('Failed to logout', 500)
  }
}
