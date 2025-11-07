"use client";

import { useAuth } from "./contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 로그인한 사용자는 대시보드로 리다이렉트
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-purple)]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-6xl md:text-7xl font-black mb-6 gradient-text">
          Team Draft LOL
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
          롤 내전을 위한 밸런스 팀 생성 및 전적 관리 시스템
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/register" className="btn-primary text-base px-8 py-3">
            시작하기
          </Link>
          <Link href="/login" className="btn-secondary text-base px-8 py-3">
            로그인
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        <div className="card-hover">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">
            밸런스 팀 생성
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            점수와 포지션을 고려한 최적의 팀 조합을 자동으로 생성합니다.
          </p>
        </div>

        <div className="card-hover">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">
            전적 관리
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            게임 결과를 기록하고 플레이어 점수를 자동으로 업데이트합니다.
          </p>
        </div>

        <div className="card-hover">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-pink)] flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">
            티어 시스템
          </h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            플레이어별 승률와 통계를 확인하고 챔피언 순위를 비교합니다.
          </p>
        </div>
      </div>

      {/* Stats
      <div className="mt-20 flex gap-12 text-center">
        <div>
          <div className="text-3xl font-bold gradient-text mb-1">10+</div>
          <div className="text-sm text-[var(--text-muted)]">Pool 생성</div>
        </div>
        <div>
          <div className="text-3xl font-bold gradient-text mb-1">50+</div>
          <div className="text-sm text-[var(--text-muted)]">게임 기록</div>
        </div>
        <div>
          <div className="text-3xl font-bold gradient-text mb-1">100%</div>
          <div className="text-sm text-[var(--text-muted)]">밸런스 정확도</div>
        </div>
      </div> */}
    </div>
  );
}
