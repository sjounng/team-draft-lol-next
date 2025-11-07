import { Champion, SessionData } from "./types";

interface ChampionGridProps {
  champions: Champion[];
  session: SessionData;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onChampionSelect: (champion: Champion) => void;
  isMyTurn: boolean;
  actionLoading: boolean;
}

export default function ChampionGrid({
  champions,
  session,
  searchQuery,
  onSearchChange,
  onChampionSelect,
  isMyTurn,
  actionLoading,
}: ChampionGridProps) {
  const isChampionDisabled = (champion: Champion) => {
    return (
      session.bans.some((b) => b.championId === champion.id) ||
      session.picks.some((p) => p.championId === champion.id)
    );
  };

  const filteredChampions = champions.filter((champ) =>
    champ.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card">
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
      <div className="max-h-[600px] overflow-y-auto">
        <div className="grid grid-cols-4 gap-2">
          {filteredChampions.map((champion) => {
            const disabled = isChampionDisabled(champion);
            return (
              <button
                key={champion.id}
                onClick={() => onChampionSelect(champion)}
                disabled={!isMyTurn || disabled || actionLoading}
                className={`relative aspect-square rounded border-2 overflow-hidden transition-all ${
                  disabled
                    ? "opacity-30 cursor-not-allowed border-[var(--border-color)]"
                    : isMyTurn && !actionLoading
                    ? "border-[var(--border-color)] hover:border-[var(--primary)] hover:scale-105 cursor-pointer"
                    : "border-[var(--border-color)] opacity-50 cursor-not-allowed"
                }`}
                title={champion.name}
              >
                <img
                  src={champion.image}
                  alt={champion.name}
                  className="w-full h-full object-cover"
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

      {/* Loading Indicator */}
      {actionLoading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--primary)] mx-auto"></div>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            처리 중...
          </p>
        </div>
      )}
    </div>
  );
}
