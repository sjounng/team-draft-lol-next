"use client";

import { useAuth } from "../../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Member, Pool, TeamGenerationResult } from "@/app/components/teams/create/types";
import MemberSelectPanel from "@/app/components/teams/create/MemberSelectPanel";
import SelectedMembersPanel from "@/app/components/teams/create/SelectedMembersPanel";
import TeamResultView from "@/app/components/teams/create/TeamResultView";

export default function CreateTeamPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const poolId = params.poolId as string;

  const [pool, setPool] = useState<Pool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [step, setStep] = useState<"select" | "result">("select");
  const [generatedTeams, setGeneratedTeams] =
    useState<TeamGenerationResult | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && poolId) {
      fetchPool();
    }
  }, [user, poolId]);

  const fetchPool = async () => {
    try {
      const res = await fetch(`/api/pools/${poolId}`);
      if (res.ok) {
        const data = await res.json();
        setPool(data.data);
      } else {
        setError("Pool을 불러오는 중 오류가 발생했습니다.");
      }
    } catch (err) {
      setError("Pool을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMember = (member: Member) => {
    if (selectedMembers.length < 10) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleDeselectMember = (member: Member) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id));
  };

  const availableMembers =
    pool?.members.filter(
      (m) => !selectedMembers.find((sm) => sm.id === m.id)
    ) || [];

  const filteredAvailableMembers = availableMembers.filter((member) => {
    const query = searchQuery.toLowerCase();
    return (
      member.username.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.riotId?.toLowerCase().includes(query) ||
      member.name?.toLowerCase().includes(query)
    );
  });

  const handleGenerateTeams = async () => {
    if (selectedMembers.length !== 10) return;

    setGenerating(true);
    setError("");

    try {
      const userIds = selectedMembers.map((m) => m.id);
      const res = await fetch("/api/teams/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedTeams(data.data);
        setStep("result");
      } else {
        const data = await res.json();
        setError(data.error || "팀 생성에 실패했습니다.");
      }
    } catch (err) {
      setError("팀 생성 중 오류가 발생했습니다.");
    } finally {
      setGenerating(false);
    }
  };

  const handleBackToSelection = () => {
    setStep("select");
    setGeneratedTeams(null);
  };

  const handleReroll = async () => {
    if (!generatedTeams || selectedMembers.length !== 10) return;

    setGenerating(true);
    setError("");

    try {
      const userIds = selectedMembers.map((m) => m.id);
      const nextIndex =
        (generatedTeams.currentCombination || 1) %
        (generatedTeams.totalCombinations || 10);

      const res = await fetch("/api/teams/reroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds,
          combinationIndex: nextIndex,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedTeams(data.data);
      } else {
        const data = await res.json();
        setError(data.error || "팀 재생성에 실패했습니다.");
      }
    } catch (err) {
      setError("팀 재생성 중 오류가 발생했습니다.");
    } finally {
      setGenerating(false);
    }
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
          <Link
            href={`/pools/${poolId}`}
            className="btn-primary mt-4 inline-block"
          >
            Pool로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header - Only show on select step */}
      {step === "select" && (
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-3 gradient-text">팀 생성</h1>
            <p className="text-[var(--text-secondary)]">
              {pool.name} · 10명을 선택하세요
            </p>
          </div>
          <Link href={`/pools/${poolId}`} className="btn-secondary">
            ← Pool로 돌아가기
          </Link>
        </div>
      )}

      {/* Selection Status - Only show on select step */}
      {step === "select" && (
        <>
          <div className="card mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-1">
                  선택된 인원
                </p>
                <p className="text-3xl font-bold gradient-text">
                  {selectedMembers.length} / 10
                </p>
              </div>
              {selectedMembers.length === 10 && (
                <div className="text-sm text-[var(--success)]">
                  ✓ 10명이 선택되었습니다!
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Panel - Available Members */}
            <MemberSelectPanel
              members={filteredAvailableMembers}
              onSelectMember={handleSelectMember}
              selectedCount={selectedMembers.length}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Right Panel - Selected Members */}
            <SelectedMembersPanel
              members={selectedMembers}
              onDeselectMember={handleDeselectMember}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Link href={`/pools/${poolId}`} className="btn-secondary">
              취소
            </Link>
            <button
              onClick={handleGenerateTeams}
              disabled={selectedMembers.length !== 10 || generating}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                  팀 생성 중...
                </>
              ) : (
                "팀 생성하기"
              )}
            </button>
          </div>
        </>
      )}

      {/* Team Result View */}
      {step === "result" && generatedTeams && (
        <TeamResultView
          teams={generatedTeams}
          onBackToSelection={handleBackToSelection}
          onReroll={handleReroll}
          generating={generating}
          poolId={poolId}
          selectedMembers={selectedMembers}
        />
      )}
    </div>
  );
}
