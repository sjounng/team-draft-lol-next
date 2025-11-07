import { Member } from "./types";
import PlayerCard from "./PlayerCard";

interface MemberSelectPanelProps {
  members: Member[];
  onSelectMember: (member: Member) => void;
  selectedCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function MemberSelectPanel({
  members,
  onSelectMember,
  selectedCount,
  searchQuery,
  onSearchChange,
}: MemberSelectPanelProps) {
  return (
    <div className="card">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          멤버 선택
          <span className="text-sm text-[var(--text-muted)] ml-2">
            ({members.length}명)
          </span>
        </h2>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="이름, 이메일, 라이엇ID로 검색..."
          className="input w-full"
        />
      </div>

      {/* Available Members List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {members.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-muted)]">
            {searchQuery ? "검색 결과가 없습니다" : "모든 멤버가 선택되었습니다"}
          </div>
        ) : (
          members.map((member) => (
            <PlayerCard
              key={member.id}
              member={member}
              onAction={onSelectMember}
              actionIcon="add"
              actionDisabled={selectedCount >= 10}
            />
          ))
        )}
      </div>
    </div>
  );
}
