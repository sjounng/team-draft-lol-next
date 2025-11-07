"use client";

import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Pool {
  poolId: string;
  name: string;
  tag: string;
  ownerId: string;
  createdAt: string;
  isOwner: boolean;
  memberCount: number;
  pendingRequestCount: number;
}

interface TopChampion {
  championId: string;
  championName: string;
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  kda: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  avgCs: number;
  csPerMin: number;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pools, setPools] = useState<Pool[]>([]);
  const [loadingPools, setLoadingPools] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [topChampions, setTopChampions] = useState<TopChampion[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchPools();
      fetchTopChampions();
    }
  }, [user]);

  const fetchPools = async () => {
    try {
      const res = await fetch("/api/pools");
      if (res.ok) {
        const data = await res.json();
        setPools(data.data);
      }
    } catch (error) {
      console.error("Error fetching pools:", error);
    } finally {
      setLoadingPools(false);
    }
  };

  const fetchTopChampions = async () => {
    try {
      const res = await fetch("/api/users/me/champions?limit=3");
      if (res.ok) {
        const data = await res.json();
        setTopChampions(data.data);
      }
    } catch (error) {
      console.error("Error fetching top champions:", error);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-purple)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-3 gradient-text">대시보드</h1>
        <p className="text-[var(--text-secondary)]">
          {user.username}님, 환영합니다!
        </p>
      </div>

      {/* User Stats Card */}
      <div className="card mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-white font-bold text-2xl">
              {user.username[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {user.username}
              </h2>
              {user.riotId && (
                <p className="text-sm text-[var(--text-secondary)]">
                  라이엇 ID: {user.riotId}
                  {user.riotTag && (
                    <span className="text-[var(--accent-purple)]">
                      #{user.riotTag}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">
                {user.score}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">점수</div>
            </div>
            <div className="h-12 w-px bg-[var(--border)]"></div>
            <div className="text-center">
              <div
                className={`text-3xl font-bold ${
                  user.winLossStreak > 0
                    ? "text-[var(--success)]"
                    : user.winLossStreak < 0
                    ? "text-[var(--error)]"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {user.winLossStreak > 0 ? "+" : ""}
                {user.winLossStreak}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                연승/연패
              </div>
            </div>
            {(user.mainLane || user.subLane) && (
              <>
                <div className="h-12 w-px bg-[var(--border)]"></div>
                <div className="text-center mt-1">
                  <div className="flex items-center gap-2">
                    {user.mainLane && (
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        {user.mainLane}
                      </div>
                    )}
                    {user.mainLane && user.subLane && (
                      <span className="text-[var(--text-muted)]">/</span>
                    )}
                    {user.subLane && (
                      <div className="text-sm font-semibold text-[var(--text-secondary)]">
                        {user.subLane}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    {user.mainLane && user.subLane
                      ? "주 / 부 라인"
                      : user.mainLane
                      ? "주 라인"
                      : "부 라인"}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Top Champions */}
      {topChampions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            내가 많이 사용하는 챔피언
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topChampions.map((champion, index) => (
              <div key={champion.championId} className="card">
                <div className="flex items-center gap-4 mb-4">
                  {/* Rank Badge */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                        : index === 1
                        ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                        : "bg-gradient-to-br from-orange-600 to-orange-800 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Champion Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[var(--border)] flex-shrink-0">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${champion.championId}.png`}
                      alt={champion.championName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  {/* Champion Name & Games */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--text-primary)] truncate">
                      {champion.championName}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {champion.totalGames}게임
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-[var(--text-muted)] mb-1">
                      승률
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        champion.winRate >= 0.55
                          ? "text-green-400"
                          : champion.winRate >= 0.45
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {(champion.winRate * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-[var(--text-muted)] mb-1">
                      KDA
                    </div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">
                      {champion.kda.toFixed(2)}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-[var(--text-muted)] mb-1">
                      CS/분
                    </div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">
                      {champion.csPerMin.toFixed(1)}
                    </div>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                  <div className="text-xs text-[var(--text-muted)] space-y-1">
                    <div className="flex justify-between">
                      <span>평균 K/D/A</span>
                      <span className="text-[var(--text-secondary)]">
                        {champion.avgKills.toFixed(1)} /{" "}
                        {champion.avgDeaths.toFixed(1)} /{" "}
                        {champion.avgAssists.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>전적</span>
                      <span className="text-[var(--text-secondary)]">
                        {champion.wins}승 {champion.losses}패
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 mb-8">
        <Link href="/pools/create" className="btn-primary">
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
          새 Pool 만들기
        </Link>
        <button
          onClick={() => setShowJoinModal(true)}
          className="btn-secondary"
        >
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Pool 검색 & 가입
        </button>
      </div>

      {/* Pools Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            내 Pools
          </h2>
          {!loadingPools && (
            <span className="text-sm text-[var(--text-muted)]">
              총 {pools.length}개
            </span>
          )}
        </div>

        {loadingPools ? (
          <div className="card">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-purple)]"></div>
            </div>
          </div>
        ) : pools.length === 0 ? (
          <div className="card">
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-[var(--text-muted)]"
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
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                아직 Pool이 없습니다
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                새로운 Pool을 만들거나 기존 Pool에 가입하세요
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/pools/create" className="btn-primary">
                  Pool 만들기
                </Link>
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="btn-secondary"
                >
                  Pool 검색
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pools.map((pool) => (
              <Link key={pool.poolId} href={`/pools/${pool.poolId}`}>
                <div className="card-hover h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">
                        {pool.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        #{pool.tag}
                      </p>
                    </div>
                    {pool.isOwner && (
                      <span className="badge px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-white">
                        Owner
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-[var(--text-secondary)]">
                      <svg
                        className="w-4 h-4 mr-2"
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
                      {pool.memberCount}명
                    </div>
                    {pool.isOwner && pool.pendingRequestCount > 0 && (
                      <div className="flex items-center text-[var(--accent-purple)]">
                        <svg
                          className="w-4 h-4 mr-2"
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
                        가입 요청 {pool.pendingRequestCount}개
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Join Pool Modal */}
      {showJoinModal && (
        <JoinPoolModal
          onClose={() => setShowJoinModal(false)}
          onSuccess={fetchPools}
        />
      )}
    </div>
  );
}

function JoinPoolModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/pools/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.data);
      } else {
        setError("검색에 실패했습니다.");
      }
    } catch (err) {
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (poolId: string, ownerId: string) => {
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          poolId,
          receiverId: ownerId, // Not used for REQUEST type, but required by API
          type: "REQUEST",
        }),
      });

      if (res.ok) {
        // 모달을 닫지 않고 성공 메시지만 표시 (여러 Pool에 연속 요청 가능)
        setSuccessMessage(
          "가입 요청을 보냈습니다! Pool 소유자가 수락하면 참여할 수 있습니다."
        );
        setSearchResults((prev) => prev.filter((p) => p.poolId !== poolId));
        setError("");
        // onClose()나 onSuccess()를 호출하지 않음으로써 모달 유지
      } else {
        const data = await res.json();
        setError(data.error || "요청 전송에 실패했습니다.");
        setSuccessMessage("");
      }
    } catch (err) {
      setError("요청 전송 중 오류가 발생했습니다.");
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">Pool 검색 & 가입</h2>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--error)]/10 border border-[var(--error)]/30 text-[var(--error)] text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/30 text-[var(--success)] text-sm">
            {successMessage}
          </div>
        )}

        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Pool 이름 또는 #태그로 검색..."
              className="input flex-1"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "검색"
              )}
            </button>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            예시: "MyPool", "#A1B2" 또는 "MyPool#A1B2"
          </p>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-muted)]">
              검색 결과가 없습니다
            </div>
          ) : (
            searchResults.map((pool) => (
              <div
                key={pool.poolId}
                className="card-hover flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {pool.name}
                    </h3>
                    <span className="text-xs text-[var(--text-muted)]">
                      #{pool.tag}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {pool.memberCount}명 · {pool.ownerUsername}
                  </p>
                </div>
                <button
                  onClick={() => handleSendRequest(pool.poolId, pool.ownerId)}
                  className="btn-primary"
                >
                  요청 보내기
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
