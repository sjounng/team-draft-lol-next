import Link from 'next/link'
import { PageHeader } from '../components/PageHeader'
import { RegisterForm } from './RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-2xl">
        <PageHeader
          title="회원가입"
          description="Team Draft LOL에 가입하고 밸런스 팀 매칭을 시작하세요"
        />

        <RegisterForm />

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
