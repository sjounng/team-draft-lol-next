export type MatchStatus = "DRAFT_PENDING" | "DRAFT_COMPLETE" | "RESULT_PENDING" | "COMPLETED" | "ALL";

export interface Player {
  userId: string;
  username: string;
  name: string;
  score: number;
  assignedPosition: string;
  championId?: string;
  championName?: string;
}

export interface TeamData {
  players: Player[];
  totalScore: number;
}

export interface Match {
  gameId: string;
  creatorId: string;
  status: string;
  team1Data: TeamData;
  team2Data: TeamData;
  banPickData: any;
  team1Won: boolean | null;
  team1Kills: number;
  team2Kills: number;
  team1Gold: number;
  team2Gold: number;
  isApplied: boolean;
  createdAt: string;
  updatedAt: string;
  userRecords: any[];
}

export interface Pool {
  poolId: string;
  ownerId: string;
  name: string;
  tag: string;
}
