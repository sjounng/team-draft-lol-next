"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { calculateScore } from "@/app/lib/score-calculator";

interface Player {
  userId: string;
  username: string;
  name: string;
  assignedPosition: string;
  championName?: string;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
}

interface UserRecord {
  userId: string;
  teamNumber: number;
  assignedPosition: string;
  kills: number | null;
  deaths: number | null;
  assists: number | null;
  cs: number | null;
  championId: string | null;
  championName: string | null;
  originalScore: number;
  user: {
    id: string;
    username: string;
    name: string;
    score: number;
  };
}

interface Match {
  gameId: string;
  status: string;
  team1Won: boolean;
  team1Kills: number;
  team2Kills: number;
  team1Gold: number;
  team2Gold: number;
  gameDuration: number | null;
  team1Data: {
    players: Player[];
  };
  team2Data: {
    players: Player[];
  };
  userRecords: UserRecord[];
  userStreaks: Record<string, number>;
  isApplied: boolean;
}

const POSITION_LABELS: Record<string, string> = {
  TOP: "탑",
  JGL: "정글",
  MID: "미드",
  ADC: "원딜",
  SUP: "서폿",
};

const POSITION_ORDER: Record<string, number> = {
  TOP: 1,
  JGL: 2,
  MID: 3,
  ADC: 4,
  SUP: 5,
};

