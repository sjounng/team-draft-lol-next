export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: string;
  tags: string[];
}

export interface SessionData {
  sessionId: string;
  gameId: string;
  team1ParticipantId: string;
  team2ParticipantId: string;
  status: string;
  currentTurn: number;
  currentPhase: string;
  currentStep: number;
  bans: Array<{
    teamNumber: number;
    championId: string;
    championName: string;
  }>;
  picks: Array<{
    teamNumber: number;
    userId: string;
    position: string;
    championId: string;
    championName: string;
  }>;
  team1Data: {
    players: Array<{
      userId: string;
      username: string;
      name: string | null;
      assignedPosition: string;
    }>;
  };
  team2Data: {
    players: Array<{
      userId: string;
      username: string;
      name: string | null;
      assignedPosition: string;
    }>;
  };
}
