'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  username: string
  email: string
  name: string | null
  riotId: string | null
  riotTag: string | null
  mainLane: string | null
  subLane: string | null
  score: number
  winLossStreak: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

// Helper function to make authenticated API calls
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken')

  const headers: HeadersInit = {
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let response = await fetch(url, {
    ...options,
    headers,
  })

  // If token expired, try to refresh
  if (response.status === 401) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      const newToken = localStorage.getItem('accessToken')
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`
        response = await fetch(url, {
          ...options,
          headers,
        })
      }
    } else {
      // Refresh failed, redirect to login
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
  }

  return response
}

// Helper function to refresh access token
async function refreshAccessToken(): Promise<boolean> {
  try {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include', // Include cookies
    })

    if (res.ok) {
      const data = await res.json()
      if (data.data.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken)
        return true
      }
    }
    return false
  } catch (error) {
    console.error('Error refreshing token:', error)
    return false
  }
}

interface RegisterData {
  username: string
  email: string
  password: string
  name?: string
  riotId?: string
  riotTag?: string
  mainLane?: string
  subLane?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch current user on mount
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      const res = await fetch('/api/auth/me', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.data)
      } else {
        setUser(null)
        // Clear invalid token
        localStorage.removeItem('accessToken')
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
      localStorage.removeItem('accessToken')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Login failed')
    }

    const data = await res.json()

    // Store access token in localStorage
    if (data.data.accessToken) {
      localStorage.setItem('accessToken', data.data.accessToken)
    }

    setUser(data.data.user)
    router.push('/dashboard')
  }

  const register = async (data: RegisterData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Registration failed')
    }

    const result = await res.json()

    // Store access token in localStorage
    if (result.data.accessToken) {
      localStorage.setItem('accessToken', result.data.accessToken)
    }

    setUser(result.data.user)
    router.push('/dashboard')
  }

  const logout = async () => {
    // Get access token for blacklisting
    const token = localStorage.getItem('accessToken')

    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    })

    // Clear access token from localStorage
    localStorage.removeItem('accessToken')

    setUser(null)
    router.push('/login')
  }

  const refreshUser = async () => {
    await fetchUser()
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