export default function ApprovePage() {
  const params = useParams();
  const router = useRouter();
  const poolId = params.poolId as string;
  const matchId = params.matchId as string;

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    checkOwnerAndFetchMatch();
  }, []);

  const checkOwnerAndFetchMatch = async () => {
    try {
      // Check if user is pool owner
      const poolRes = await fetch(`/api/pools/${poolId}`);
      if (!poolRes.ok) {
        alert("Pool 정보를 불러오는데 실패했습니다.");
        router.push(`/pools/${poolId}/matches`);
        return;
      }

      const poolData = await poolRes.json();
      const userRes = await fetch("/api/auth/me");
      if (userRes.ok) {
        const userData = await userRes.json();
        if (poolData.data.ownerId !== userData.data.id) {
          alert("Pool 관리자만 결과를 승인할 수 있습니다.");
          router.push(`/pools/${poolId}/matches`);
          return;
        }
        setIsOwner(true);
      }

      // Fetch match
      const matchRes = await fetch(`/api/pools/${poolId}/matches/${matchId}`);
      if (matchRes.ok) {
        const matchData = await matchRes.json();
        const match = matchData.data;

        if (match.status !== "RESULT_PENDING") {
          alert("승인 대기 중인 전적만 승인할 수 있습니다.");
          router.push(`/pools/${poolId}/matches`);
          return;
        }

        setMatch(match);
      } else {
        alert("전적을 불러오는데 실패했습니다.");
        router.push(`/pools/${poolId}/matches`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
      router.push(`/pools/${poolId}/matches`);
    } finally {
      setLoading(false);
    }
  };

  const sortPlayersByPosition = (players: Player[]) => {
    return [...players].sort((a, b) => {
      const orderA = POSITION_ORDER[a.assignedPosition] || 999;
      const orderB = POSITION_ORDER[b.assignedPosition] || 999;
      return orderA - orderB;
    });
  };

  const getPlayerStats = (userId: string) => {
    if (!match?.userRecords) return null;
    return match.userRecords.find((r: UserRecord) => r.userId === userId);
  };

  const calculatePredictedScore = (userId: string): number | null => {
    if (!match || !match.gameDuration) return null;

    const userRecord = match.userRecords.find((r) => r.userId === userId);
    if (!userRecord) return null;

    // Find lane opponent
    const opponentTeam = userRecord.teamNumber === 1 ? 2 : 1;
    const opponentRecord = match.userRecords.find(
      (r) => r.teamNumber === opponentTeam && r.assignedPosition === userRecord.assignedPosition
    );
    if (!opponentRecord) return null;

    // Determine if winner
    const isWinner =
      (match.team1Won && userRecord.teamNumber === 1) ||
      (!match.team1Won && userRecord.teamNumber === 2);

    // Get streak count
    const streakCount = match.userStreaks?.[userId] || 0;

    // Get team total kills
    const teamTotalKills = userRecord.teamNumber === 1 ? match.team1Kills : match.team2Kills;

    // Calculate game duration in minutes
    const gameDurationMinutes = match.gameDuration / 60;

    // Calculate score
    const scoreChange = calculateScore({
      userRecord: {
        ...userRecord,
        originalScore: userRecord.user.score,
      },
      opponentRecord: {
        ...opponentRecord,
        originalScore: opponentRecord.user.score,
      },
      isWinner,
      streakCount,
      gameDurationMinutes,
      teamTotalKills,
    });

    return scoreChange;
  };

  const handleApprove = async () => {
    if (!confirm("결과를 승인하시겠습니까? 승인하면 점수가 반영되고 되돌릴 수 없습니다.")) {
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch(`/api/pools/${poolId}/matches/${matchId}/approve`, {
        method: "POST",
      });

      if (res.ok) {
        alert("결과가 승인되었습니다. 점수가 반영되었습니다.");
        router.push(`/pools/${poolId}/matches`);
      } else {
        const data = await res.json();
        alert(data.error || "승인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error approving result:", error);
      alert("승인 중 오류가 발생했습니다.");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!confirm("결과를 거부하시겠습니까? 거부하면 다시 결과 입력 단계로 돌아갑니다.")) {
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch(`/api/pools/${poolId}/matches/${matchId}/reject`, {
        method: "POST",
      });

      if (res.ok) {
        alert("결과가 거부되었습니다.");
        router.push(`/pools/${poolId}/matches`);
      } else {
        const data = await res.json();
        alert(data.error || "거부에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error rejecting result:", error);
      alert("거부 중 오류가 발생했습니다.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!match || !isOwner) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/pools/${poolId}/matches`}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-2 inline-block"
        >
          ← 전적 목록으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          결과 승인
        </h1>
        <p className="text-[var(--text-muted)] mt-2">
          아래 결과를 확인하고 승인 또는 거부해주세요.
        </p>
      </div>

      {/* Winner Display */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          승리 팀
        </h2>
        <div className="text-center py-6">
          <div
            className={`inline-block px-8 py-4 rounded-lg text-2xl font-bold ${
              match.team1Won
                ? "bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]"
                : "bg-[var(--accent-blue)]/20 text-[var(--accent-blue)]"
            }`}
          >
            {match.team1Won ? "Team 1 승리" : "Team 2 승리"}
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          팀 통계
        </h2>
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-[var(--accent-purple)] mb-4">
              Team 1
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-[var(--text-muted)]">킬수</span>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {match.team1Kills}
                </p>
              </div>
              <div>
                <span className="text-sm text-[var(--text-muted)]">골드</span>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {match.team1Gold.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--accent-blue)] mb-4">
              Team 2
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-[var(--text-muted)]">킬수</span>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {match.team2Kills}
                </p>
              </div>
              <div>
                <span className="text-sm text-[var(--text-muted)]">골드</span>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {match.team2Gold.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Stats */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          개별 플레이어 통계
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team 1 Players */}
          <div>
            <h3 className="font-semibold text-[var(--accent-purple)] mb-3">
              Team 1 {match.team1Won && "🏆"}
            </h3>
            <div className="space-y-3">
              {sortPlayersByPosition(match.team1Data.players).map((player) => {
                const stats = getPlayerStats(player.userId);
                const predictedScore = calculatePredictedScore(player.userId);
                const currentScore = stats?.user.score || 0;
                return (
                  <div
                    key={player.userId}
                    className="bg-[var(--bg)] p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--accent-purple)] w-12">
                          {POSITION_LABELS[player.assignedPosition]}
                        </span>
                        <div>
                          <span className="text-sm font-semibold text-[var(--text-primary)]">
                            {player.name || player.username}
                          </span>
                          {stats?.championName && (
                            <span className="text-xs text-[var(--accent-purple)] ml-2">
                              {stats.championName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">K/D/A</p>
                        <p className="font-bold text-[var(--text-primary)]">
                          {stats?.kills || 0}/{stats?.deaths || 0}/{stats?.assists || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">CS</p>
                        <p className="font-bold text-[var(--text-primary)]">
                          {stats?.cs || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">점수</p>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-[var(--text-primary)]">
                            {currentScore}
                          </span>
                          {predictedScore !== null && (
                            <span
                              className={`font-bold ${
                                predictedScore > 0
                                  ? "text-green-500"
                                  : predictedScore < 0
                                  ? "text-red-500"
                                  : "text-[var(--text-muted)]"
                              }`}
                            >
                              {predictedScore > 0 ? "+" : ""}
                              {predictedScore}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team 2 Players */}
          <div>
            <h3 className="font-semibold text-[var(--accent-blue)] mb-3">
              Team 2 {!match.team1Won && "🏆"}
            </h3>
            <div className="space-y-3">
              {sortPlayersByPosition(match.team2Data.players).map((player) => {
                const stats = getPlayerStats(player.userId);
                const predictedScore = calculatePredictedScore(player.userId);
                const currentScore = stats?.user.score || 0;
                return (
                  <div
                    key={player.userId}
                    className="bg-[var(--bg)] p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--accent-blue)] w-12">
                          {POSITION_LABELS[player.assignedPosition]}
                        </span>
                        <div>
                          <span className="text-sm font-semibold text-[var(--text-primary)]">
                            {player.name || player.username}
                          </span>
                          {stats?.championName && (
                            <span className="text-xs text-[var(--accent-blue)] ml-2">
                              {stats.championName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">K/D/A</p>
                        <p className="font-bold text-[var(--text-primary)]">
                          {stats?.kills || 0}/{stats?.deaths || 0}/{stats?.assists || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">CS</p>
                        <p className="font-bold text-[var(--text-primary)]">
                          {stats?.cs || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">점수</p>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-[var(--text-primary)]">
                            {currentScore}
                          </span>
                          {predictedScore !== null && (
                            <span
                              className={`font-bold ${
                                predictedScore > 0
                                  ? "text-green-500"
                                  : predictedScore < 0
                                  ? "text-red-500"
                                  : "text-[var(--text-muted)]"
                              }`}
                            >
                              {predictedScore > 0 ? "+" : ""}
                              {predictedScore}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleReject}
          disabled={processing}
          className="px-6 py-3 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded-lg font-semibold transition-colors"
        >
          {processing ? "처리 중..." : "거부"}
        </button>
        <button
          onClick={handleApprove}
          disabled={processing}
          className="btn-primary px-8 py-3"
        >
          {processing ? "처리 중..." : "승인 및 점수 반영"}
        </button>
      </div>
    </div>
  );
}
