interface WinnerSelectionProps {
  team1Won: boolean | null;
  onSelectWinner: (team1Won: boolean) => void;
}

export default function WinnerSelection({
  team1Won,
  onSelectWinner,
}: WinnerSelectionProps) {
  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
        승리 팀 선택
      </h2>
      <div className="flex gap-4">
        <button
          onClick={() => onSelectWinner(true)}
          className={`flex-1 py-4 rounded-lg font-semibold transition-all ${
            team1Won === true
              ? "bg-[var(--accent-purple)] text-white"
              : "bg-[var(--card-bg)] border-2 border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-purple)]"
          }`}
        >
          Team 1 승리
        </button>
        <button
          onClick={() => onSelectWinner(false)}
          className={`flex-1 py-4 rounded-lg font-semibold transition-all ${
            team1Won === false
              ? "bg-[var(--accent-blue)] text-white"
              : "bg-[var(--card-bg)] border-2 border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
          }`}
        >
          Team 2 승리
        </button>
      </div>
    </div>
  );
}
