import {
  UtensilsCrossed,
  Stethoscope,
  Scissors,
  Siren,
  Syringe,
  Home,
} from 'lucide-react'

export const ACTIVITY_KEYS = [
  'feeding',
  'treatment',
  'spaying',
  'emergency',
  'vaccination',
  'shelter',
] as const

export const ACTIVITY_NUMBERS: Record<string, string> = {
  feeding: '01',
  treatment: '02',
  spaying: '03',
  emergency: '04',
  vaccination: '05',
  shelter: '06',
}

export const ACTIVITY_COLORS: Record<string, string> = {
  feeding: 'var(--health)',
  treatment: 'var(--stats)',
  spaying: 'var(--trust)',
  emergency: 'var(--emergency)',
  vaccination: 'var(--adoption)',
  shelter: 'var(--warm)',
}

export const ACTIVITY_FOREGROUNDS: Record<string, string> = {
  feeding: 'var(--health-foreground)',
  treatment: 'var(--stats-foreground)',
  spaying: 'var(--trust-foreground)',
  emergency: 'var(--emergency-foreground)',
  vaccination: 'var(--adoption-foreground)',
  shelter: 'var(--warm-foreground)',
}

export const ACTIVITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  feeding: UtensilsCrossed,
  treatment: Stethoscope,
  spaying: Scissors,
  emergency: Siren,
  vaccination: Syringe,
  shelter: Home,
}
