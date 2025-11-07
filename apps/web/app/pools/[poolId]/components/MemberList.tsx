import {
  getTierColorClass,
  getTierBackgroundClass,
} from "@/app/lib/tier-utils";

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

interface MemberListProps {
  members: Member[];
  ownerId: string;
  isOwner: boolean;
  onInviteClick: () => void;
}

export default function MemberList({
  members,
  ownerId,
  isOwner,
  onInviteClick,
}: MemberListProps) {
  const sortedMembers = [...members].sort((a, b) => b.score - a.score);

  if (members.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
          멤버 목록
        </h2>
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <p className="text-[var(--text-secondary)]">아직 멤버가 없습니다</p>
          {isOwner && (
            <button onClick={onInviteClick} className="btn-primary mt-4">
              멤버 초대하기
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        멤버 목록
      </h2>

      <div className="space-y-3">
        {sortedMembers.map((member, index) => (
          <div
            key={member.id}
            className={`flex items-center justify-between p-4 rounded-lg transition-colors ${getTierBackgroundClass(
              member.score
            )}`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span
                  className={`text-lg font-bold w-6 ${
                    index === 0
                      ? "rank-1"
                      : index === 1
                      ? "rank-2"
                      : index === 2
                      ? "rank-3"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  #{index + 1}
                </span>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-white font-semibold">
                  {member.username[0]?.toUpperCase()}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[var(--text-primary)]">
                    {member.username}
                  </span>
                  {member.id === ownerId && (
                    <span className="badge px-2 py-0.5 text-xs rounded bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-white">
                      Owner
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-[var(--text-secondary)] max-w-xl">
                  <div className="min-w-0">
                    {member.riotId ? (
                      <span className="block">
                        라이엇 ID: {member.riotId}
                        {member.riotTag && (
                          <span className="text-[var(--accent-purple)]">
                            #{member.riotTag}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-[var(--text-muted)]">-</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    {member.mainLane ? (
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1 flex-shrink-0"
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
                        {member.mainLane}
                        {member.subLane && ` / ${member.subLane}`}
                      </span>
                    ) : (
                      <span className="text-[var(--text-muted)]">-</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className={`text-2xl ${getTierColorClass(member.score)}`}>
                  {member.score}
                </div>
                <div className="text-xs text-[var(--text-muted)]">점수</div>
              </div>
              <div className="text-right">
                <div
                  className={`text-2xl font-bold ${
                    member.winLossStreak > 0
                      ? "text-[var(--success)]"
                      : member.winLossStreak < 0
                      ? "text-[var(--error)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {member.winLossStreak > 0 ? "+" : ""}
                  {member.winLossStreak}
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  연승/연패
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
