import { SessionData, Champion } from "./types";

interface TeamBanPickPanelProps {
  teamNumber: 1 | 2;
  teamName: string;
  accentColor: string;
  session: SessionData;
  isMyTeam: boolean;
  previewChampion?: Champion | null;
}

export default function TeamBanPickPanel({
  teamNumber,
  teamName,
  accentColor,
  session,
  isMyTeam,
  previewChampion,
}: TeamBanPickPanelProps) {
  const teamBans = session.bans.filter((b) => b.teamNumber === teamNumber);

  // Fixed position order
  const POSITIONS = ["TOP", "JGL", "MID", "ADC", "SUP"];

  // Determine which position is currently being picked
  const isMyTurnToPick =
    session.currentTurn === teamNumber && session.currentPhase === "PICK";
  const teamPickCount = session.picks.filter(
    (p) => p.teamNumber === teamNumber
  ).length;
  const nextPickPosition = isMyTurnToPick ? POSITIONS[teamPickCount] : null;

  // Check if it's this team's turn (for ban or pick)
  const isMyTurn = session.currentTurn === teamNumber;

  return (
    <div className="h-full flex flex-col">
      {/* Header with Team Name */}
      <div className={`mb-4 ${isMyTurn ? "animate-pulse" : ""}`}>
        <div className="flex items-center gap-2 mb-1">
          <h2 className={`text-2xl font-bold ${accentColor}`}>{teamName}</h2>
          {isMyTeam && (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold border border-green-500/30">
              내 팀
            </span>
          )}
        </div>
        {isMyTurn && (
          <div className="text-sm text-yellow-400 font-semibold mt-1">
            ● {session.currentPhase === "BAN" ? "밴 중..." : "픽 중..."}
          </div>
        )}
      </div>

      {/* Bans row - Separate section above picks */}
      <div className="flex gap-3 mb-3 justify-center flex-shrink-0">
        {Array.from({ length: 5 }).map((_, i) => {
          const ban = teamBans[i];
          return (
            <div
              key={i}
              className="relative w-16 h-16 rounded-md border-2 border-[var(--border)]/50 overflow-hidden bg-black/70"
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

      {/* Picks - Large champion portraits like LoL client */}
      <div className="flex-1 flex flex-col gap-2 min-h-0">
        {POSITIONS.map((position, index) => {
          const pick = session.picks.find(
            (p) => p.teamNumber === teamNumber && p.position === position
          );
          const isNextPick = position === nextPickPosition;

          return (
            <div
              key={position}
              className="relative flex-1 flex flex-col min-h-0"
            >
              {/* Player Pick Card */}
              <div
                className={`relative flex-1 overflow-hidden bg-gradient-to-b from-[var(--bg)] to-black/60 min-h-0 rounded ${
                  isNextPick
                    ? "ring-[5px] ring-white animate-pulse shadow-[0_0_25px_rgba(255,255,255,0.9)]"
                    : ""
                }`}
              >
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

                    {/* Position and Champion Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className={`text-xs ${accentColor} font-bold mb-1`}>
                        {position}
                      </div>
                      <div className="text-white font-bold text-lg leading-tight">
                        {pick.championName}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Empty slot with optional preview */}
                    {isNextPick &&
                    previewChampion &&
                    session.currentPhase === "PICK" ? (
                      <>
                        {/* Preview Champion */}
                        <div className="absolute inset-0 overflow-hidden opacity-60">
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${previewChampion.id}_0.jpg`}
                            alt={previewChampion.name}
                            className="w-full h-full object-cover object-[center_20%]"
                            onError={(e) => {
                              e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/15.1.1/img/champion/${previewChampion.id}.png`;
                            }}
                          />
                        </div>
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        {/* Preview Label and Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div
                            className={`text-xs ${accentColor} font-bold mb-1`}
                          >
                            {position}
                          </div>
                          <div className="text-white/80 font-bold text-lg leading-tight">
                            {previewChampion.name}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--surface)]/50">
                        <div className={`text-4xl ${accentColor} font-bold`}>
                          {position}
                        </div>
                      </div>
                    )}
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
