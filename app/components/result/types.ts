export interface Player {
  userId: string;
  username: string;
  name: string;
  assignedPosition: string;
  championName?: string;
}

export interface PlayerStats {
  userId: string;
  kills: number | null;
  deaths: number | null;
  assists: number | null;
  cs: number | null;
}

export interface Match {
  gameId: string;
  status: string;
  team1Data: {
    players: Player[];
  };
  team2Data: {
    players: Player[];
  };
  userRecords: any[];
}
