export const STATUS_LABELS: Record<string, string> = {
  DRAFT_PENDING: "밴픽 대기",
  DRAFT_COMPLETE: "밴픽 완료",
  RESULT_PENDING: "결과 승인 대기",
  COMPLETED: "완료",
};

export const STATUS_COLORS: Record<string, string> = {
  DRAFT_PENDING: "bg-yellow-500/20 text-yellow-500",
  DRAFT_COMPLETE: "bg-blue-500/20 text-blue-500",
  RESULT_PENDING: "bg-purple-500/20 text-purple-500",
  COMPLETED: "bg-green-500/20 text-green-500",
};

export const POSITION_LABELS: Record<string, string> = {
  TOP: "탑",
  JGL: "정글",
  MID: "미드",
  ADC: "원딜",
  SUP: "서폿",
};

export const POSITION_ORDER: Record<string, number> = {
  TOP: 1,
  JGL: 2,
  MID: 3,
  ADC: 4,
  SUP: 5,
};
