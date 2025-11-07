"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BanPickWaitingModal from "./components/BanPickWaitingModal";
import ChampionSwapModal from "./components/ChampionSwapModal";
import PlayerRow from "./components/PlayerRow";
import { MatchStatus, Player, Match, Pool } from "./types";
import { STATUS_LABELS, STATUS_COLORS, POSITION_LABELS, POSITION_ORDER } from "./constants";

export default function MatchesPage() {
  const params = useParams();
  const router = useRouter();
  const poolId = params.poolId as string;

  const [matches, setMatches] = useState<Match[]>([]);
  const [pool, setPool] = useState<Pool | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<MatchStatus>("ALL");
  const [userId, setUserId] = useState<string>("");
  const [banPickModalMatchId, setBanPickModalMatchId] = useState<string | null>(null);
  const [championSwapMatchId, setChampionSwapMatchId] = useState<string | null>(null);
  const [expandedMatches, setExpandedMatches] = useState<Set<string>>(new Set());

  const toggleMatchExpanded = (matchId: string) => {
    setExpandedMatches(prev => {
      const newSet = new Set(prev);
      if (newSet.has(matchId)) {
        newSet.delete(matchId);
      } else {
        newSet.add(matchId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    fetchUserAndPool();
  }, [poolId]);

  useEffect(() => {
    if (pool) {
      fetchMatches();
    }
  }, [pool, statusFilter]);

  const fetchUserAndPool = async () => {
    try {
      // Fetch current user
      const userRes = await fetch("/api/auth/me");
      if (userRes.ok) {
        const userData = await userRes.json();
        setUserId(userData.data.id);
      }

      // Fetch pool info
      const poolRes = await fetch(`/api/pools/${poolId}`);
      if (poolRes.ok) {
        const poolData = await poolRes.json();
        setPool(poolData.data);
      }
    } catch (error) {
      console.error("Error fetching user/pool:", error);
    }
  };

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const url =
        statusFilter === "ALL"
          ? `/api/pools/${poolId}/matches`
          : `/api/pools/${poolId}/matches?status=${statusFilter}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setMatches(data.data);
      } else {
        console.error("Failed to fetch matches");
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetDraft = async (matchId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm("밴픽을 초기화하시겠습니까? 밴픽 데이터가 모두 삭제되고 처음부터 다시 진행해야 합니다.")) {
      return;
    }

    try {
      const res = await fetch(`/api/pools/${poolId}/matches/${matchId}/reset-draft`, {
        method: "POST",
      });

      if (res.ok) {
        alert("밴픽이 초기화되었습니다.");
        fetchMatches(); // Refresh matches list
      } else {
        const data = await res.json();
        alert(data.error || "밴픽 초기화에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error resetting draft:", error);
      alert("밴픽 초기화 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteMatch = async (matchId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm("전적을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      return;
    }

    try {
      const res = await fetch(`/api/pools/${poolId}/matches/${matchId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("전적이 삭제되었습니다.");
        fetchMatches(); // Refresh matches list
      } else {
        const data = await res.json();
        alert(data.error || "전적 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting match:", error);
      alert("전적 삭제 중 오류가 발생했습니다.");
    }
  };

  const getActionButton = (match: Match) => {
    const isOwner = pool?.ownerId === userId;

    switch (match.status) {
      case "DRAFT_PENDING":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setBanPickModalMatchId(match.gameId)}
              className="btn-primary text-sm"
            >
              밴픽 진행하기
            </button>
            {!match.isApplied && (
              <button
                onClick={(e) => handleDeleteMatch(match.gameId, e)}
                className="px-3 py-1.5 bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 rounded-lg font-semibold text-sm transition-colors"
                title="전적 삭제"
              >
                삭제
              </button>
            )}
          </div>
        );
      case "DRAFT_COMPLETE":
        return (
          <div className="flex gap-2">
            <Link
              href={`/pools/${poolId}/matches/${match.gameId}/result`}
              className="btn-primary text-sm"
            >
              결과 입력하기
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setChampionSwapMatchId(match.gameId);
              }}
              className="px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg font-semibold text-sm transition-colors"
            >
              챔피언 교환
            </button>
            <button
              onClick={(e) => handleResetDraft(match.gameId, e)}
              className="px-3 py-1.5 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 rounded-lg font-semibold text-sm transition-colors"
            >
              밴픽 초기화
            </button>
            {!match.isApplied && (
              <button
                onClick={(e) => handleDeleteMatch(match.gameId, e)}
                className="px-3 py-1.5 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded-lg font-semibold text-sm transition-colors"
                title="전적 삭제"
              >
                삭제
              </button>
            )}
          </div>
        );
      case "RESULT_PENDING":
        return (
          <div className="flex gap-2">
            <Link
              href={`/pools/${poolId}/matches/${match.gameId}/result`}
              className="px-4 py-2 bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 rounded-lg font-semibold text-sm transition-colors"
            >
              수정
            </Link>
            {isOwner && (
              <Link
                href={`/pools/${poolId}/matches/${match.gameId}/approve`}
                className="btn-primary text-sm"
              >
                결과 반영하기
              </Link>
            )}
          </div>
        );
      case "COMPLETED":
        return null;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scoreDiff = (match: Match) => {
    const team1Total = getTeamTotalScore(match, 1);
    const team2Total = getTeamTotalScore(match, 2);
    const diff = team1Total - team2Total;
    if (diff === 0) return "균형 팀";
    return `${Math.abs(diff)}점 차이`;
  };

  const getPlayerChampion = (match: Match, userId: string) => {
    if (!match.userRecords || match.userRecords.length === 0) return null;
    const userRecord = match.userRecords.find((record: any) => record.userId === userId);
    return userRecord?.championName || null;
  };

  const getPlayerStats = (match: Match, userId: string) => {
    if (!match.userRecords || match.userRecords.length === 0) return null;
    const userRecord = match.userRecords.find((record: any) => record.userId === userId);
    return userRecord;
  };

  const getTeamTotalScore = (match: Match, teamNumber: number) => {
    if (!match.userRecords || match.userRecords.length === 0) return 0;
    return match.userRecords
      .filter((record: any) => record.teamNumber === teamNumber)
      .reduce((sum: number, record: any) => sum + (record.adjustedScore || 0), 0);
  };

  const sortPlayersByPosition = (players: Player[]) => {
    return [...players].sort((a, b) => {
      const orderA = POSITION_ORDER[a.assignedPosition] || 999;
      const orderB = POSITION_ORDER[b.assignedPosition] || 999;
      return orderA - orderB;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link
              href={`/pools/${poolId}`}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-2 inline-block"
            >
              ← 풀로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
              전적 관리
            </h1>
            {pool && (
              <p className="text-[var(--text-muted)] mt-2">
                {pool.name} ({pool.tag})
              </p>
            )}
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === "ALL"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--card-bg)] text-[var(--text-muted)] hover:bg-[var(--hover-bg)]"
            }`}
          >
            전체
          </button>
          {Object.keys(STATUS_LABELS).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as MatchStatus)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === status
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--card-bg)] text-[var(--text-muted)] hover:bg-[var(--hover-bg)]"
              }`}
            >
              {STATUS_LABELS[status]}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
          <p className="text-[var(--text-muted)] mt-4">전적을 불러오는 중...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && matches.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4"
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
          <p className="text-[var(--text-muted)] text-lg">
            {statusFilter === "ALL"
              ? "아직 생성된 전적이 없습니다."
              : `${STATUS_LABELS[statusFilter]} 상태의 전적이 없습니다.`}
          </p>
          <Link href={`/pools/${poolId}/teams/create`} className="btn-primary mt-4 inline-block">
            팀 생성하기
          </Link>
        </div>
      )}

      {/* Matches List */}
      {!loading && matches.length > 0 && (
        <div className="space-y-6">
          {matches.map((match) => {
            const isExpanded = expandedMatches.has(match.gameId);
            const isCompleted = match.status === "COMPLETED";

            return (
              <div
                key={match.gameId}
                className="bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)] hover:border-[var(--primary)] transition-colors"
              >
                {/* Consistent Header Bar */}
                <div
                  className={`p-4 flex items-center justify-between ${
                    isCompleted ? "cursor-pointer hover:bg-[var(--hover-bg)] transition-colors" : ""
                  }`}
                  onClick={() => isCompleted && toggleMatchExpanded(match.gameId)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        STATUS_COLORS[match.status]
                      }`}
                    >
                      {STATUS_LABELS[match.status]}
                    </span>
                    <span className="text-sm text-[var(--text-muted)]">
                      {formatDate(match.createdAt)}
                    </span>
                    {match.status === "DRAFT_PENDING" && (
                      <span className="text-sm text-[var(--text-muted)]">
                        {scoreDiff(match)}
                      </span>
                    )}
                    {match.team1Won !== null && (
                      <span className="text-sm font-semibold text-[var(--primary)]">
                        {match.team1Won ? "Team 1 승리" : "Team 2 승리"}
                      </span>
                    )}
                    {isCompleted && (match.team1Kills !== null && match.team2Kills !== null) && (
                      <span className="text-xs text-[var(--text-muted)]">
                        킬: {match.team1Kills} : {match.team2Kills}
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-xs text-[var(--text-muted)]">
                        점수 변화: Team 1 ({getTeamTotalScore(match, 1) > 0 ? '+' : ''}{getTeamTotalScore(match, 1)}) / Team 2 ({getTeamTotalScore(match, 2) > 0 ? '+' : ''}{getTeamTotalScore(match, 2)})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {getActionButton(match)}
                    {isCompleted && (
                      <span className="text-xs text-[var(--text-muted)] ml-2">
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expandable Content Area */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isCompleted && !isExpanded
                      ? "max-h-0 opacity-0"
                      : "max-h-[2000px] opacity-100"
                  }`}
                >
                  <div className="px-6 pb-6">
                    {/* Teams */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Team 1 */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-[var(--text-primary)]">
                            Team 1
                          </h3>
                          <span className="text-sm text-[var(--text-muted)]">
                            총점: {getTeamTotalScore(match, 1)}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sortPlayersByPosition(match.team1Data.players).map((player, index) => {
                            const champion = getPlayerChampion(match, player.userId);
                            const stats = getPlayerStats(match, player.userId);

                            return (
                              <PlayerRow
                                key={index}
                                player={player}
                                champion={champion}
                                stats={stats}
                                matchStatus={match.status}
                                positionLabel={POSITION_LABELS[player.assignedPosition]}
                                accentColor="text-[var(--accent-purple)]"
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Team 2 */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-[var(--text-primary)]">
                            Team 2
                          </h3>
                          <span className="text-sm text-[var(--text-muted)]">
                            총점: {getTeamTotalScore(match, 2)}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sortPlayersByPosition(match.team2Data.players).map((player, index) => {
                            const champion = getPlayerChampion(match, player.userId);
                            const stats = getPlayerStats(match, player.userId);

                            return (
                              <PlayerRow
                                key={index}
                                player={player}
                                champion={champion}
                                stats={stats}
                                matchStatus={match.status}
                                positionLabel={POSITION_LABELS[player.assignedPosition]}
                                accentColor="text-[var(--accent-blue)]"
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Match Stats (if result entered) */}
                    {match.team1Won !== null && (
                      <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-sm text-[var(--text-muted)]">킬</p>
                            <p className="text-lg font-semibold text-[var(--text-primary)]">
                              {match.team1Kills} : {match.team2Kills}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[var(--text-muted)]">골드</p>
                            <p className="text-lg font-semibold text-[var(--text-primary)]">
                              {match.team1Gold.toLocaleString()} :{" "}
                              {match.team2Gold.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ban-Pick Waiting Modal */}
      {banPickModalMatchId && (
        <BanPickWaitingModal
          poolId={poolId}
          matchId={banPickModalMatchId}
          onClose={() => setBanPickModalMatchId(null)}
        />
      )}

      {/* Champion Swap Modal */}
      {championSwapMatchId && (() => {
        const match = matches.find(m => m.gameId === championSwapMatchId);
        if (!match) return null;

        return (
          <ChampionSwapModal
            matchId={championSwapMatchId}
            poolId={poolId}
            team1Players={match.team1Data.players}
            team2Players={match.team2Data.players}
            onClose={() => setChampionSwapMatchId(null)}
            onSwapSuccess={() => {
              fetchMatches();
            }}
          />
        );
      })()}
    </div>
  );
}
