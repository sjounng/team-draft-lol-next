"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Player {
  userId: string;
  username: string;
  name: string;
  teamNumber: number;
  assignedPosition: string;
  championName: string | null;
  kills: number | null;
  deaths: number | null;
  assists: number | null;
}

interface GameRecord {
  recordId: string;
  gameId: string;
  poolId: string;
  poolName: string;
  poolTag: string;
  teamNumber: number;
  assignedPosition: string;
  originalScore: number;
  adjustedScore: number | null;
  championId: string | null;
  championName: string | null;
  kills: number | null;
  deaths: number | null;
  assists: number | null;
  cs: number | null;
  won: boolean | null;
  status: string;
  isApplied: boolean;
  gameDuration: number | null;
  team1Kills: number | null;
  team2Kills: number | null;
  createdAt: string;
  allPlayers: Player[];
}

interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export default function RecordsPage() {
  const [records, setRecords] = useState<GameRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecords(1);
  }, []);

  const fetchRecords = async (page: number) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/records?page=${page}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data.data.records);
        setPagination(data.data.pagination);
      } else {
        const data = await res.json();
        setError(data.error || "전적을 불러오는데 실패했습니다.");
      }
    } catch (err) {
      console.error("Error fetching records:", err);
      setError("전적을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchRecords(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "-";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      DRAFT_PENDING: {
        label: "팀 구성 중",
        color: "bg-gray-500/20 text-gray-400",
      },
      DRAFT_COMPLETE: {
        label: "밴픽 완료",
        color: "bg-blue-500/20 text-blue-400",
      },
      RESULT_PENDING: {
        label: "결과 대기",
        color: "bg-yellow-500/20 text-yellow-400",
      },
      COMPLETED: { label: "완료", color: "bg-green-500/20 text-green-400" },
    };

    const badge = badges[status] || {
      label: status,
      color: "bg-gray-500/20 text-gray-400",
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${badge.color}`}
      >
        {badge.label}
      </span>
    );
  };

  if (loading && records.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
          게임 기록
        </h1>
        <p className="text-[var(--text-muted)]">
          내가 참여한 게임 전적을 확인하세요
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="text-sm text-[var(--text-muted)] mb-1">
            총 게임 수
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {pagination.totalCount}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-[var(--text-muted)] mb-1">승리</div>
          <div className="text-2xl font-bold text-green-500">
            {records.filter((r) => r.won === true && r.isApplied).length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-[var(--text-muted)] mb-1">패배</div>
          <div className="text-2xl font-bold text-red-500">
            {records.filter((r) => r.won === false && r.isApplied).length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-[var(--text-muted)] mb-1">승률</div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {(() => {
              const wins = records.filter(
                (r) => r.won === true && r.isApplied
              ).length;
              const total = records.filter(
                (r) => r.won !== null && r.isApplied
              ).length;
              return total > 0 ? `${((wins / total) * 100).toFixed(1)}%` : "0%";
            })()}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {/* Records List */}
      {records.length === 0 ? (
        <div className="card text-center py-12">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            게임 기록이 없습니다
          </h3>
          <p className="text-[var(--text-muted)] mb-6">
            풀에 가입하여 게임을 시작해보세요!
          </p>
          <Link href="/dashboard" className="btn-primary">
            대시보드로 이동
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <Link
              key={record.recordId}
              href={`/pools/${record.poolId}/matches`}
              className="card hover:shadow-lg transition-shadow block"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`px-3 py-1 rounded-lg font-semibold ${
                      record.won === true
                        ? "bg-green-500/20 text-green-400"
                        : record.won === false
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {record.won === true
                      ? "승리"
                      : record.won === false
                      ? "패배"
                      : "진행 중"}
                  </div>
                  {getStatusBadge(record.status)}
                  <span className="text-sm text-[var(--text-muted)]">
                    {record.poolName} ({record.poolTag})
                  </span>
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  {new Date(record.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* Game Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    포지션
                  </div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {record.assignedPosition}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    챔피언
                  </div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {record.championName || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    KDA
                  </div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {record.kills !== null &&
                    record.deaths !== null &&
                    record.assists !== null
                      ? `${record.kills} / ${record.deaths} / ${record.assists}`
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    게임 시간
                  </div>
                  <div className="font-semibold text-[var(--text-primary)]">
                    {formatDuration(record.gameDuration)}
                  </div>
                </div>
              </div>

              {/* Score Change */}
              {record.isApplied && record.adjustedScore !== null && (
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-muted)]">
                      점수 변화
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {record.originalScore}
                      </span>
                      <span className="text-[var(--text-muted)]">→</span>
                      <span className="font-semibold text-[var(--text-primary)]">
                        {record.originalScore + record.adjustedScore}
                      </span>
                      <span
                        className={`font-bold ${
                          record.adjustedScore > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        ({record.adjustedScore > 0 ? "+" : ""}
                        {record.adjustedScore})
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>

          <div className="flex gap-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Show first page, last page, current page, and pages around current
                return (
                  page === 1 ||
                  page === pagination.totalPages ||
                  Math.abs(page - pagination.page) <= 2
                );
              })
              .map((page, idx, arr) => {
                // Add ellipsis if there's a gap
                const showEllipsisBefore = idx > 0 && page - arr[idx - 1] > 1;

                return (
                  <div key={page} className="flex items-center gap-1">
                    {showEllipsisBefore && (
                      <span className="px-2 text-[var(--text-muted)]">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        page === pagination.page
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
          </div>

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      )}

      {/* Loading overlay for page changes */}
      {loading && records.length > 0 && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
        </div>
      )}
    </div>
  );
}
