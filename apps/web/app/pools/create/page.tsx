'use client'

import { useState, FormEvent } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'

export default function CreatePoolPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Pool 이름을 입력해주세요.')
      return
    }

    setCreating(true)

    try {
      const res = await fetch('/api/pools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      })

      if (res.ok) {
        const data = await res.json()
        router.push(`/pools/${data.data.poolId}`)
      } else {
        const data = await res.json()
        setError(data.error || 'Pool 생성에 실패했습니다.')
      }
    } catch (err) {
      setError('Pool 생성 중 오류가 발생했습니다.')
    } finally {
      setCreating(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-purple)]"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-3 gradient-text">
            새 Pool 만들기
          </h1>
          <p className="text-[var(--text-secondary)]">
            친구들과 함께 할 Pool을 만들어보세요
          </p>
        </div>

        {/* Create Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="px-4 py-3 rounded-lg bg-[var(--error)]/10 border border-[var(--error)]/30 text-[var(--error)] text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Pool 이름 <span className="text-[var(--error)]">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full"
                placeholder="예: 친구들 내전, 회사 롤팀, 주말 내전 등"
                disabled={creating}
                maxLength={50}
              />
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                최대 50자까지 입력할 수 있습니다. ({name.length}/50)
              </p>
            </div>

            {/* Info Box */}
            <div className="px-4 py-3 rounded-lg bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/30">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[var(--accent-blue)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-[var(--text-secondary)]">
                  <p className="font-semibold text-[var(--text-primary)] mb-1">Pool이란?</p>
                  <p>Pool은 함께 게임을 할 친구들의 그룹입니다. Pool을 만들면:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>멤버들을 초대할 수 있습니다</li>
                    <li>밸런스 팀을 자동으로 생성할 수 있습니다</li>
                    <li>게임 전적을 기록하고 관리할 수 있습니다</li>
                    <li>멤버들의 랭킹을 확인할 수 있습니다</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={creating || !name.trim()}
                className="btn-primary flex-1 flex items-center justify-center"
              >
                {creating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    생성 중...
                  </>
                ) : (
                  '생성하기'
                )}
              </button>
              <Link href="/dashboard" className="btn-secondary flex items-center justify-center px-8">
                취소
              </Link>
            </div>
          </form>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-6">
          <Link href="/dashboard" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            ← 대시보드로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
