import { Player, PlayerStats } from "./types";
import { POSITION_LABELS } from "./constants";

interface PlayerStatsInputProps {
  player: Player;
  stats: PlayerStats | undefined;
  champion: string | null;
  accentColor: string;
  onUpdateStat: (field: keyof PlayerStats, value: string) => void;
}

export default function PlayerStatsInput({
  player,
  stats,
  champion,
  accentColor,
  onUpdateStat,
}: PlayerStatsInputProps) {
  return (
    <div className="bg-[var(--bg)] p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-semibold ${accentColor} w-12`}>
          {POSITION_LABELS[player.assignedPosition]}
        </span>
        <div className="flex flex-col flex-1">
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {player.name || player.username}
          </span>
          {champion && (
            <span className={`text-xs ${accentColor}`}>
              {champion}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-1">
            킬
          </label>
          <input
            type="number"
            min="0"
            value={stats?.kills ?? ""}
            onChange={(e) => onUpdateStat("kills", e.target.value)}
            placeholder="0"
            className="input w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-1">
            데스
          </label>
          <input
            type="number"
            min="0"
            value={stats?.deaths ?? ""}
            onChange={(e) => onUpdateStat("deaths", e.target.value)}
            placeholder="0"
            className="input w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-1">
            어시
          </label>
          <input
            type="number"
            min="0"
            value={stats?.assists ?? ""}
            onChange={(e) => onUpdateStat("assists", e.target.value)}
            placeholder="0"
            className="input w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--text-muted)] mb-1">
            CS
          </label>
          <input
            type="number"
            min="0"
            value={stats?.cs ?? ""}
            onChange={(e) => onUpdateStat("cs", e.target.value)}
            placeholder="0"
            className="input w-full text-sm"
          />
        </div>
      </div>
    </div>
  );
}
