'use client'

import { useState, FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'
import { ErrorAlert } from '../components/ErrorAlert'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { FormDivider } from '../components/FormDivider'

export function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-5">
        <ErrorAlert message={error} />

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            placeholder="••••••••"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center"
        >
          {loading ? (
            <>
              <LoadingSpinner className="mr-2" />
              로그인 중...
            </>
          ) : (
            '로그인'
          )}
        </button>
      </form>

      <FormDivider text="계정이 없으신가요?" />

      <Link href="/register" className="btn-secondary w-full text-center block">
        회원가입
      </Link>
    </div>
  )
}
