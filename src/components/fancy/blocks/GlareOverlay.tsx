'use client'

import { forwardRef } from 'react'

type Props = {
  glareColor?: string
  glareOpacity?: number
  glareSize?: number
  className?: string
}

export const GlareOverlay = forwardRef<HTMLDivElement, Props>(
  ({ glareColor = '#ffffff', glareOpacity = 0.18, glareSize = 300, className }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'none',
          background: `radial-gradient(circle ${glareSize}px at var(--glare-x, 50%) var(--glare-y, 50%), ${glareColor}${Math.round(glareOpacity * 255).toString(16).padStart(2, '0')}, transparent)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    )
  },
)

GlareOverlay.displayName = 'GlareOverlay'
