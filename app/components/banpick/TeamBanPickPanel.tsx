import { SessionData } from "./types";

interface TeamBanPickPanelProps {
  teamNumber: 1 | 2;
  teamName: string;
  accentColor: string;
  session: SessionData;
}

export default function TeamBanPickPanel({
  teamNumber,
  teamName,
  accentColor,
  session,
}: TeamBanPickPanelProps) {
  const teamData = teamNumber === 1 ? session.team1Data : session.team2Data;
  const teamBans = session.bans.filter((b) => b.teamNumber === teamNumber);

  return (
    <div className="h-full flex flex-col">
      {/* Header with Team Name */}
      <div className="mb-4">
        <h2 className={`text-2xl font-bold ${accentColor}`}>
          {teamName}
        </h2>
      </div>

      {/* Picks - Large champion portraits like LoL client */}
      <div className="flex-1 flex flex-col gap-0 min-h-0">
        {teamData.players.map((player, index) => {
          const pick = session.picks.find(
            (p) => p.userId === player.userId
          );

          return (
            <div key={player.userId} className="relative flex-1 flex flex-col min-h-0">
              {/* Bans row - Show above first pick only */}
              {index === 0 && (
                <div className="flex gap-1 mb-1 justify-center flex-shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const ban = teamBans[i];
                    return (
                      <div
                        key={i}
                        className="relative w-8 h-8 rounded border border-[var(--border)]/40 overflow-hidden bg-black/40"
                        title={ban?.championName || "밴"}
                      >
                        {ban ? (
                          <>
                            <img
                              src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${ban.championId}.png`}
                              alt={ban.championName}
                              className="w-full h-full object-cover opacity-40 grayscale"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                              >
                                <path d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Player Pick Card */}
              <div className="relative flex-1 overflow-hidden bg-gradient-to-b from-[var(--bg)] to-black/60 min-h-0">
                {pick ? (
                  <>
                    {/* Champion Splash */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${pick.championId}_0.jpg`}
                        alt={pick.championName}
                        className="w-full h-full object-cover object-[center_20%]"
                        onError={(e) => {
                          // Fallback to square image
                          e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${pick.championId}.png`;
                        }}
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                    {/* Player Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className={`text-xs ${accentColor} font-bold mb-1`}>
                        {player.assignedPosition}
                      </div>
                      <div className="text-white font-bold text-lg leading-tight mb-1">
                        {pick.championName}
                      </div>
                      <div className="text-gray-300 text-xs">
                        {player.username}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Empty slot */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--surface)]/50">
                      <div className={`text-4xl ${accentColor} font-bold mb-2`}>
                        {player.assignedPosition}
                      </div>
                      <div className="text-[var(--text-muted)] text-sm">
                        {player.username}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
