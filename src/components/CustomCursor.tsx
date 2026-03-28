'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/utilities/ui'

const PawSVG = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outline layer — cream stroke for contrast on dark backgrounds */}
    <g stroke="#F4F1EA" strokeWidth={3} fill="none">
      <ellipse cx="18" cy="14" rx="7" ry="9" transform="rotate(-10 18 14)" />
      <ellipse cx="46" cy="14" rx="7" ry="9" transform="rotate(10 46 14)" />
      <ellipse cx="9" cy="28" rx="6.5" ry="8" transform="rotate(-20 9 28)" />
      <ellipse cx="55" cy="28" rx="6.5" ry="8" transform="rotate(20 55 28)" />
      <path d="M32 56c-11 0-18-8-18-16 0-5.5 4-10 9-11.5C25.5 27.8 28 27.5 32 27.5s6.5.3 9 1c5 1.5 9 6 9 11.5 0 8-7 16-18 16z" />
    </g>
    {/* Fill layer — black for universal visibility */}
    <g fill="#111111">
      <ellipse cx="18" cy="14" rx="7" ry="9" transform="rotate(-10 18 14)" />
      <ellipse cx="46" cy="14" rx="7" ry="9" transform="rotate(10 46 14)" />
      <ellipse cx="9" cy="28" rx="6.5" ry="8" transform="rotate(-20 9 28)" />
      <ellipse cx="55" cy="28" rx="6.5" ry="8" transform="rotate(20 55 28)" />
      <path d="M32 56c-11 0-18-8-18-16 0-5.5 4-10 9-11.5C25.5 27.8 28 27.5 32 27.5s6.5.3 9 1c5 1.5 9 6 9 11.5 0 8-7 16-18 16z" />
    </g>
  </svg>
)

export function CustomCursor({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const posX = useMotionValue(0)
  const posY = useMotionValue(0)
  const springX = useSpring(posX, { stiffness: 2000, damping: 50 })
  const springY = useSpring(posY, { stiffness: 2000, damping: 50 })
  const containerRef = React.useRef<HTMLDivElement>(null)
  const rectRef = React.useRef<DOMRect | null>(null)
  const [mouseInside, setMouseInside] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsDisabled(isTouchDevice || prefersReducedMotion)
  }, [])

  const cacheRect = useCallback(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect()
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = rectRef.current
      if (rect) {
        posX.set(e.clientX - rect.left)
        posY.set(e.clientY - rect.top)
      }
    },
    [posX, posY],
  )

  if (isDisabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      onMouseLeave={() => setMouseInside(false)}
      onMouseEnter={() => {
        cacheRect()
        setMouseInside(true)
      }}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'none' }}
      ref={containerRef}
      className={cn('relative', className)}
    >
      {children}
      <AnimatePresence>
        {mouseInside && (
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-50"
            style={{ x: springX, y: springY }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <PawSVG
              className="h-10 w-10 -translate-x-5 -translate-y-5 -rotate-[15deg]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
