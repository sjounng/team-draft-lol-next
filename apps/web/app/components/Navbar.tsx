'use client'

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { user, loading, logout } = useAuth()
  const pathname = usePathname()
  const [invitationCount, setInvitationCount] = useState(0)

  const isActive = (path: string) => pathname === path

  // Fetch invitation count
  useEffect(() => {
    if (user) {
      fetchInvitationCount()
      // Poll every 30 seconds
      const interval = setInterval(fetchInvitationCount, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  const fetchInvitationCount = async () => {
    try {
      const res = await fetch('/api/invitations')
      if (res.ok) {
        const data = await res.json()
        setInvitationCount(data.data.length)
      }
    } catch (error) {
      console.error('Error fetching invitations:', error)
    }
  }

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold gradient-text">
                Team Draft LOL
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={user ? "/dashboard" : "/"} className="text-xl font-bold gradient-text">
              Team Draft LOL
            </Link>
          </div>

          {/* Navigation Links */}
          {user ? (
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/dashboard" isActive={isActive('/dashboard')}>
                대시보드
              </NavLink>
              <NavLink href="/records" isActive={isActive('/records')}>
                게임 기록
              </NavLink>
              <NavLink href="/tiers" isActive={isActive('/tiers')}>
                티어
              </NavLink>

              {/* User Menu */}
              <div className="ml-4 flex items-center space-x-3 pl-4 border-l border-[var(--border)]">
                {/* Invitations */}
                <Link
                  href="/invitations"
                  className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                  title="초대장"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {invitationCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)] rounded-full">
                      {invitationCount > 9 ? '9+' : invitationCount}
                    </span>
                  )}
                </Link>

                {/* Profile */}
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-white font-semibold text-xs">
                    {user.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="font-medium">{user.username}</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link href="/login" className="btn-secondary">
                로그인
              </Link>
              <Link href="/register" className="btn-primary">
                회원가입
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          {user && (
            <div className="md:hidden">
              <button className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, isActive, children }: { href: string; isActive: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-[var(--surface)] text-[var(--text-primary)]'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
      }`}
    >
      {children}
    </Link>
  )
}
