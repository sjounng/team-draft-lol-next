import { Player, PlayerStats, Match } from "./types";
import { POSITION_ORDER } from "./constants";
import PlayerStatsInput from "./PlayerStatsInput";

interface TeamPlayerStatsPanelProps {
  teamNumber: 1 | 2;
  teamName: string;
  accentColor: string;
  players: Player[];
  playerStats: Record<string, PlayerStats>;
  match: Match;
  onUpdatePlayerStat: (userId: string, field: keyof PlayerStats, value: string) => void;
}

const sortPlayersByPosition = (players: Player[]) => {
  return [...players].sort((a, b) => {
    const orderA = POSITION_ORDER[a.assignedPosition] || 999;
    const orderB = POSITION_ORDER[b.assignedPosition] || 999;
    return orderA - orderB;
  });
};

const getPlayerChampion = (userId: string, match: Match) => {
  if (!match?.userRecords) return null;
  const record = match.userRecords.find((r: any) => r.userId === userId);
  return record?.championName || null;
};

export default function TeamPlayerStatsPanel({
  teamNumber,
  teamName,
  accentColor,
  players,
  playerStats,
  match,
  onUpdatePlayerStat,
}: TeamPlayerStatsPanelProps) {
  return (
    <div>
      <h3 className={`font-semibold ${accentColor} mb-3`}>
        {teamName}
      </h3>
      <div className="space-y-4">
        {sortPlayersByPosition(players).map((player) => {
          const champion = getPlayerChampion(player.userId, match);
          const stats = playerStats[player.userId];
          return (
            <PlayerStatsInput
              key={player.userId}
              player={player}
              stats={stats}
              champion={champion}
              accentColor={accentColor}
              onUpdateStat={(field, value) => onUpdatePlayerStat(player.userId, field, value)}
            />
          );
        })}
      </div>
    </div>
  );
}
