import Link from 'next/link'
import { PageHeader } from '../components/PageHeader'
import { LoginForm } from './LoginForm'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <PageHeader
          title="로그인"
          description="Team Draft LOL에 다시 오신 것을 환영합니다"
        />

        <LoginForm />

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
