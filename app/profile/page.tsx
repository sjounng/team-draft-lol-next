"use client";

import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CustomSelect } from "../components/CustomSelect";

const LANES = ["TOP", "JGL", "MID", "ADC", "SUP"];

export default function ProfilePage() {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    riotAccount: "",
    mainLane: "",
    subLane: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      // Combine riotId and riotTag
      const riotAccount =
        user.riotId && user.riotTag
          ? `${user.riotId}#${user.riotTag}`
          : user.riotId || "";

      setFormData({
        name: user.name || "",
        riotAccount,
        mainLane: user.mainLane || "",
        subLane: user.subLane || "",
      });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.mainLane && formData.mainLane === formData.subLane) {
      setError("메인 포지션과 서브 포지션은 달라야 합니다.");
      return;
    }

    setSaving(true);

    try {
      // Split riot account by #
      let riotId: string | null = null;
      let riotTag: string | null = null;

      if (formData.riotAccount) {
        const parts = formData.riotAccount.split("#");
        riotId = parts[0]?.trim() || null;
        riotTag = parts[1]?.trim() || null;
      }

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || null,
          riotId,
          riotTag,
          mainLane: formData.mainLane || null,
          subLane: formData.subLane || null,
        }),
      });

      if (res.ok) {
        setSuccess("프로필이 업데이트되었습니다.");
        await refreshUser();
      } else {
        const data = await res.json();
        setError(data.error || "프로필 업데이트에 실패했습니다.");
      }
    } catch (err) {
      setError("프로필 업데이트 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-purple)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black mb-3 gradient-text">
            프로필 설정
          </h1>
          <p className="text-[var(--text-secondary)]">
            내 정보를 관리하고 업데이트하세요
          </p>
        </div>

        <Link href="/dashboard" className="btn-secondary">
          ← 대시보드
        </Link>
      </div>

      {/* Profile Card */}
      <div className="card mb-6">
        <div className="flex items-center space-x-6 mb-6 pb-6 border-b border-[var(--border)]">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-white font-bold text-4xl">
            {user.username[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
              {user.username}
            </h2>
            <p className="text-[var(--text-secondary)] mb-3">{user.email}</p>
            <div className="flex gap-6">
              <div>
                <span className="text-sm text-[var(--text-muted)]">점수</span>
                <div className="text-2xl font-bold gradient-text">
                  {user.score}
                </div>
              </div>
              <div className="h-12 w-px bg-[var(--border)]"></div>
              <div>
                <span className="text-sm text-[var(--text-muted)]">
                  연승/연패
                </span>
                <div
                  className={`text-2xl font-bold ${
                    user.winLossStreak > 0
                      ? "text-[var(--success)]"
                      : user.winLossStreak < 0
                      ? "text-[var(--error)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {user.winLossStreak > 0 ? "+" : ""}
                  {user.winLossStreak}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-lg bg-[var(--error)]/10 border border-[var(--error)]/30 text-[var(--error)] text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="px-4 py-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/30 text-[var(--success)] text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                기본 정보
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] via-transparent to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                >
                  사용자명
                </label>
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  disabled
                  className="input w-full opacity-50 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  사용자명은 변경할 수 없습니다
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                >
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="input w-full opacity-50 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  이메일은 변경할 수 없습니다
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                게임 정보
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] via-transparent to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                >
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="input w-full"
                  placeholder="홍길동"
                  disabled={saving}
                />
              </div>

              <div>
                <label
                  htmlFor="riotAccount"
                  className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                >
                  라이엇 계정
                </label>
                <input
                  id="riotAccount"
                  type="text"
                  value={formData.riotAccount}
                  onChange={(e) => handleChange("riotAccount", e.target.value)}
                  className="input w-full"
                  placeholder="HideOnBush#KR1"
                  disabled={saving}
                />
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  예시: HideOnBush#KR1
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSelect
                id="mainLane"
                label="메인 포지션"
                value={formData.mainLane}
                onChange={(value) => handleChange("mainLane", value)}
                options={[
                  { value: "", label: "선택하지 않음" },
                  ...LANES.map((lane) => ({ value: lane, label: lane })),
                ]}
                placeholder="선택하지 않음"
                disabled={saving}
              />

              <CustomSelect
                id="subLane"
                label="서브 포지션"
                value={formData.subLane}
                onChange={(value) => handleChange("subLane", value)}
                options={[
                  { value: "", label: "선택하지 않음" },
                  ...LANES.filter((lane) => lane !== formData.mainLane).map(
                    (lane) => ({ value: lane, label: lane })
                  ),
                ]}
                placeholder="선택하지 않음"
                disabled={saving}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 flex items-center justify-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  저장 중...
                </>
              ) : (
                "변경사항 저장"
              )}
            </button>
            <Link
              href="/dashboard"
              className="btn-secondary flex items-center justify-center px-8"
            >
              취소
            </Link>
          </div>
        </form>
      </div>

      {/* Info Card */}
      <div className="card">
        <div className="flex items-start space-x-3">
          <svg
            className="w-5 h-5 text-[var(--accent-blue)] mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-[var(--text-secondary)]">
            <p className="font-semibold text-[var(--text-primary)] mb-2">
              프로필 정보 안내
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>라이엇 계정과 포지션 정보는 팀 생성 시 참고됩니다</li>
              <li>점수는 게임 결과에 따라 자동으로 업데이트됩니다</li>
              <li>사용자명과 이메일은 보안을 위해 변경할 수 없습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
