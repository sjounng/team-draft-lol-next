export interface Member {
  id: string;
  username: string;
  email: string;
  name: string | null;
  riotId: string | null;
  riotTag: string | null;
  mainLane: string | null;
  subLane: string | null;
  score: number;
  winLossStreak: number;
}

export interface Pool {
  poolId: string;
  name: string;
  members: Member[];
}

export interface TeamPlayer {
  userId: string;
  username: string;
  name: string | null;
  riotId: string | null;
  riotTag: string | null;
  originalScore: number;
  adjustedScore: number;
  assignedPosition: string;
  mainLane: string | null;
  subLane: string | null;
  positionType: "MAIN" | "SUB" | "FILL";
}

export interface Team {
  teamNumber: number;
  players: TeamPlayer[];
  totalScore: number;
}

export interface TeamGenerationResult {
  team1: Team;
  team2: Team;
  scoreDifference: number;
  preferredPositionCount: number;
  preferredPositionLowScoreBonus: number;
  mainPositionCount?: number;
  subPositionCount?: number;
  currentCombination?: number;
  totalCombinations?: number;
}
