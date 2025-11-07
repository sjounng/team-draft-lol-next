import { TeamPlayer } from "./types";

interface TeamPlayerCardProps {
  player: TeamPlayer;
  index: number;
  team: 'team1' | 'team2';
  isManualMode: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  accentColor: string;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
}

const getPositionBadgeStyle = (positionType: string) => {
  if (positionType === "MAIN") {
    return {
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      color: "#16a34a",
      border: "1px solid rgba(34, 197, 94, 0.3)",
    };
  }
  if (positionType === "SUB") {
    return {
      backgroundColor: "rgba(234, 179, 8, 0.2)",
      color: "#ca8a04",
      border: "1px solid rgba(234, 179, 8, 0.3)",
    };
  }
  return {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    color: "#dc2626",
    border: "1px solid rgba(239, 68, 68, 0.3)",
  };
};

export default function TeamPlayerCard({
  player,
  index,
  team,
  isManualMode,
  isDragging,
  isDragOver,
  accentColor,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragOver,
  onDragEnter,
  onDragLeave,
}: TeamPlayerCardProps) {
  return (
    <div
      draggable={isManualMode}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      className={`p-4 rounded-lg bg-[var(--surface-hover)] border transition-all ${
        isDragging
          ? 'opacity-50 border-[var(--border)]/50'
          : isDragOver
          ? `border-[${accentColor}] border-2 scale-105 shadow-lg bg-[${accentColor}]/10`
          : isManualMode
          ? `cursor-move hover:border-[${accentColor}] border-[var(--border)]/50`
          : 'border-[var(--border)]/50'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className={`badge px-3 py-1.5 text-sm font-bold bg-[${accentColor}]/20`} style={{ color: accentColor }}>
            {player.assignedPosition}
          </span>
          <span className="font-semibold text-[var(--text-primary)]">
            {player.username}
          </span>
        </div>
        <span className="text-lg font-bold text-[var(--text-primary)]">
          {player.adjustedScore}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="badge px-2.5 py-1 text-xs font-semibold rounded"
            style={getPositionBadgeStyle(player.positionType)}
          >
            {player.positionType === "MAIN"
              ? "주 라인"
              : player.positionType === "SUB"
              ? "부 라인"
              : "필 라인"}
          </span>
          {player.mainLane && (
            <span className="text-xs text-[var(--text-muted)]">
              ({player.mainLane}
              {player.subLane ? ` / ${player.subLane}` : ""})
            </span>
          )}
        </div>
        {player.riotId && (
          <span className="text-xs text-[var(--text-muted)]">
            {player.riotId}#{player.riotTag}
          </span>
        )}
      </div>
    </div>
  );
}
