interface PlayerRowProps {
  player: {
    userId: string;
    username: string;
    name: string;
    assignedPosition: string;
  };
  champion: string | null;
  stats: any;
  matchStatus: string;
  positionLabel: string;
  accentColor: string;
}

export default function PlayerRow({
  player,
  champion,
  stats,
  matchStatus,
  positionLabel,
  accentColor,
}: PlayerRowProps) {
  const hasStats =
    stats &&
    (stats.kills !== null || stats.deaths !== null || stats.assists !== null);

  return (
    <div className="flex items-center justify-between bg-[var(--bg)] p-2 rounded gap-2">
      {/* Position */}
      <span
        className={`text-xs font-semibold ${accentColor} w-10 flex-shrink-0`}
      >
        {positionLabel}
      </span>

      {/* Name & Champion */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex flex-col min-w-0">
          <span className="text-sm text-[var(--text-primary)] truncate">
            {player.name || player.username}
          </span>
          {champion && (
            <span className={`text-xs ${accentColor} font-semibold truncate`}>
              {champion}
            </span>
          )}
        </div>

        {/* Stats for RESULT_PENDING or COMPLETED */}
        {(matchStatus === "RESULT_PENDING" || matchStatus === "COMPLETED") &&
          hasStats && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-[var(--text-primary)] font-semibold">
                {stats.kills || 0}/{stats.deaths || 0}/{stats.assists || 0}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {stats.cs || 0}CS
              </span>
            </div>
          )}
      </div>

      {/* Score */}
      {(matchStatus === "RESULT_PENDING" || matchStatus === "COMPLETED") &&
      hasStats ? (
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-xs text-[var(--text-muted)]">
            {stats.originalScore || 0}
          </span>
          {stats.adjustedScore && stats.adjustedScore !== 0 && (
            <span
              className={`text-xs font-bold ${
                stats.adjustedScore > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stats.adjustedScore > 0 ? "+" : ""}
              {stats.adjustedScore}
            </span>
          )}
        </div>
      ) : (
        <span className="text-sm text-[var(--text-muted)] flex-shrink-0">
          {stats?.originalScore || 0}점
        </span>
      )}
    </div>
  );
}
