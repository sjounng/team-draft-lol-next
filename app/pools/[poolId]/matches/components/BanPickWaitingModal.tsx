"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface BanPickWaitingModalProps {
  poolId: string;
  matchId: string;
  onClose: () => void;
}

interface SessionData {
  sessionId: string;
  gameId: string;
  team1ParticipantId: string | null;
  team2ParticipantId: string | null;
  status: string;
  userTeam: number;
  team1Data?: {
    players: Array<{
      userId: string;
      username: string;
      name: string | null;
    }>;
  };
  team2Data?: {
    players: Array<{
      userId: string;
      username: string;
      name: string | null;
    }>;
  };
}

export default function BanPickWaitingModal({
  poolId,
  matchId,
  onClose,
}: BanPickWaitingModalProps) {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const sessionStatusRef = useRef<string | null>(null);

  // Update ref whenever session status changes
  useEffect(() => {
    if (session) {
      sessionStatusRef.current = session.status;
    }
  }, [session?.status]);

  useEffect(() => {
    joinSession();

    // Cleanup: only leave session if still in WAITING_PARTICIPANTS state
    // Don't leave if we're navigating to ban-pick page (IN_PROGRESS)
    return () => {
      if (sessionStatusRef.current === "WAITING_PARTICIPANTS") {
        console.log("[BanPickWaitingModal] Cleanup: leaving WAITING session");
        leaveSession();
      } else {
        console.log(
          `[BanPickWaitingModal] Cleanup: NOT leaving session (status: ${sessionStatusRef.current})`
        );
      }
    };
  }, []);

  useEffect(() => {
    if (!session) return;

    // Poll for session updates every 2 seconds
    const interval = setInterval(() => {
      fetchSession();
    }, 2000);

    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    // If both teams have participants, navigate to ban-pick page
    if (session?.status === "IN_PROGRESS") {
      router.push(`/pools/${poolId}/matches/${matchId}/banpick`);
    }
  }, [session?.status]);

  const joinSession = async () => {
    if (isJoining) return; // Prevent duplicate requests

    try {
      setIsJoining(true);
      setLoading(true);
      const res = await fetch(
        `/api/pools/${poolId}/matches/${matchId}/banpick/session`,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        const data = await res.json();
        setSession(data.data);
        // Fetch full session data
        fetchSession();
      } else {
        const data = await res.json();
        setError(data.error || "세션 참여에 실패했습니다.");
      }
    } catch (err) {
      setError("세션 참여 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      setIsJoining(false);
    }
  };

  const fetchSession = async () => {
    try {
      const res = await fetch(
        `/api/pools/${poolId}/matches/${matchId}/banpick/session`
      );

      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setSession(data.data);
        }
      }
    } catch (err) {
      console.error("Error fetching session:", err);
    }
  };

  const leaveSession = async () => {
    try {
      await fetch(
        `/api/pools/${poolId}/matches/${matchId}/banpick/session`,
        {
          method: "DELETE",
        }
      );
    } catch (err) {
      console.error("Error leaving session:", err);
    }
  };

  const getParticipantName = (participantId: string | null, teamNumber: number) => {
    if (!participantId || !session) return null;

    const teamData = teamNumber === 1 ? session.team1Data : session.team2Data;
    if (!teamData) return "참여자";

    const participant = teamData.players.find((p) => p.userId === participantId);
    return participant?.name || participant?.username || "참여자";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)] max-w-2xl w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            밴픽 참여 대기
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
            <p className="text-[var(--text-muted)]">참여 중...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-[var(--error)] mx-auto mb-4"
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
            <p className="text-[var(--error)] mb-4">{error}</p>
            <button onClick={onClose} className="btn-secondary">
              닫기
            </button>
          </div>
        )}

        {/* Session Info */}
        {session && !loading && !error && (
          <div className="space-y-6">
            {/* Info Text */}
            <div className="bg-[var(--bg)] p-4 rounded-lg border border-[var(--border-color)]">
              <p className="text-sm text-[var(--text-muted)] text-center">
                양 팀에서 각 1명씩 참여해야 밴픽이 시작됩니다.
              </p>
            </div>

            {/* Teams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team 1 */}
              <div className="bg-[var(--bg)] p-6 rounded-lg border border-[var(--border-color)]">
                <h3 className="text-lg font-bold text-[var(--accent-purple)] mb-4 text-center">
                  Team 1
                </h3>
                <div className="flex flex-col items-center">
                  {session.team1ParticipantId ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-white font-bold text-2xl mb-3">
                        {getParticipantName(session.team1ParticipantId, 1)?.[0]?.toUpperCase()}
                      </div>
                      <p className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        {getParticipantName(session.team1ParticipantId, 1)}
                      </p>
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-semibold">
                        참여 완료
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-[var(--surface-hover)] flex items-center justify-center mb-3">
                        <svg
                          className="w-10 h-10 text-[var(--text-muted)] animate-pulse"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-[var(--text-muted)] mb-2">
                        참여 대기 중...
                      </p>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-semibold">
                        대기 중
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Team 2 */}
              <div className="bg-[var(--bg)] p-6 rounded-lg border border-[var(--border-color)]">
                <h3 className="text-lg font-bold text-[var(--accent-blue)] mb-4 text-center">
                  Team 2
                </h3>
                <div className="flex flex-col items-center">
                  {session.team2ParticipantId ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold text-2xl mb-3">
                        {getParticipantName(session.team2ParticipantId, 2)?.[0]?.toUpperCase()}
                      </div>
                      <p className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        {getParticipantName(session.team2ParticipantId, 2)}
                      </p>
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-semibold">
                        참여 완료
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-[var(--surface-hover)] flex items-center justify-center mb-3">
                        <svg
                          className="w-10 h-10 text-[var(--text-muted)] animate-pulse"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-[var(--text-muted)] mb-2">
                        참여 대기 중...
                      </p>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-semibold">
                        대기 중
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Status */}
            {session.team1ParticipantId && session.team2ParticipantId && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)] mx-auto mb-2"></div>
                <p className="text-[var(--primary)] font-semibold">
                  밴픽 화면으로 이동 중...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
