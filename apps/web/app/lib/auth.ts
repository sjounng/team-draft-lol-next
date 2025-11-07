import { getUserFromToken } from './jwt'

export async function getCurrentUser() {
  return await getUserFromToken()
}

export async function getCurrentUserId(): Promise<string | null> {
  const user = await getUserFromToken()
  return user?.userId || null
}

export async function requireAuth() {
  const user = await getUserFromToken()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}
