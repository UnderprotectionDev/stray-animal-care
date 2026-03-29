'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DotGridBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !ref.current) return

    const tween = gsap.to(ref.current, {
      backgroundPositionY: '12px',
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'radial-gradient(circle, var(--palette-black) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.06,
      }}
      aria-hidden="true"
    />
  )
}
