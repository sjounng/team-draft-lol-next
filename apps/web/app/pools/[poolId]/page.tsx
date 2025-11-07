"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import PoolHeader from "./components/PoolHeader";
import PoolActions from "./components/PoolActions";
import PoolStats from "./components/PoolStats";
import MemberList from "./components/MemberList";
import InviteMemberModal from "./components/InviteMemberModal";
import JoinRequestsModal from "./components/JoinRequestsModal";

interface Member {
  id: string;
  username: string;
  email: string;
  name: string | null;
  riotId: string | null;
  riotTag: string | null;
  mainLane: string | null;
  subLane: string | null;
  score: number;
  winLossStreak: number;
}

interface Pool {
  poolId: string;
  name: string;
  tag: string;
  ownerId: string;
  createdAt: string;
  owner: {
    id: string;
    username: string;
    email: string;
    name: string | null;
  };
  members: Member[];
}

export default function PoolDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const poolId = params.poolId as string;

  const [pool, setPool] = useState<Pool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [pendingRequestCount, setPendingRequestCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && poolId) {
      fetchAllData();
    }
  }, [user, poolId]);

  const fetchAllData = async () => {
    try {
      // Fetch all data in parallel
      const [poolRes, requestsRes, matchCountRes] = await Promise.all([
        fetch(`/api/pools/${poolId}`),
        fetch(`/api/pools/${poolId}/requests`),
        fetch(`/api/pools/${poolId}/matches/count`)
      ]);

      // Handle pool data
      if (poolRes.ok) {
        const poolData = await poolRes.json();
        setPool(poolData.data);
      } else if (poolRes.status === 403) {
        setError("이 Pool에 접근할 권한이 없습니다.");
      } else if (poolRes.status === 404) {
        setError("Pool을 찾을 수 없습니다.");
      } else {
        setError("Pool을 불러오는 중 오류가 발생했습니다.");
      }

      // Handle pending requests
      if (requestsRes.ok) {
        const requestsData = await requestsRes.json();
        setPendingRequestCount(requestsData.data.length);
      }

      // Handle match count
      if (matchCountRes.ok) {
        const matchData = await matchCountRes.json();
        setMatchCount(matchData.data.count);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Pool을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLeavePool = async () => {
    if (!confirm("정말 이 Pool에서 나가시겠습니까?")) return;

    try {
      const res = await fetch(`/api/pools/${poolId}/members/${user?.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Pool 탈퇴에 실패했습니다.");
      }
    } catch (err) {
      alert("Pool 탈퇴 중 오류가 발생했습니다.");
    }
  };

  const handleCloseRequestsModal = () => {
    setShowRequestsModal(false);
    fetchAllData();
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-purple)]"></div>
      </div>
    );
  }

  if (error || !pool) {
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
            {error || "Pool을 불러올 수 없습니다"}
          </h2>
          <Link href="/dashboard" className="btn-primary mt-4 inline-block">
            대시보드로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = pool.ownerId === user?.id;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PoolHeader poolName={pool.name} poolTag={pool.tag} isOwner={isOwner} />

      <PoolActions
        poolId={poolId}
        isOwner={isOwner}
        onInviteClick={() => setShowInviteModal(true)}
        onLeavePool={handleLeavePool}
      />

      <PoolStats
        memberCount={pool.members.length}
        matchCount={matchCount}
        isOwner={isOwner}
        pendingRequestCount={pendingRequestCount}
        onRequestsClick={() => setShowRequestsModal(true)}
      />

      <MemberList
        members={pool.members}
        ownerId={pool.ownerId}
        isOwner={isOwner}
        onInviteClick={() => setShowInviteModal(true)}
      />

      {showInviteModal && (
        <InviteMemberModal
          poolId={poolId}
          onClose={() => setShowInviteModal(false)}
        />
      )}

      {showRequestsModal && (
        <JoinRequestsModal poolId={poolId} onClose={handleCloseRequestsModal} />
      )}
    </div>
  );
}
