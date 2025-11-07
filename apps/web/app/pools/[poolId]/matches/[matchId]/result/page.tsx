"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Match, Player, PlayerStats } from "@/app/components/result/types";
import WinnerSelection from "@/app/components/result/WinnerSelection";
import GameDurationInput from "@/app/components/result/GameDurationInput";
import TeamStatsInput from "@/app/components/result/TeamStatsInput";
import TeamPlayerStatsPanel from "@/app/components/result/TeamPlayerStatsPanel";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const poolId = params.poolId as string;
  const matchId = params.matchId as string;

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [team1Won, setTeam1Won] = useState<boolean | null>(null);
  const [team1Kills, setTeam1Kills] = useState<string>("");
  const [team2Kills, setTeam2Kills] = useState<string>("");
  const [team1Gold, setTeam1Gold] = useState<string>("");
  const [team2Gold, setTeam2Gold] = useState<string>("");
  const [gameDuration, setGameDuration] = useState<string>(""); // MM:SS format
  const [playerStats, setPlayerStats] = useState<Record<string, PlayerStats>>({});

  useEffect(() => {
    fetchMatch();
  }, []);

  const fetchMatch = async () => {
    try {
      const res = await fetch(`/api/pools/${poolId}/matches/${matchId}`);
      if (res.ok) {
        const data = await res.json();
        const matchData = data.data;

        // Check if status is DRAFT_COMPLETE or RESULT_PENDING
        if (matchData.status !== "DRAFT_COMPLETE" && matchData.status !== "RESULT_PENDING") {
          alert("밴픽이 완료된 전적만 결과를 입력할 수 있습니다.");
          router.push(`/pools/${poolId}/matches`);
          return;
        }

        setMatch(matchData);

        // Load existing data if RESULT_PENDING
        if (matchData.status === "RESULT_PENDING") {
          setTeam1Won(matchData.team1Won);
          setTeam1Kills(matchData.team1Kills?.toString() || "");
          setTeam2Kills(matchData.team2Kills?.toString() || "");
          setTeam1Gold(matchData.team1Gold?.toString() || "");
          setTeam2Gold(matchData.team2Gold?.toString() || "");

          // Convert seconds to MM:SS format
          if (matchData.gameDuration) {
            const minutes = Math.floor(matchData.gameDuration / 60);
            const seconds = matchData.gameDuration % 60;
            setGameDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
          }
        }

        // Initialize player stats
        const initialStats: Record<string, PlayerStats> = {};
        [...matchData.team1Data.players, ...matchData.team2Data.players].forEach(
          (player: Player) => {
            // Load existing stats if available
            const userRecord = matchData.userRecords?.find((r: any) => r.userId === player.userId);
            initialStats[player.userId] = {
              userId: player.userId,
              kills: userRecord?.kills ?? null,
              deaths: userRecord?.deaths ?? null,
              assists: userRecord?.assists ?? null,
              cs: userRecord?.cs ?? null,
            };
          }
        );
        setPlayerStats(initialStats);
      } else {
        alert("전적을 불러오는데 실패했습니다.");
        router.push(`/pools/${poolId}/matches`);
      }
    } catch (error) {
      console.error("Error fetching match:", error);
      alert("전적을 불러오는 중 오류가 발생했습니다.");
      router.push(`/pools/${poolId}/matches`);
    } finally {
      setLoading(false);
    }
  };

  const updatePlayerStat = (
    userId: string,
    field: keyof PlayerStats,
    value: string
  ) => {
    if (field === "userId") return;
    const numValue = value === "" ? null : parseInt(value);
    setPlayerStats((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: numValue !== null && numValue < 0 ? 0 : numValue,
      },
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (team1Won === null) {
      alert("승리 팀을 선택해주세요.");
      return;
    }

    const t1Kills = parseInt(team1Kills) || 0;
    const t2Kills = parseInt(team2Kills) || 0;
    const t1Gold = parseInt(team1Gold) || 0;
    const t2Gold = parseInt(team2Gold) || 0;

    if (t1Kills === 0 && t2Kills === 0) {
      alert("팀 킬수를 입력해주세요.");
      return;
    }

    if (t1Gold === 0 && t2Gold === 0) {
      alert("팀 골드를 입력해주세요.");
      return;
    }

    // Validate game duration (MM:SS format)
    if (!gameDuration) {
      alert("게임 시간을 입력해주세요.");
      return;
    }

    const timeMatch = gameDuration.match(/^(\d{1,2}):(\d{2})$/);
    if (!timeMatch) {
      alert("게임 시간을 MM:SS 형식으로 입력해주세요 (예: 25:30)");
      return;
    }

    const minutes = parseInt(timeMatch[1]);
    const seconds = parseInt(timeMatch[2]);
    if (seconds >= 60) {
      alert("초는 59 이하여야 합니다.");
      return;
    }

    const durationInSeconds = minutes * 60 + seconds;

    // Check if all player stats are filled
    const allFilled = Object.values(playerStats).every(
      (stat) =>
        stat.kills !== null && stat.deaths !== null && stat.assists !== null && stat.cs !== null
    );

    if (!allFilled) {
      alert("모든 플레이어의 통계를 입력해주세요.");
      return;
    }

    // Convert player stats to ensure all values are numbers
    const convertedPlayerStats = Object.values(playerStats).map(stat => ({
      userId: stat.userId,
      kills: stat.kills ?? 0,
      deaths: stat.deaths ?? 0,
      assists: stat.assists ?? 0,
      cs: stat.cs ?? 0,
    }));

    setSubmitting(true);
    try {
      const res = await fetch(`/api/pools/${poolId}/matches/${matchId}/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team1Won,
          team1Kills: t1Kills,
          team2Kills: t2Kills,
          team1Gold: t1Gold,
          team2Gold: t2Gold,
          gameDuration: durationInSeconds,
          playerStats: convertedPlayerStats,
        }),
      });

      if (res.ok) {
        alert("결과가 제출되었습니다. 관리자의 승인을 기다려주세요.");
        router.push(`/pools/${poolId}/matches`);
      } else {
        const data = await res.json();
        alert(data.error || "결과 제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting result:", error);
      alert("결과 제출 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!match) {
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
          결과 입력
        </h1>
      </div>

      {/* Winner Selection */}
      <WinnerSelection team1Won={team1Won} onSelectWinner={setTeam1Won} />

      {/* Game Duration */}
      <GameDurationInput gameDuration={gameDuration} onChange={setGameDuration} />

      {/* Team Stats */}
      <TeamStatsInput
        team1Kills={team1Kills}
        team2Kills={team2Kills}
        team1Gold={team1Gold}
        team2Gold={team2Gold}
        onTeam1KillsChange={setTeam1Kills}
        onTeam2KillsChange={setTeam2Kills}
        onTeam1GoldChange={setTeam1Gold}
        onTeam2GoldChange={setTeam2Gold}
      />

      {/* Player Stats */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          개별 플레이어 통계
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team 1 Players */}
          <TeamPlayerStatsPanel
            teamNumber={1}
            teamName="Team 1"
            accentColor="text-[var(--accent-purple)]"
            players={match.team1Data.players}
            playerStats={playerStats}
            match={match}
            onUpdatePlayerStat={updatePlayerStat}
          />

          {/* Team 2 Players */}
          <TeamPlayerStatsPanel
            teamNumber={2}
            teamName="Team 2"
            accentColor="text-[var(--accent-blue)]"
            players={match.team2Data.players}
            playerStats={playerStats}
            match={match}
            onUpdatePlayerStat={updatePlayerStat}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Link href={`/pools/${poolId}/matches`} className="btn-secondary">
          취소
        </Link>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-primary"
        >
          {submitting ? "제출 중..." : "결과 제출"}
        </button>
      </div>
    </div>
  );
}
