import { getTierColorClass } from "@/app/lib/tier-utils";
import { Member } from "./types";

interface PlayerCardProps {
  member: Member;
  index?: number;
  onAction: (member: Member) => void;
  actionIcon: "add" | "remove";
  actionDisabled?: boolean;
}

export default function PlayerCard({
  member,
  index,
  onAction,
  actionIcon,
  actionDisabled = false,
}: PlayerCardProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface-hover)] hover:bg-[var(--surface)] transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        {index !== undefined && (
          <span className="text-sm font-bold text-[var(--text-muted)] w-6">
            {index + 1}
          </span>
        )}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-white font-semibold text-sm">
          {member.username[0]?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)] truncate">
            {member.username}
          </h3>
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            {member.riotId && (
              <span className="truncate">
                {member.riotId}#{member.riotTag}
              </span>
            )}
            {member.mainLane && (
              <span className="flex items-center gap-1">
                <span className="badge px-1.5 py-0.5 text-xs bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]">
                  {member.mainLane}
                </span>
                {member.subLane && (
                  <>
                    <span className="text-[var(--text-muted)]">/</span>
                    <span className="badge px-1.5 py-0.5 text-xs bg-[var(--accent-blue)]/20 text-[var(--accent-blue)]">
                      {member.subLane}
                    </span>
                  </>
                )}
              </span>
            )}
            <span className={getTierColorClass(member.score)}>
              {member.score}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onAction(member)}
        disabled={actionDisabled}
        className={`ml-2 p-2 rounded-lg transition-colors ${
          actionIcon === "add"
            ? "bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/80 text-white"
            : "bg-[var(--error)] hover:bg-[var(--error)]/80 text-white"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {actionIcon === "add" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          )}
        </svg>
      </button>
    </div>
  );
}
