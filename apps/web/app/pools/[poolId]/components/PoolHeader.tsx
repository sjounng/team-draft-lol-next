import Link from "next/link";

interface PoolHeaderProps {
  poolName: string;
  poolTag: string;
  isOwner: boolean;
}

export default function PoolHeader({
  poolName,
  poolTag,
  isOwner,
}: PoolHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-black gradient-text">{poolName}</h1>
          {isOwner && (
            <span className="badge px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-white">
              Owner
            </span>
          )}
        </div>
        <p className="text-[var(--text-secondary)]">
          #<span className="font-mono text-[var(--text-secondary)]">{poolTag}</span>
        </p>
      </div>

      <Link href="/dashboard" className="btn-secondary">
        ← 대시보드
      </Link>
    </div>
  );
}
