import { useState } from "react";
import { Champion, SessionData } from "./types";

interface ChampionGridProps {
  champions: Champion[];
  session: SessionData;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onChampionSelect: (champion: Champion) => void;
  onSelectionChange?: (champion: Champion | null) => void;
  isMyTurn: boolean;
  actionLoading: boolean;
}

export default function ChampionGrid({
  champions,
  session,
  searchQuery,
  onSearchChange,
  onChampionSelect,
  onSelectionChange,
  isMyTurn,
  actionLoading,
}: ChampionGridProps) {
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(
    null
  );

  const isChampionDisabled = (champion: Champion) => {
    return (
      session.bans.some((b) => b.championId === champion.id) ||
      session.picks.some((p) => p.championId === champion.id)
    );
  };

  const filteredChampions = champions.filter((champ) =>
    champ.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChampionClick = (champion: Champion) => {
    if (!isMyTurn || actionLoading || isChampionDisabled(champion)) return;
    setSelectedChampion(champion);
    onSelectionChange?.(champion);
  };

  const handleConfirmSelection = () => {
    if (selectedChampion) {
      onChampionSelect(selectedChampion);
      setSelectedChampion(null);
      onSelectionChange?.(null);
    }
  };

  return (
    <div className="card flex flex-col h-full">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 text-center">
        챔피언 선택
      </h2>

      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="챔피언 검색..."
        className="input w-full mb-4"
        disabled={!isMyTurn || actionLoading}
      />

      {/* Champion Grid */}
      <div className="overflow-y-auto mb-4" style={{ maxHeight: "1000px" }}>
        <div className="grid grid-cols-6 gap-2">
          {filteredChampions.map((champion) => {
            const disabled = isChampionDisabled(champion);
            const isSelected = selectedChampion?.id === champion.id;
            return (
              <button
                key={champion.id}
                onClick={() => handleChampionClick(champion)}
                disabled={!isMyTurn || disabled || actionLoading}
                className={`relative aspect-square rounded border overflow-hidden transition-all shadow-sm ${
                  disabled
                    ? "opacity-30 cursor-not-allowed border-[var(--border)]/30"
                    : isSelected
                    ? "border-4 border-transparent bg-gradient-to-br from-[var(--accent-purple)] via-[var(--accent-blue)] to-[var(--accent-pink)] p-[4px] shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-105"
                    : isMyTurn && !actionLoading
                    ? "border-[var(--border)]/30 hover:border-[var(--accent-purple)]/50 hover:shadow-md hover:scale-105 cursor-pointer"
                    : "border-[var(--border)]/30 opacity-50 cursor-not-allowed"
                }`}
                title={champion.name}
              >
                <img
                  src={champion.image}
                  alt={champion.name}
                  className={`w-full h-full object-cover ${
                    isSelected ? "rounded-sm" : ""
                  }`}
                />
                {disabled && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-500"
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
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirm Button */}
      {isMyTurn && !actionLoading && (
        <button
          onClick={handleConfirmSelection}
          disabled={!selectedChampion}
          className={`w-1/2 mx-auto py-3 rounded-lg font-bold text-lg transition-all ${
            selectedChampion
              ? "bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] shadow-lg"
              : "bg-[var(--surface)] text-[var(--text-muted)] cursor-not-allowed opacity-50"
          }`}
        >
          {selectedChampion
            ? `${selectedChampion.name} 선택`
            : "챔피언을 선택하세요"}
        </button>
      )}

      {/* Loading Indicator */}
      {actionLoading && (
        <div className="py-3 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--accent-purple)] mx-auto"></div>
          <p className="text-sm text-[var(--text-muted)] mt-2">처리 중...</p>
        </div>
      )}
    </div>
  );
}
