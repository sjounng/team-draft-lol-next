interface CurrentTurnIndicatorProps {
  currentAction: string;
  isMyTurn: boolean;
}

export default function CurrentTurnIndicator({
  currentAction,
  isMyTurn,
}: CurrentTurnIndicatorProps) {
  return (
    <div className="card mb-6">
      <div className="text-center">
        <p className="text-sm text-[var(--text-muted)] mb-2">현재 차례</p>
        <p className="text-2xl font-bold text-[var(--primary)]">
          {currentAction}
        </p>
        {isMyTurn ? (
          <p className="text-sm text-green-500 mt-2 font-semibold">
            내 차례입니다! 챔피언을 선택하세요
          </p>
        ) : (
          <p className="text-sm text-[var(--text-muted)] mt-2">
            상대방의 차례를 기다리는 중...
          </p>
        )}
      </div>
    </div>
  );
}
