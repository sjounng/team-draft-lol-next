"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Member, TeamPlayer, TeamGenerationResult } from "./types";
import TeamCard from "./TeamCard";

interface TeamResultViewProps {
  teams: TeamGenerationResult;
  onBackToSelection: () => void;
  onReroll: () => void;
  generating: boolean;
  poolId: string;
  selectedMembers: Member[];
}

const POSITIONS = ['TOP', 'JGL', 'MID', 'ADC', 'SUP'];

export default function TeamResultView({
  teams,
  onBackToSelection,
  onReroll,
  generating,
  poolId,
  selectedMembers,
}: TeamResultViewProps) {
  const router = useRouter();
  const [isManualMode, setIsManualMode] = useState(false);
  const [editableTeam1, setEditableTeam1] = useState<TeamPlayer[]>([]);
  const [editableTeam2, setEditableTeam2] = useState<TeamPlayer[]>([]);
  const [draggedItem, setDraggedItem] = useState<{
    team: 'team1' | 'team2';
    index: number;
    player: TeamPlayer;
  } | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<{
    team: 'team1' | 'team2';
    index: number;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  // Initialize editable teams when entering manual mode
  useEffect(() => {
    if (isManualMode && teams) {
      setEditableTeam1([...teams.team1.players]);
      setEditableTeam2([...teams.team2.players]);
    }
  }, [isManualMode, teams]);

  // Convert Member to TeamPlayer with position recalculation
  const memberToTeamPlayer = (member: Member, position: string): TeamPlayer => {
    let positionType: 'MAIN' | 'SUB' | 'FILL' = 'FILL';
    let scoreRatio = 0.90;

    if (member.mainLane === position) {
      positionType = 'MAIN';
      scoreRatio = 1.0;
    } else if (member.subLane === position) {
      positionType = 'SUB';
      scoreRatio = member.mainLane === 'SUP' ? 0.90 : 0.95;
    } else {
      scoreRatio = member.mainLane === 'SUP' ? 0.80 : 0.90;
    }

    return {
      userId: member.id,
      username: member.username,
      name: member.name,
      riotId: member.riotId,
      riotTag: member.riotTag,
      originalScore: member.score,
      adjustedScore: Math.round(member.score * scoreRatio),
      assignedPosition: position,
      mainLane: member.mainLane,
      subLane: member.subLane,
      positionType,
    };
  };

  const handleDragStart = (
    e: React.DragEvent,
    team: 'team1' | 'team2',
    index: number,
    player: TeamPlayer
  ) => {
    if (!isManualMode) return;
    setDraggedItem({ team, index, player });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverTarget(null);
  };

  const handleDrop = (
    e: React.DragEvent,
    targetTeam: 'team1' | 'team2',
    targetIndex: number
  ) => {
    e.preventDefault();
    if (!draggedItem || !isManualMode) return;

    const sourceTeam = draggedItem.team === 'team1' ? editableTeam1 : editableTeam2;
    const targetTeamArray = targetTeam === 'team1' ? editableTeam1 : editableTeam2;
    const setSourceTeam = draggedItem.team === 'team1' ? setEditableTeam1 : setEditableTeam2;
    const setTargetTeam = targetTeam === 'team1' ? setEditableTeam1 : setEditableTeam2;

    if (draggedItem.team === targetTeam) {
      // Swapping within same team
      const newTeam = [...sourceTeam];
      const draggedPlayer = newTeam[draggedItem.index];
      const targetPlayer = newTeam[targetIndex];

      // Recalculate with new positions
      const member1 = selectedMembers.find(m => m.id === draggedPlayer.userId);
      const member2 = selectedMembers.find(m => m.id === targetPlayer.userId);

      if (member1 && member2) {
        newTeam[targetIndex] = memberToTeamPlayer(member1, POSITIONS[targetIndex]);
        newTeam[draggedItem.index] = memberToTeamPlayer(member2, POSITIONS[draggedItem.index]);
      }

      setSourceTeam(newTeam);
    } else {
      // Swapping between teams
      const newSourceTeam = [...sourceTeam];
      const newTargetTeam = [...targetTeamArray];

      const draggedPlayer = newSourceTeam[draggedItem.index];
      const targetPlayer = newTargetTeam[targetIndex];

      const member1 = selectedMembers.find(m => m.id === draggedPlayer.userId);
      const member2 = selectedMembers.find(m => m.id === targetPlayer.userId);

      if (member1 && member2) {
        newTargetTeam[targetIndex] = memberToTeamPlayer(member1, POSITIONS[targetIndex]);
        newSourceTeam[draggedItem.index] = memberToTeamPlayer(member2, POSITIONS[draggedItem.index]);
      }

      setSourceTeam(newSourceTeam);
      setTargetTeam(newTargetTeam);
    }

    setDraggedItem(null);
    setDragOverTarget(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isManualMode) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (
    e: React.DragEvent,
    targetTeam: 'team1' | 'team2',
    targetIndex: number
  ) => {
    if (!isManualMode || !draggedItem) return;
    e.preventDefault();
    setDragOverTarget({ team: targetTeam, index: targetIndex });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!isManualMode) return;
    e.preventDefault();
    // Only clear if we're actually leaving the element (not entering a child)
    if (e.currentTarget === e.target) {
      setDragOverTarget(null);
    }
  };

  const calculateTeamScore = (players: TeamPlayer[]) => {
    return players.reduce((sum, player) => sum + player.adjustedScore, 0);
  };

  const handleSaveMatch = async () => {
    setSaving(true);
    try {
      // Use edited teams if in manual mode, otherwise use original teams
      const team1ToSave = isManualMode
        ? { players: editableTeam1, totalScore: calculateTeamScore(editableTeam1) }
        : teams.team1;
      const team2ToSave = isManualMode
        ? { players: editableTeam2, totalScore: calculateTeamScore(editableTeam2) }
        : teams.team2;

      const res = await fetch(`/api/pools/${poolId}/matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team1: team1ToSave,
          team2: team2ToSave,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Navigate to matches list page
        router.push(`/pools/${poolId}/matches`);
      } else {
        const errorData = await res.json();
        alert(errorData.error || '전적 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving match:', error);
      alert('전적 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // Use editable teams in manual mode, otherwise use original teams
  const displayTeam1 = isManualMode ? editableTeam1 : teams.team1.players;
  const displayTeam2 = isManualMode ? editableTeam2 : teams.team2.players;
  const team1Score = calculateTeamScore(displayTeam1);
  const team2Score = calculateTeamScore(displayTeam2);
  const scoreDifference = Math.abs(team1Score - team2Score);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              팀 생성 완료! {isManualMode && <span className="text-[var(--accent-purple)]">(수동 편집 모드)</span>}
            </h2>
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
              <span>
                점수 차이:{" "}
                <span className="font-semibold">{scoreDifference}점</span>
              </span>
              <span>
                주 라인:{" "}
                <span className="font-semibold text-[#16a34a]">
                  {(() => {
                    const mainCount = displayTeam1.filter(p => p.positionType === 'MAIN').length +
                                     displayTeam2.filter(p => p.positionType === 'MAIN').length;
                    return `${mainCount}/10명`;
                  })()}
                </span>
              </span>
              <span>
                부 라인:{" "}
                <span className="font-semibold text-[#ca8a04]">
                  {(() => {
                    const subCount = displayTeam1.filter(p => p.positionType === 'SUB').length +
                                    displayTeam2.filter(p => p.positionType === 'SUB').length;
                    return `${subCount}/10명`;
                  })()}
                </span>
              </span>
              <span>
                조합:{" "}
                <span className="font-semibold">
                  {teams.currentCombination}/{teams.totalCombinations}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamCard
          teamNumber={1}
          teamName="팀 1"
          teamPlayers={displayTeam1}
          teamScore={team1Score}
          accentColor="text-[var(--accent-purple)]"
          accentColorVar="var(--accent-purple)"
          isManualMode={isManualMode}
          team="team1"
          draggedItem={draggedItem}
          dragOverTarget={dragOverTarget}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
        <TeamCard
          teamNumber={2}
          teamName="팀 2"
          teamPlayers={displayTeam2}
          teamScore={team2Score}
          accentColor="text-[var(--accent-blue)]"
          accentColorVar="var(--accent-blue)"
          isManualMode={isManualMode}
          team="team2"
          draggedItem={draggedItem}
          dragOverTarget={dragOverTarget}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToSelection}
          className="btn-secondary"
          disabled={generating || isManualMode}
        >
          ← 다시 선택하기
        </button>
        <div className="flex gap-3">
          {!isManualMode ? (
            <>
              <button
                onClick={onReroll}
                disabled={
                  generating ||
                  !teams.totalCombinations ||
                  teams.totalCombinations <= 1
                }
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2 inline-block"></div>
                    생성 중...
                  </>
                ) : (
                  "다른 조합 보기"
                )}
              </button>
              <button
                onClick={() => setIsManualMode(true)}
                className="btn-secondary"
              >
                수동 편집
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsManualMode(false)}
              className="btn-secondary"
            >
              편집 완료
            </button>
          )}
          <button
            onClick={handleSaveMatch}
            disabled={saving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                저장 중...
              </>
            ) : (
              "완료"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
