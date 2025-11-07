interface PoolStatsProps {
  memberCount: number;
  matchCount: number;
  isOwner: boolean;
  pendingRequestCount: number;
  onRequestsClick: () => void;
}

export default function PoolStats({
  memberCount,
  matchCount,
  isOwner,
  pendingRequestCount,
  onRequestsClick,
}: PoolStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-muted)] mb-1">총 멤버</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">
              {memberCount}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-muted)] mb-1">전적 개수</p>
            <p className="text-3xl font-bold text-[var(--text-primary)]">
              {matchCount}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center">
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
        </div>
      </div>

      <button
        onClick={onRequestsClick}
        className="card hover:border-[var(--accent-purple)] transition-colors cursor-pointer text-left w-full"
        disabled={!isOwner}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-muted)] mb-1">가입 요청</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-[var(--accent-purple)]">
                {isOwner ? pendingRequestCount : "-"}
              </p>
              {isOwner && pendingRequestCount > 0 && (
                <span className="text-xs text-[var(--accent-purple)]">
                  새 요청
                </span>
              )}
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-pink)] flex items-center justify-center">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
