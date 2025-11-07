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

  return (
    <div className="card">
      <h2 className={`text-xl font-bold ${accentColor} mb-4`}>
        {teamName}
      </h2>

      {/* Bans - Horizontal layout with champion images */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-2">
          밴 ({session.bans.filter((b) => b.teamNumber === teamNumber).length}/5)
        </h3>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => {
            const ban = session.bans.filter((b) => b.teamNumber === teamNumber)[i];
            return (
              <div
                key={i}
                className="relative w-12 h-12 rounded border-2 border-[var(--border-color)] overflow-hidden bg-[var(--bg)] flex-shrink-0"
                title={ban?.championName || "밴 대기 중"}
              >
                {ban ? (
                  <>
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${ban.championId}.png`}
                      alt={ban.championName}
                      className="w-full h-full object-cover opacity-50"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Red X overlay to indicate ban */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] text-xs">
                    -
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Picks - Vertical layout with position and champion */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-3">
          픽 ({session.picks.filter((p) => p.teamNumber === teamNumber).length}/5)
        </h3>
        <div className="space-y-2">
          {teamData.players.map((player) => {
            const pick = session.picks.find(
              (p) => p.userId === player.userId
            );
            return (
              <div
                key={player.userId}
                className="p-3 rounded bg-[var(--bg)] border border-[var(--border-color)]"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs ${accentColor} font-semibold min-w-[2.5rem]`}>
                    {player.assignedPosition}
                  </span>
                  {pick ? (
                    <>
                      <div className="w-10 h-10 rounded overflow-hidden border border-[var(--border-color)] flex-shrink-0">
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${pick.championId}.png`}
                          alt={pick.championName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="text-[var(--text-primary)] font-semibold flex-1">
                        {pick.championName}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded bg-[var(--surface)] border border-[var(--border-color)] flex-shrink-0 flex items-center justify-center">
                        <span className="text-[var(--text-muted)] text-xs">-</span>
                      </div>
                      <span className="text-[var(--text-muted)] flex-1">픽 대기 중</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
