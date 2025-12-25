"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchWithAuth } from "../../../../../contexts/AuthContext";
import { Champion, SessionData } from "@/app/components/banpick/types";
import TeamBanPickPanel from "@/app/components/banpick/TeamBanPickPanel";
import ChampionGrid from "@/app/components/banpick/ChampionGrid";

export default function BanPickPage() {
  const params = useParams();
  const router = useRouter();
  const poolId = params.poolId as string;
  const matchId = params.matchId as string;

  const [session, setSession] = useState<SessionData | null>(null);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [actionLoading, setActionLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [previewChampion, setPreviewChampion] = useState<Champion | null>(null);

  // Use refs to track session status
  const sessionStatusRef = useRef<string | null>(null);
  const isLeavingRef = useRef(false);
  const hadSessionRef = useRef(false); // Track if we ever had a session

  // Update ref whenever session changes
  useEffect(() => {
    if (session) {
      sessionStatusRef.current = session.status;
      hadSessionRef.current = true; // Mark that we had a session
    }
  }, [session]);

  useEffect(() => {
    fetchUser();
    fetchSession();
    fetchChampions();
  }, []);

  // Separate effect for handling page leave - NO cleanup function!
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (sessionStatusRef.current === 'IN_PROGRESS' && !isLeavingRef.current) {
        console.log('[BanPick] Page unloading, leaving session');
        isLeavingRef.current = true;
        // Use synchronous XHR for beforeunload (fetch won't work reliably)
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/api/pools/${poolId}/matches/${matchId}/banpick/session`, false);
        xhr.send();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup: ONLY remove event listener, do NOT call leaveSession
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [poolId, matchId]);

  // WebSocket connection for real-time updates
  useEffect(() => {
    if (!session || isCompleted) return;
    if (session.status !== "IN_PROGRESS") return;

    // Connect to WebSocket server
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || `ws://localhost:8080`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('[WebSocket] Connected to ban/pick server');
      // Join the match room
      ws.send(JSON.stringify({
        type: 'join',
        matchId: matchId
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('[WebSocket] Received message:', data.type);

        if (data.type === 'update' && data.session) {
          console.log('[WebSocket] Session update:', {
            step: data.session.currentStep,
            turn: data.session.currentTurn,
            phase: data.session.currentPhase,
            bans: data.session.bans.length,
            picks: data.session.picks.length
          });
          setSession(data.session);

          // Check if draft is completed
          if (data.session.status === "COMPLETED") {
            console.log('[WebSocket] Draft completed via WebSocket');
            setIsCompleted(true);
            setTimeout(() => {
              router.push(`/pools/${poolId}/matches`);
            }, 3000);
          }
        }
      } catch (error) {
        console.error('[WebSocket] Error parsing message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('[WebSocket] Error:', error);
    };

    ws.onclose = () => {
      console.log('[WebSocket] Disconnected from ban/pick server');
    };

    // Cleanup on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'leave', matchId }));
        ws.close();
      }
    };
  }, [session?.status, isCompleted, matchId, poolId, router]);

  // Handle redirect when completed
  useEffect(() => {
    if (session?.status === "COMPLETED" && !isCompleted) {
      setIsCompleted(true);
      setTimeout(() => {
        router.push(`/pools/${poolId}/matches`);
      }, 3000);
    }
  }, [session?.status, isCompleted, poolId, router]);

  const fetchUser = async () => {
    try {
      const res = await fetchWithAuth("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUserId(data.data.id);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchSession = async () => {
    // Don't fetch if already completed
    if (isCompleted) {
      console.log("[BanPick] Already completed, skipping fetch");
      return;
    }

    try {
      const res = await fetchWithAuth(
        `/api/pools/${poolId}/matches/${matchId}/banpick/session`
      );

      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          const sessionData = data.data;

          // Check session status
          if (sessionData.status === "WAITING_PARTICIPANTS") {
            console.log("[BanPick] Session is still waiting for participants");
            setSession(null);
            setError("밴픽이 아직 시작되지 않았습니다. 대기 모달에서 참여해주세요.");
          } else if (sessionData.status === "COMPLETED") {
            console.log("[BanPick] Session completed");
            setSession(sessionData);
          } else if (sessionData.status === "IN_PROGRESS") {
            setSession(sessionData);
          } else {
            console.log("[BanPick] Unknown session status:", sessionData.status);
            setSession(null);
            setError("알 수 없는 세션 상태입니다.");
          }
        } else {
          // No session found - it was deleted
          console.log("[BanPick] No session found - checking if completed or cancelled");
          setSession(null);

          // If we had a session before (polling), check GameRecord status
          if (hadSessionRef.current) {
            // Check if draft was completed
            try {
              const gameRes = await fetchWithAuth(`/api/pools/${poolId}/matches/${matchId}`);
              if (gameRes.ok) {
                const gameData = await gameRes.json();
                if (gameData.data?.status === "DRAFT_COMPLETE") {
                  console.log("[BanPick] Draft was completed");
                  setIsCompleted(true);
                  setTimeout(() => {
                    router.push(`/pools/${poolId}/matches`);
                  }, 3000);
                  return;
                }
              }
            } catch (err) {
              console.error("[BanPick] Error checking game status:", err);
            }

            // If not completed, then it was cancelled
            setError("밴픽이 종료되었습니다. 상대방이 나갔습니다.");
          } else {
            // Initial load and no session - check if it was completed
            try {
              const gameRes = await fetchWithAuth(`/api/pools/${poolId}/matches/${matchId}`);
              if (gameRes.ok) {
                const gameData = await gameRes.json();
                if (gameData.data?.status === "DRAFT_COMPLETE") {
                  console.log("[BanPick] Draft already completed, redirecting");
                  setIsCompleted(true);
                  setTimeout(() => {
                    router.push(`/pools/${poolId}/matches`);
                  }, 3000);
                  return;
                }
              }
            } catch (err) {
              console.error("[BanPick] Error checking game status:", err);
            }

            setError("밴픽 세션을 찾을 수 없습니다.");
          }
        }
      } else {
        setSession(null);
        setError("밴픽 세션을 불러오는데 실패했습니다.");
      }
    } catch (err) {
      console.error("[BanPick] Error fetching session:", err);
      setSession(null);
      setError("밴픽 세션을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchChampions = async () => {
    try {
      const res = await fetchWithAuth("/api/champions");
      if (res.ok) {
        const data = await res.json();
        setChampions(data.data.champions);
      }
    } catch (err) {
      console.error("Error fetching champions:", err);
    }
  };

  const leaveSession = async () => {
    if (isLeavingRef.current) return; // Prevent duplicate calls
    isLeavingRef.current = true;

    try {
      console.log("[BanPick] Leaving session");
      await fetchWithAuth(
        `/api/pools/${poolId}/matches/${matchId}/banpick/session`,
        {
          method: "DELETE",
        }
      );
    } catch (err) {
      console.error("Error leaving session:", err);
    }
  };

  const handleBackToMatches = async () => {
    // Only leave session if IN_PROGRESS
    if (sessionStatusRef.current === "IN_PROGRESS") {
      await leaveSession();
    }
    router.push(`/pools/${poolId}/matches`);
  };

  const handleChampionAction = async (champion: Champion) => {
    if (!isMyTurn() || actionLoading) return;

    setActionLoading(true);
    try {
      const res = await fetchWithAuth(
        `/api/pools/${poolId}/matches/${matchId}/banpick/action`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            championId: champion.id,
            championName: champion.name,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("[BanPick] Action successful, waiting for WebSocket update...");

        // Check if draft is completed
        if (data.data.completed) {
          console.log("[BanPick] Draft completed!");
          setIsCompleted(true);
          // Redirect after 3 seconds
          setTimeout(() => {
            router.push(`/pools/${poolId}/matches`);
          }, 3000);
        }
        // Note: Session update will come via WebSocket, no need to fetch manually
      } else {
        const data = await res.json();
        alert(data.error || "밴/픽에 실패했습니다.");
      }
    } catch (err) {
      console.error("Error performing action:", err);
      alert("밴/픽 중 오류가 발생했습니다.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelBanPick = async () => {
    if (!confirm("밴픽을 취소하시겠습니까? 취소하면 처음부터 다시 시작해야 합니다.")) {
      return;
    }

    await leaveSession();
    router.push(`/pools/${poolId}/matches`);
  };

  const isMyTurn = () => {
    if (!session || !userId) return false;

    if (session.currentTurn === 1) {
      return userId === session.team1ParticipantId;
    } else {
      return userId === session.team2ParticipantId;
    }
  };

  const getCurrentAction = () => {
    if (!session) return "";

    const step = session.currentStep;
    const teamName = session.currentTurn === 1 ? "Team 1" : "Team 2";

    // Steps 0-5: First ban phase
    if (step >= 0 && step < 6) {
      const banNumber = session.bans.filter((b) => b.teamNumber === session.currentTurn).length + 1;
      return `${teamName} 밴 ${banNumber}/3 (1차)`;
    }
    // Steps 6-11: First pick phase
    else if (step >= 6 && step < 12) {
      const pickNumber = session.picks.filter((p) => p.teamNumber === session.currentTurn).length + 1;
      return `${teamName} 픽 ${pickNumber}/3 (1차)`;
    }
    // Steps 12-15: Second ban phase
    else if (step >= 12 && step < 16) {
      const banNumber = session.bans.filter((b) => b.teamNumber === session.currentTurn).length + 1;
      return `${teamName} 밴 ${banNumber}/5 (2차)`;
    }
    // Steps 16-19: Second pick phase
    else if (step >= 16 && step < 20) {
      const pickNumber = session.picks.filter((p) => p.teamNumber === session.currentTurn).length + 1;
      return `${teamName} 픽 ${pickNumber}/5 (2차)`;
    }

    return `${teamName} ${session.currentPhase === "BAN" ? "밴" : "픽"}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-[var(--error)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            {error || "세션을 불러올 수 없습니다"}
          </h2>
          <button
            onClick={handleBackToMatches}
            className="btn-primary mt-4"
          >
            전적 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // Show completion screen
  if (isCompleted) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            밴픽이 완료되었습니다!
          </h2>
          <p className="text-[var(--text-muted)] mb-4">
            전적 목록으로 이동 중...
          </p>
        </div>
      </div>
    );
  }

  // Determine user's team
  const myTeam = userId === session.team1ParticipantId ? 1 : userId === session.team2ParticipantId ? 2 : null;

  return (
    <div className="h-screen flex flex-col max-w-[1920px] mx-auto px-6 py-4">
      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handleBackToMatches}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            ← 전적 목록으로 돌아가기
          </button>
          <button
            onClick={handleCancelBanPick}
            className="px-4 py-2 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded-lg font-semibold transition-colors"
          >
            밴픽 취소
          </button>
        </div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          밴픽 진행 중
        </h1>
      </div>

      {/* Ban-Pick Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr_1.5fr_2fr] gap-4 min-h-0">
        {/* Team 1 Bans & Picks */}
        <TeamBanPickPanel
          teamNumber={1}
          teamName="Team 1"
          accentColor="text-[var(--accent-blue)]"
          session={session}
          isMyTeam={myTeam === 1}
          previewChampion={session.currentTurn === 1 ? previewChampion : null}
        />

        {/* Center - Champion Select Area */}
        <ChampionGrid
          champions={champions}
          session={session}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onChampionSelect={handleChampionAction}
          onSelectionChange={setPreviewChampion}
          isMyTurn={isMyTurn()}
          actionLoading={actionLoading}
        />

        {/* Team 2 Bans & Picks */}
        <TeamBanPickPanel
          teamNumber={2}
          teamName="Team 2"
          accentColor="text-[var(--accent-pink)]"
          session={session}
          isMyTeam={myTeam === 2}
          previewChampion={session.currentTurn === 2 ? previewChampion : null}
        />
      </div>
    </div>
  );
}
