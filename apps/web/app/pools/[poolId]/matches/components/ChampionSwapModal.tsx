"use client";

import { useState } from "react";
import { Player } from "../types";

interface ChampionSwapModalProps {
  matchId: string;
  poolId: string;
  team1Players: Player[];
  team2Players: Player[];
  onClose: () => void;
  onSwapSuccess: () => void;
}

export default function ChampionSwapModal({
  matchId,
  poolId,
  team1Players,
  team2Players,
  onClose,
  onSwapSuccess,
}: ChampionSwapModalProps) {
  const [selectedTeam, setSelectedTeam] = useState<1 | 2>(1);
  const [draggedPlayer, setDraggedPlayer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentTeamPlayers = selectedTeam === 1 ? team1Players : team2Players;

  const handleDragStart = (userId: string) => {
    setDraggedPlayer(userId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (targetUserId: string) => {
    if (!draggedPlayer || draggedPlayer === targetUserId) {
      setDraggedPlayer(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/pools/${poolId}/matches/${matchId}/swap-champions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId1: draggedPlayer,
            userId2: targetUserId,
          }),
        }
      );

      if (res.ok) {
        onSwapSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "챔피언 교환에 실패했습니다.");
      }
    } catch (err) {
      console.error("Error swapping champions:", err);
      setError("챔피언 교환 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      setDraggedPlayer(null);
    }
  };

  const getPlayerChampion = (player: Player) => {
    return player.championName || "미배정";
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="card max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          챔피언 교환
        </h2>
        <p className="text-[var(--text-muted)] mb-6">
          챔피언을 드래그하여 다른 플레이어 위에 놓으면 서로 교환됩니다.
        </p>

        {/* Team Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedTeam(1)}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedTeam === 1
                ? "bg-blue-500 text-white"
                : "bg-[var(--surface)] text-[var(--text-secondary)]"
            }`}
          >
            팀 1
          </button>
          <button
            onClick={() => setSelectedTeam(2)}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedTeam === 2
                ? "bg-red-500 text-white"
                : "bg-[var(--surface)] text-[var(--text-secondary)]"
            }`}
          >
            팀 2
          </button>
        </div>

        {/* Player List */}
        <div className="space-y-2 mb-6">
          {currentTeamPlayers.map((player) => (
            <div
              key={player.userId}
              draggable={!loading}
              onDragStart={() => handleDragStart(player.userId)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(player.userId)}
              className={`w-full p-4 rounded-lg border-2 transition-all cursor-move ${
                draggedPlayer === player.userId
                  ? "opacity-50 border-[var(--primary)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 hover:scale-[1.02]"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Drag Handle */}
                <div className="text-[var(--text-muted)]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                  </svg>
                </div>

                {/* Position */}
                <span
                  className={`text-sm font-semibold min-w-[3rem] ${
                    selectedTeam === 1 ? "text-blue-400" : "text-red-400"
                  }`}
                >
                  {player.assignedPosition}
                </span>

                {/* Champion Image */}
                {player.championId ? (
                  <div className="w-12 h-12 rounded overflow-hidden border border-[var(--border)] flex-shrink-0">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${player.championId}.png`}
                      alt={player.championName || ""}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                    <span className="text-[var(--text-muted)] text-xs">?</span>
                  </div>
                )}

                {/* Player Info */}
                <div className="flex-1 text-left">
                  <div className="font-semibold text-[var(--text-primary)]">
                    {player.username}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {getPlayerChampion(player)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary"
            disabled={loading}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
