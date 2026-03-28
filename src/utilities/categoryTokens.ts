import type React from 'react'

/** Maps category slug → [bg CSS var, fg CSS var] for inline styles */
export const CATEGORY_STYLE_MAP: Record<string, [string, string]> = {
  kurtarma: ['var(--cta)', 'var(--cta-foreground)'],
  tedavi: ['var(--health)', 'var(--health-foreground)'],
  'gunluk-hayat': ['var(--warm)', 'var(--warm-foreground)'],
  gunluk: ['var(--warm)', 'var(--warm-foreground)'],
  duyuru: ['var(--emergency)', 'var(--emergency-foreground)'],
  etkinlik: ['var(--adoption)', 'var(--adoption-foreground)'],
  sahiplendirme: ['var(--adoption)', 'var(--adoption-foreground)'],
}

const DEFAULT_BADGE_STYLE: [string, string] = ['var(--palette-black)', 'var(--palette-cream)']

/** Maps category slug → CSS semantic token name */
export const CATEGORY_SEMANTIC_TOKENS: Record<string, string> = {
  kurtarma: 'cta',
  tedavi: 'health',
  'gunluk-hayat': 'warm',
  gunluk: 'warm',
  duyuru: 'emergency',
  etkinlik: 'adoption',
  sahiplendirme: 'adoption',
}

export function getCategoryStyle(category: string | null): React.CSSProperties {
  const [bg, fg] = (category && CATEGORY_STYLE_MAP[category]) || DEFAULT_BADGE_STYLE
  return { background: bg, color: fg, border: '1px solid transparent' }
}

export function getCategorySemanticToken(category: string | null): string {
  if (!category) return 'palette-black'
  return CATEGORY_SEMANTIC_TOKENS[category] || 'palette-black'
}
