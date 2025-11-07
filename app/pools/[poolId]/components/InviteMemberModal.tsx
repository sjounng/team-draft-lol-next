"use client";

import { useState } from "react";

interface InviteMemberModalProps {
  poolId: string;
  onClose: () => void;
}

export default function InviteMemberModal({
  poolId,
  onClose,
}: InviteMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/users/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.data);
      } else {
        setError("검색에 실패했습니다.");
      }
    } catch (err) {
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (userId: string) => {
    try {
      const res = await fetch(`/api/pools/${poolId}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (res.ok) {
        setSuccessMessage(
          "초대를 보냈습니다! 상대방이 수락하면 Pool에 추가됩니다."
        );
        setSearchResults((prev) => prev.filter((u) => u.id !== userId));
        setError("");
      } else {
        const data = await res.json();
        setError(data.error || "초대에 실패했습니다.");
        setSuccessMessage("");
      }
    } catch (err) {
      setError("초대 중 오류가 발생했습니다.");
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">멤버 초대</h2>
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

        {successMessage && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/30 text-[var(--success)] text-sm">
            {successMessage}
          </div>
        )}

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="사용자명 또는 이메일로 검색..."
            className="input flex-1"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "검색"
            )}
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-muted)]">
              검색 결과가 없습니다
            </div>
          ) : (
            searchResults.map((user) => (
              <div
                key={user.id}
                className="card-hover flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-white font-semibold">
                    {user.username[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {user.username}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleInvite(user.id)}
                  className="btn-primary"
                >
                  초대
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
