import { TeamPlayer } from "./types";
import TeamPlayerCard from "./TeamPlayerCard";

interface TeamCardProps {
  teamNumber: number;
  teamName: string;
  teamPlayers: TeamPlayer[];
  teamScore: number;
  accentColor: string;
  accentColorVar: string;
  isManualMode: boolean;
  team: 'team1' | 'team2';
  draggedItem: {
    team: 'team1' | 'team2';
    index: number;
    player: TeamPlayer;
  } | null;
  dragOverTarget: {
    team: 'team1' | 'team2';
    index: number;
  } | null;
  onDragStart: (
    e: React.DragEvent,
    team: 'team1' | 'team2',
    index: number,
    player: TeamPlayer
  ) => void;
  onDragEnd: () => void;
  onDrop: (
    e: React.DragEvent,
    targetTeam: 'team1' | 'team2',
    targetIndex: number
  ) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnter: (
    e: React.DragEvent,
    targetTeam: 'team1' | 'team2',
    targetIndex: number
  ) => void;
  onDragLeave: (e: React.DragEvent) => void;
}

export default function TeamCard({
  teamNumber,
  teamName,
  teamPlayers,
  teamScore,
  accentColor,
  accentColorVar,
  isManualMode,
  team,
  draggedItem,
  dragOverTarget,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragOver,
  onDragEnter,
  onDragLeave,
}: TeamCardProps) {
  return (
    <div className="card">
      <div className="mb-4">
        <h3 className={`text-xl font-bold ${accentColor} mb-1`}>
          {teamName}
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          총 점수: <span className="font-semibold">{teamScore}</span>
        </p>
      </div>
      <div className="space-y-2">
        {teamPlayers.map((player, index) => {
          const isDragOver =
            dragOverTarget?.team === team && dragOverTarget?.index === index;
          const isDragging =
            draggedItem?.team === team && draggedItem?.index === index;
          return (
            <TeamPlayerCard
              key={player.userId}
              player={player}
              index={index}
              team={team}
              isManualMode={isManualMode}
              isDragging={isDragging}
              isDragOver={isDragOver}
              accentColor={accentColorVar}
              onDragStart={(e) => onDragStart(e, team, index, player)}
              onDragEnd={onDragEnd}
              onDrop={(e) => onDrop(e, team, index)}
              onDragOver={onDragOver}
              onDragEnter={(e) => onDragEnter(e, team, index)}
              onDragLeave={onDragLeave}
            />
          );
        })}
      </div>
    </div>
  );
}
