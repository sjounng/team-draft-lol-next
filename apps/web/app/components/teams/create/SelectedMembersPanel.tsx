import { Member } from "./types";
import PlayerCard from "./PlayerCard";

interface SelectedMembersPanelProps {
  members: Member[];
  onDeselectMember: (member: Member) => void;
}

export default function SelectedMembersPanel({
  members,
  onDeselectMember,
}: SelectedMembersPanelProps) {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
        선택된 멤버
        <span className="text-sm text-[var(--text-muted)] ml-2">
          ({members.length}/10)
        </span>
      </h2>

      {/* Selected Members List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {members.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            왼쪽에서 멤버를 선택하세요
          </div>
        ) : (
          members.map((member, index) => (
            <PlayerCard
              key={member.id}
              member={member}
              index={index}
              onAction={onDeselectMember}
              actionIcon="remove"
            />
          ))
        )}
      </div>
    </div>
  );
}
