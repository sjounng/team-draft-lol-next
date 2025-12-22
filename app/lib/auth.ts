import { headers } from 'next/headers'
import {
  verifyAccessToken,
  isAccessTokenBlacklisted,
  TokenPayload
} from './token'

/**
 * Get Access Token from Authorization header
 */
async function getAccessTokenFromHeader(): Promise<string | null> {
  const headersList = await headers()
  const authorization = headersList.get('authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null
  }

  return authorization.substring(7) // Remove 'Bearer ' prefix
}

/**
 * Get current user from Access Token
 */
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const token = await getAccessTokenFromHeader()

  if (!token) {
    return null
  }

  // Check if token is blacklisted
  const isBlacklisted = await isAccessTokenBlacklisted(token)
  if (isBlacklisted) {
    return null
  }

  // Verify token
  const payload = verifyAccessToken(token)
  return payload
}

/**
 * Get current user ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  const user = await getCurrentUser()
  return user?.userId || null
}

/**
 * Require authentication (throws error if not authenticated)
 */
export async function requireAuth(): Promise<TokenPayload> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}
