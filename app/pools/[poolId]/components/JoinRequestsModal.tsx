"use client";

import { useEffect, useState } from "react";

interface JoinRequest {
  invitationId: string;
  sender: {
    id: string;
    username: string;
    email: string;
    name: string | null;
    riotId: string | null;
    riotTag: string | null;
    mainLane: string | null;
    subLane: string | null;
    score: number;
  };
  createdAt: string;
}

interface JoinRequestsModalProps {
  poolId: string;
  onClose: () => void;
}

export default function JoinRequestsModal({
  poolId,
  onClose,
}: JoinRequestsModalProps) {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`/api/pools/${poolId}/requests`);
      if (res.ok) {
        const data = await res.json();
        setRequests(data.data);
      } else {
        setError("요청을 불러오는데 실패했습니다.");
      }
    } catch (err) {
      setError("요청을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (invitationId: string) => {
    try {
      const res = await fetch(`/api/invitations/${invitationId}/accept`, {
        method: "PUT",
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.filter((req) => req.invitationId !== invitationId)
        );
        setError("");
      } else {
        const data = await res.json();
        setError(data.error || "수락에 실패했습니다.");
      }
    } catch (err) {
      setError("수락 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async (invitationId: string) => {
    try {
      const res = await fetch(`/api/invitations/${invitationId}/reject`, {
        method: "PUT",
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.filter((req) => req.invitationId !== invitationId)
        );
        setError("");
      } else {
        const data = await res.json();
        setError(data.error || "거절에 실패했습니다.");
      }
    } catch (err) {
      setError("거절 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">가입 요청</h2>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
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

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--error)]/10 border border-[var(--error)]/30 text-[var(--error)] text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-purple)]"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-[var(--text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-[var(--text-secondary)]">
              대기 중인 가입 요청이 없습니다
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {requests.map((request) => (
              <div key={request.invitationId} className="card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-white font-semibold">
                      {request.sender.username[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                        {request.sender.username}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
                        {request.sender.riotId && (
                          <span>
                            {request.sender.riotId}
                            {request.sender.riotTag && (
                              <span className="text-[var(--accent-purple)]">
                                #{request.sender.riotTag}
                              </span>
                            )}
                          </span>
                        )}
                        {request.sender.mainLane && (
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
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
                            {request.sender.mainLane}
                            {request.sender.subLane &&
                              `, ${request.sender.subLane}`}
                          </span>
                        )}
                        <span className="flex items-center">
                          <span className="font-semibold gradient-text mr-1">
                            {request.sender.score}
                          </span>
                          점수
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleAccept(request.invitationId)}
                      className="px-4 py-2 rounded-lg bg-[var(--success)] hover:bg-[var(--success)]/80 text-white font-semibold transition-colors"
                    >
                      수락
                    </button>
                    <button
                      onClick={() => handleReject(request.invitationId)}
                      className="px-4 py-2 rounded-lg bg-[var(--error)] hover:bg-[var(--error)]/80 text-white font-semibold transition-colors"
                    >
                      거절
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
