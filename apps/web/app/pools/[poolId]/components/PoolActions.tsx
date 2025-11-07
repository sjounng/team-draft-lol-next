import Link from "next/link";

interface PoolActionsProps {
  poolId: string;
  isOwner: boolean;
  onInviteClick: () => void;
  onLeavePool: () => void;
}

export default function PoolActions({
  poolId,
  isOwner,
  onInviteClick,
  onLeavePool,
}: PoolActionsProps) {
  return (
    <div className="flex gap-4 mb-8">
      <Link href={`/pools/${poolId}/teams/create`} className="btn-primary">
        <svg
          className="w-5 h-5 mr-2 inline-block"
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
        팀 생성
      </Link>
      <Link href={`/pools/${poolId}/matches`} className="btn-secondary">
        <svg
          className="w-5 h-5 mr-2 inline-block"
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
        전적 관리
      </Link>
      {isOwner && (
        <button onClick={onInviteClick} className="btn-secondary">
          <svg
            className="w-5 h-5 mr-2 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          멤버 초대
        </button>
      )}
      {!isOwner && (
        <button
          onClick={onLeavePool}
          className="btn-secondary text-[var(--error)] hover:bg-[var(--error)]/10"
        >
          Pool 나가기
        </button>
      )}
    </div>
  );
}
