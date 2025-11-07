interface TeamStatsInputProps {
  team1Kills: string;
  team2Kills: string;
  team1Gold: string;
  team2Gold: string;
  onTeam1KillsChange: (value: string) => void;
  onTeam2KillsChange: (value: string) => void;
  onTeam1GoldChange: (value: string) => void;
  onTeam2GoldChange: (value: string) => void;
}

export default function TeamStatsInput({
  team1Kills,
  team2Kills,
  team1Gold,
  team2Gold,
  onTeam1KillsChange,
  onTeam2KillsChange,
  onTeam1GoldChange,
  onTeam2GoldChange,
}: TeamStatsInputProps) {
  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
        팀 통계
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team 1 Stats */}
        <div>
          <h3 className="font-semibold text-[var(--accent-purple)] mb-3">
            Team 1
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">
                총 킬수
              </label>
              <input
                type="number"
                min="0"
                value={team1Kills}
                onChange={(e) => onTeam1KillsChange(e.target.value)}
                placeholder="0"
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">
                총 골드
              </label>
              <input
                type="number"
                min="0"
                value={team1Gold}
                onChange={(e) => onTeam1GoldChange(e.target.value)}
                placeholder="0"
                className="input w-full"
              />
            </div>
          </div>
        </div>

        {/* Team 2 Stats */}
        <div>
          <h3 className="font-semibold text-[var(--accent-blue)] mb-3">
            Team 2
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">
                총 킬수
              </label>
              <input
                type="number"
                min="0"
                value={team2Kills}
                onChange={(e) => onTeam2KillsChange(e.target.value)}
                placeholder="0"
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">
                총 골드
              </label>
              <input
                type="number"
                min="0"
                value={team2Gold}
                onChange={(e) => onTeam2GoldChange(e.target.value)}
                placeholder="0"
                className="input w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
