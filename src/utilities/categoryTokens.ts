import type React from 'react'

interface CategoryConfig {
  /** [bg CSS var, fg CSS var] for inline styles */
  style: [string, string]
  /** CSS semantic token name (e.g. 'cta', 'health') */
  token: string
}

/** Unified category configuration — maps category slug to style + semantic token */
export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  kurtarma: { style: ['var(--cta)', 'var(--cta-foreground)'], token: 'cta' },
  tedavi: { style: ['var(--health)', 'var(--health-foreground)'], token: 'health' },
  'gunluk-hayat': { style: ['var(--warm)', 'var(--warm-foreground)'], token: 'warm' },
  gunluk: { style: ['var(--warm)', 'var(--warm-foreground)'], token: 'warm' },
  duyuru: { style: ['var(--emergency)', 'var(--emergency-foreground)'], token: 'emergency' },
  etkinlik: { style: ['var(--adoption)', 'var(--adoption-foreground)'], token: 'adoption' },
  sahiplendirme: { style: ['var(--adoption)', 'var(--adoption-foreground)'], token: 'adoption' },
}

const DEFAULT_BADGE_STYLE: [string, string] = ['var(--palette-black)', 'var(--palette-cream)']

export function getCategoryStyle(category: string | null): React.CSSProperties {
  const [bg, fg] = (category && CATEGORY_CONFIG[category]?.style) || DEFAULT_BADGE_STYLE
  return { background: bg, color: fg, border: '1px solid transparent' }
}

export function getCategorySemanticToken(category: string | null): string {
  if (!category) return 'palette-black'
  return CATEGORY_CONFIG[category]?.token || 'palette-black'
}
