'use client'

import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Invitation {
  invitationId: string
  poolId: string
  senderId: string
  receiverId: string
  status: string
  createdAt: string
  pool: {
    poolId: string
    name: string
    tag: string
    owner: {
      id: string
      username: string
    }
  }
  sender: {
    id: string
    username: string
    email: string
  }
}

export default function InvitationsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchInvitations()
    }
  }, [user])

  const fetchInvitations = async () => {
    try {
      const res = await fetch('/api/invitations')
      if (res.ok) {
        const data = await res.json()
        setInvitations(data.data)
      }
    } catch (error) {
      console.error('Error fetching invitations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (invitationId: string) => {
    setProcessingId(invitationId)
    try {
      const res = await fetch(`/api/invitations/${invitationId}/accept`, {
        method: 'PUT'
      })

      if (res.ok) {
        // Remove from list
        setInvitations(prev => prev.filter(inv => inv.invitationId !== invitationId))
      } else {
        const data = await res.json()
        alert(data.error || '초대 수락에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error accepting invitation:', error)
      alert('초대 수락 중 오류가 발생했습니다.')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (invitationId: string) => {
    setProcessingId(invitationId)
    try {
      const res = await fetch(`/api/invitations/${invitationId}/reject`, {
        method: 'PUT'
      })

      if (res.ok) {
        // Remove from list
        setInvitations(prev => prev.filter(inv => inv.invitationId !== invitationId))
      } else {
        const data = await res.json()
        alert(data.error || '초대 거절에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error rejecting invitation:', error)
      alert('초대 거절 중 오류가 발생했습니다.')
    } finally {
      setProcessingId(null)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-purple)]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black mb-3 gradient-text">
            초대장
          </h1>
          <p className="text-[var(--text-secondary)]">
            받은 Pool 초대를 확인하고 수락/거절하세요
          </p>
        </div>

        <Link href="/dashboard" className="btn-secondary">
          ← 대시보드
        </Link>
      </div>

      {/* Invitations List */}
      {loading ? (
        <div className="card">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-purple)]"></div>
          </div>
        </div>
      ) : invitations.length === 0 ? (
        <div className="card">
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              받은 초대가 없습니다
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Pool 초대가 오면 여기에 표시됩니다
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {invitations.map((invitation) => (
            <div key={invitation.invitationId} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {invitation.pool.name}
                    </h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]">
                      #{invitation.pool.tag}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-[var(--text-secondary)]">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    초대한 사람: <span className="font-semibold ml-1">{invitation.sender.username}</span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleAccept(invitation.invitationId)}
                    disabled={processingId === invitation.invitationId}
                    className="btn-primary px-4 py-2"
                  >
                    {processingId === invitation.invitationId ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      '수락'
                    )}
                  </button>
                  <button
                    onClick={() => handleReject(invitation.invitationId)}
                    disabled={processingId === invitation.invitationId}
                    className="btn-secondary px-4 py-2"
                  >
                    거절
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
