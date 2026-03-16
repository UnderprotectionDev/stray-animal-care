'use client'

import React, { useCallback, useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import SplitText from '@/components/SplitText'

const FLASH_COLORS = [
  'var(--cta)',
  'var(--stats)',
  'var(--health)',
  'var(--trust)',
]

type Props = {
  text: string | null | undefined
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  style?: React.CSSProperties
  enableColorFlash?: boolean
}

export function AnimatedMegaHeading({ text, className, tag = 'h2', style, enableColorFlash = false }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const handleAnimationComplete = useCallback(() => {
    if (!enableColorFlash || reducedMotion || !wrapperRef.current) return

    const chars = wrapperRef.current.querySelectorAll<HTMLElement>('.split-char')
    if (chars.length === 0) return

    // Pick 3-4 random unique indices
    const count = Math.min(chars.length, Math.floor(Math.random() * 2) + 3)
    const indices = new Set<number>()
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * chars.length))
    }

    const tl = gsap.timeline()
    let staggerDelay = 0

    indices.forEach((idx) => {
      const charEl = chars[idx]
      const flashColor = FLASH_COLORS[Math.floor(Math.random() * FLASH_COLORS.length)]

      tl.to(
        charEl,
        { color: flashColor, duration: 0.3, ease: 'power2.out' },
        staggerDelay,
      )
      tl.to(
        charEl,
        { color: 'var(--foreground)', duration: 0.5, ease: 'power2.inOut' },
        staggerDelay + 0.3,
      )
      staggerDelay += 0.2
    })
  }, [enableColorFlash, reducedMotion])

  if (!text) return null

  return (
    <div ref={wrapperRef} style={style}>
      <SplitText
        text={text}
        tag={tag}
        className={`t-mega uppercase leading-none ${className || ''}`}
        splitType="chars"
        duration={0.5}
        delay={30}
        ease="power4.out"
        from={{ opacity: 0, y: 60, rotateX: -90 }}
        to={{ opacity: 1, y: 0, rotateX: 0 }}
        threshold={0.15}
        rootMargin="-80px"
        textAlign="left"
        onLetterAnimationComplete={handleAnimationComplete}
      />
    </div>
  )
}
