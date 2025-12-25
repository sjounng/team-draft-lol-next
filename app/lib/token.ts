import jwt from 'jsonwebtoken'
import redis from './redis'

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || 'default-access-secret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret'

const ACCESS_TOKEN_EXPIRY = '15m' // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d' // 7 days

export interface TokenPayload {
  userId: string
  email: string
}

export interface RefreshTokenPayload extends TokenPayload {
  tokenId: string // Unique ID for this refresh token
}

/**
 * Generate Access Token (short-lived)
 */
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  })
}

/**
 * Generate Refresh Token (long-lived)
 */
export function generateRefreshToken(payload: TokenPayload): string {
  const tokenId = `${payload.userId}_${Date.now()}_${Math.random().toString(36).substring(7)}`

  const refreshPayload: RefreshTokenPayload = {
    ...payload,
    tokenId,
  }

  return jwt.sign(refreshPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  })
}

/**
 * Verify Access Token
 */
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload
    return decoded
  } catch (error) {
    // Token expiration is normal, don't log as error
    if (error instanceof jwt.TokenExpiredError) {
      // Silently return null, refresh token will handle it
      return null
    }
    // Only log actual errors (invalid signature, malformed token, etc.)
    console.error('Access token verification failed:', error)
    return null
  }
}

/**
 * Verify Refresh Token
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as RefreshTokenPayload
    return decoded
  } catch (error) {
    // Token expiration is normal, don't log as error
    if (error instanceof jwt.TokenExpiredError) {
      // Silently return null, user will need to login again
      return null
    }
    // Only log actual errors (invalid signature, malformed token, etc.)
    console.error('Refresh token verification failed:', error)
    return null
  }
}

/**
 * Store Refresh Token in Redis with expiry
 */
export async function storeRefreshToken(userId: string, tokenId: string, token: string): Promise<void> {
  const key = `refresh_token:${userId}:${tokenId}`
  const expirySeconds = 7 * 24 * 60 * 60 // 7 days in seconds

  await redis.setex(key, expirySeconds, token)
}

/**
 * Check if Refresh Token exists in Redis
 */
export async function isRefreshTokenValid(userId: string, tokenId: string): Promise<boolean> {
  const key = `refresh_token:${userId}:${tokenId}`
  const exists = await redis.exists(key)
  return exists === 1
}

/**
 * Revoke Refresh Token (remove from Redis)
 */
export async function revokeRefreshToken(userId: string, tokenId: string): Promise<void> {
  const key = `refresh_token:${userId}:${tokenId}`
  await redis.del(key)
}

/**
 * Revoke All Refresh Tokens for a user
 */
export async function revokeAllRefreshTokens(userId: string): Promise<void> {
  const pattern = `refresh_token:${userId}:*`
  const keys = await redis.keys(pattern)

  if (keys.length > 0) {
    await redis.del(...keys)
  }
}

/**
 * Add Access Token to Blacklist (for logout)
 */
export async function blacklistAccessToken(token: string, expirySeconds: number): Promise<void> {
  const key = `blacklist:${token}`
  await redis.setex(key, expirySeconds, '1')
}

/**
 * Check if Access Token is Blacklisted
 */
export async function isAccessTokenBlacklisted(token: string): Promise<boolean> {
  const key = `blacklist:${token}`
  const exists = await redis.exists(key)
  return exists === 1
}

/**
 * Get remaining TTL of a token (for blacklist expiry calculation)
 */
export function getTokenExpiry(token: string): number {
  try {
    const decoded = jwt.decode(token) as any
    if (!decoded || !decoded.exp) return 0

    const now = Math.floor(Date.now() / 1000)
    const remaining = decoded.exp - now

    return Math.max(0, remaining)
  } catch {
    return 0
  }
}
