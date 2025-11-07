"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ChampionStat {
  statId: string;
  championId: string;
  championName: string;
  position: string;
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  pickRate: number;
  avgKda: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  avgCs: number;
  tier: string | null;
  score: number;
  csPerMin: number;
  updatedAt: string;
}

const POSITIONS = [
  { key: "TOP", label: "탑" },
  { key: "JGL", label: "정글" },
  { key: "MID", label: "미드" },
  { key: "ADC", label: "원딜" },
  { key: "SUP", label: "서포터" },
];

export default function TiersPage() {
  const [position, setPosition] = useState("TOP");
  const [champions, setChampions] = useState<ChampionStat[]>([]);
  const [totalPositionGames, setTotalPositionGames] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedChampion, setSelectedChampion] = useState<ChampionStat | null>(
    null
  );

  useEffect(() => {
    fetchTiers(position);
  }, [position]);

  const fetchTiers = async (pos: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/tiers?position=${pos}`);
      if (res.ok) {
        const data = await res.json();
        setChampions(data.data.champions);
        setTotalPositionGames(data.data.totalPositionGames);
      } else {
        const data = await res.json();
        setError(data.error || "티어 목록을 불러오는데 실패했습니다.");
      }
    } catch (err) {
      console.error("Error fetching tiers:", err);
      setError("티어 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getTierBorderColor = (tier: string | null) => {
    switch (tier) {
      case "S":
        return "border-yellow-500/50";
      case "A":
        return "border-purple-500/50";
      case "B":
        return "border-blue-500/50";
      case "C":
        return "border-green-500/50";
      case "D":
        return "border-gray-500/50";
      default:
        return "border-[var(--border)]";
    }
  };

  const getTierColor = (tier: string | null) => {
    switch (tier) {
      case "S":
        return {
          bg: "bg-yellow-500/20",
          text: "text-yellow-400",
          border: "border-yellow-500/50",
        };
      case "A":
        return {
          bg: "bg-purple-500/20",
          text: "text-purple-400",
          border: "border-purple-500/50",
        };
      case "B":
        return {
          bg: "bg-blue-500/20",
          text: "text-blue-400",
          border: "border-blue-500/50",
        };
      case "C":
        return {
          bg: "bg-green-500/20",
          text: "text-green-400",
          border: "border-green-500/50",
        };
      case "D":
        return {
          bg: "bg-gray-500/20",
          text: "text-gray-400",
          border: "border-gray-500/50",
        };
      default:
        return {
          bg: "bg-gray-500/10",
          text: "text-gray-500",
          border: "border-gray-500/30",
        };
    }
  };

  if (loading && champions.length === 0) {
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
          챔피언 티어
        </h1>
        <p className="text-[var(--text-muted)]">
          포지션별 챔피언 승률과 통계를 확인하세요
        </p>
      </div>

      {/* Position Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {POSITIONS.map((pos) => (
          <button
            key={pos.key}
            onClick={() => setPosition(pos.key)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
              position === pos.key
                ? "bg-[var(--primary)] text-white shadow-lg scale-105"
                : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            {pos.label}
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div className="card">
          <div className="text-sm text-[var(--text-muted)] mb-1">
            전체 게임 수
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {totalPositionGames}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {/* Champion Rankings */}
      <div className="space-y-3">
        {champions.map((champion, index) => {
          const rank = index + 1;
          const tierColors = getTierColor(champion.tier);
          const tierBorder = getTierBorderColor(champion.tier);
          return (
            <button
              key={champion.statId}
              onClick={() => setSelectedChampion(champion)}
              className={`w-full card border-2 ${tierBorder} hover:scale-[1.01] transition-all`}
            >
              <div className="flex items-center gap-4">
                {/* Rank Number */}
                <div className="flex-shrink-0 w-16 text-left">
                  <span className="text-lg font-semibold text-[var(--text-muted)]">
                    #{rank}
                  </span>
                </div>

                {/* Tier Badge - Emphasized */}
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-lg ${tierColors.bg} border-2 ${tierColors.border} flex items-center justify-center`}
                >
                  <span className={`text-3xl font-bold ${tierColors.text}`}>
                    {champion.tier}
                  </span>
                </div>

                {/* Champion Image */}
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${champion.championId}.png`}
                    alt={champion.championName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-champion.png";
                    }}
                  />
                </div>

                {/* Champion Name */}
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-bold text-lg text-[var(--text-primary)] truncate">
                    {champion.championName}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {champion.totalGames}게임
                  </p>
                </div>

                {/* Score */}
                <div className="flex-shrink-0 text-center px-4">
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    SCORE
                  </div>
                  <div className="text-2xl font-bold text-[var(--primary)]">
                    {champion.score.toFixed(1)}
                  </div>
                </div>

                {/* Win Rate */}
                <div className="flex-shrink-0 text-center px-4">
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    승률
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      champion.winRate >= 0.55
                        ? "text-green-400"
                        : champion.winRate >= 0.45
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {(champion.winRate * 100).toFixed(1)}%
                  </div>
                </div>

                {/* KDA */}
                <div className="flex-shrink-0 text-center px-4">
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    KDA
                  </div>
                  <div className="text-xl font-bold text-[var(--text-primary)]">
                    {champion.avgKda.toFixed(2)}
                  </div>
                </div>

                {/* CS/min */}
                <div className="flex-shrink-0 text-center px-4">
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    CS/분
                  </div>
                  <div className="text-xl font-bold text-[var(--text-primary)]">
                    {champion.csPerMin.toFixed(1)}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0 text-[var(--text-muted)]">
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {champions.length === 0 && !loading && (
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
            아직 데이터가 없습니다
          </h3>
          <p className="text-[var(--text-muted)] mb-6">
            게임을 플레이하여 챔피언 통계를 쌓아보세요!
          </p>
          <Link href="/dashboard" className="btn-primary">
            대시보드로 이동
          </Link>
        </div>
      )}

      {/* Champion Detail Modal */}
      {selectedChampion &&
        (() => {
          const modalTierColors = getTierColor(selectedChampion.tier);
          return (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedChampion(null)}
            >
              <div
                className="card max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${selectedChampion.championId}.png`}
                      alt={selectedChampion.championName}
                      className="w-20 h-20 rounded-lg"
                    />
                    {/* Tier Badge */}
                    <div
                      className={`absolute -top-2 -right-2 px-2 py-1 rounded-lg ${modalTierColors.bg} border-2 ${modalTierColors.border}`}
                    >
                      <span
                        className={`text-sm font-bold ${modalTierColors.text}`}
                      >
                        {selectedChampion.tier}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                      {selectedChampion.championName}
                    </h2>
                    <p className="text-[var(--text-muted)]">
                      {POSITIONS.find(
                        (p) => p.key === selectedChampion.position
                      )?.label || selectedChampion.position}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[var(--text-muted)]">
                      SCORE
                    </div>
                    <div className="text-3xl font-bold text-[var(--primary)]">
                      {selectedChampion.score.toFixed(1)}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="card bg-[var(--bg)]">
                    <div className="text-sm text-[var(--text-muted)] mb-1">
                      승률
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        selectedChampion.winRate >= 0.55
                          ? "text-green-400"
                          : selectedChampion.winRate >= 0.45
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {(selectedChampion.winRate * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {selectedChampion.wins}승 {selectedChampion.losses}패
                    </div>
                  </div>

                  <div className="card bg-[var(--bg)]">
                    <div className="text-sm text-[var(--text-muted)] mb-1">
                      플레이 횟수
                    </div>
                    <div className="text-2xl font-bold text-[var(--text-primary)]">
                      {selectedChampion.totalGames}
                    </div>
                  </div>

                  <div className="card bg-[var(--bg)]">
                    <div className="text-sm text-[var(--text-muted)] mb-1">
                      평균 KDA
                    </div>
                    <div className="text-2xl font-bold text-[var(--text-primary)]">
                      {selectedChampion.avgKda.toFixed(2)}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {selectedChampion.avgKills.toFixed(1)} /{" "}
                      {selectedChampion.avgDeaths.toFixed(1)} /{" "}
                      {selectedChampion.avgAssists.toFixed(1)}
                    </div>
                  </div>

                  <div className="card bg-[var(--bg)]">
                    <div className="text-sm text-[var(--text-muted)] mb-1">
                      CS/분
                    </div>
                    <div className="text-2xl font-bold text-[var(--text-primary)]">
                      {selectedChampion.csPerMin.toFixed(1)}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      평균 {selectedChampion.avgCs.toFixed(0)} CS
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedChampion(null)}
                  className="btn-secondary w-full mt-6"
                >
                  닫기
                </button>
              </div>
            </div>
          );
        })()}
    </div>
  );
}
