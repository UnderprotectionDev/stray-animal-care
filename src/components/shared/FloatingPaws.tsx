'use client'

import React from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const PAW_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="6" rx="2.5" ry="3" />
    <ellipse cx="16" cy="6" rx="2.5" ry="3" />
    <ellipse cx="4" cy="12" rx="2" ry="2.5" />
    <ellipse cx="20" cy="12" rx="2" ry="2.5" />
    <path d="M7 16c0-3 2.5-5 5-5s5 2 5 5c0 2.5-2 4.5-5 4.5S7 18.5 7 16z" />
  </svg>
)

export type PawPosition = {
  top: string
  left?: string
  right?: string
  size: string
  opacity: number
  rotation: number
}

const DEFAULT_PAWS: PawPosition[] = [
  { top: '10%', left: '5%', size: '2.5rem', opacity: 0.06, rotation: -15 },
  { top: '55%', left: '90%', size: '2rem', opacity: 0.05, rotation: 20 },
  { top: '25%', right: '12%', size: '1.5rem', opacity: 0.07, rotation: -30 },
  { top: '70%', left: '15%', size: '3rem', opacity: 0.04, rotation: 10 },
  { top: '8%', right: '25%', size: '1.8rem', opacity: 0.06, rotation: 35 },
]

type Props = {
  paws?: PawPosition[]
  color?: string
}

export function FloatingPaws({ paws = DEFAULT_PAWS, color = 'var(--warm-foreground)' }: Props) {
  const reducedMotion = useReducedMotion()

  return (
    <>
      {paws.map((paw, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            top: paw.top,
            left: paw.left,
            right: paw.right,
            width: paw.size,
            height: paw.size,
            opacity: paw.opacity,
            color,
            '--paw-rotate': `${paw.rotation}deg`,
            animation: reducedMotion
              ? 'none'
              : `floating-paw ${3 + i * 0.7}s ease-in-out infinite alternate`,
          } as React.CSSProperties}
          aria-hidden="true"
        >
          {PAW_SVG}
        </div>
      ))}
    </>
  )
}
