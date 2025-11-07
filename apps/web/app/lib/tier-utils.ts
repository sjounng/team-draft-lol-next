// Tier detection and styling utilities

export type Tier = 'IRON' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'EMERALD' | 'DIAMOND' | 'MASTER' | 'GRANDMASTER' | 'CHALLENGER'

/**
 * Get tier from score
 */
export function getTierFromScore(score: number): Tier {
  if (score >= 3000) return 'CHALLENGER'
  if (score >= 2900) return 'GRANDMASTER'
  if (score >= 2800) return 'MASTER'
  if (score >= 2400) return 'DIAMOND'
  if (score >= 2000) return 'EMERALD'
  if (score >= 1600) return 'PLATINUM'
  if (score >= 1200) return 'GOLD'
  if (score >= 800) return 'SILVER'
  if (score >= 400) return 'BRONZE'
  return 'IRON'
}

/**
 * Get tier color class name
 */
export function getTierColorClass(score: number): string {
  const tier = getTierFromScore(score)
  return `tier-${tier.toLowerCase()}`
}

/**
 * Check if tier should have shimmer effect (Gold+)
 */
export function shouldShimmer(score: number): boolean {
  return score >= 1200 // Gold and above
}

/**
 * Check if tier should have gradient (Emerald+)
 */
export function shouldGradient(score: number): boolean {
  return score >= 2000 // Emerald and above
}

/**
 * Get tier background class for card backgrounds (Diamond+)
 */
export function getTierBackgroundClass(score: number): string {
  const tier = getTierFromScore(score)

  switch (tier) {
    case 'CHALLENGER':
      return 'tier-bg-challenger'
    case 'GRANDMASTER':
      return 'tier-bg-grandmaster'
    case 'MASTER':
      return 'tier-bg-master'
    case 'DIAMOND':
      return 'tier-bg-diamond'
    default:
      return 'bg-[var(--surface-hover)]'
  }
}

/**
 * Get tier display name in Korean
 */
export function getTierNameKR(tier: Tier): string {
  const names: Record<Tier, string> = {
    'IRON': '아이언',
    'BRONZE': '브론즈',
    'SILVER': '실버',
    'GOLD': '골드',
    'PLATINUM': '플래티넘',
    'EMERALD': '에메랄드',
    'DIAMOND': '다이아몬드',
    'MASTER': '마스터',
    'GRANDMASTER': '그랜드마스터',
    'CHALLENGER': '챌린저',
  }
  return names[tier]
}
