'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const PAW_PATH =
  'M8 6c0-1.7 1.1-3 2.5-3S13 4.3 13 6s-1.1 3-2.5 3S8 7.7 8 6zm8 0c0-1.7 1.1-3 2.5-3S21 4.3 21 6s-1.1 3-2.5 3S16 7.7 16 6zM4 12c0-1.4.9-2.5 2-2.5s2 1.1 2 2.5-.9 2.5-2 2.5-2-1.1-2-2.5zm16 0c0-1.4.9-2.5 2-2.5s2 1.1 2 2.5-.9 2.5-2 2.5-2-1.1-2-2.5zM7 16c0-3 2.5-5 5-5s5 2 5 5c0 2.5-2 4.5-5 4.5S7 18.5 7 16z'

/**
 * Paw trail walking diagonally across the full grid —
 * from bottom-left toward top-right, crossing cell borders
 */
const TRAIL_STEPS = [
  { x: '5%', y: '92%', rot: -30, size: 40 },
  { x: '12%', y: '80%', rot: -15, size: 36 },
  { x: '22%', y: '68%', rot: -35, size: 32 },
  { x: '30%', y: '56%', rot: -20, size: 28 },
  { x: '40%', y: '45%', rot: -30, size: 24 },
  { x: '50%', y: '35%', rot: -15, size: 22 },
  { x: '60%', y: '25%', rot: -35, size: 20 },
  { x: '70%', y: '16%', rot: -20, size: 18 },
  { x: '80%', y: '8%', rot: -30, size: 16 },
  { x: '92%', y: '2%', rot: -15, size: 14 },
]

/** Scattered ambient paws — one per grid cell area for balance */
const AMBIENT_PAWS = [
  { x: '15%', y: '25%', rot: 45, size: 50, color: 'var(--cta)', opacity: 0.05 },
  { x: '70%', y: '18%', rot: -30, size: 38, color: 'var(--stats)', opacity: 0.04 },
  { x: '25%', y: '70%', rot: 20, size: 44, color: 'var(--emergency)', opacity: 0.04 },
  { x: '80%', y: '80%', rot: -50, size: 36, color: 'var(--trust)', opacity: 0.05 },
  { x: '55%', y: '55%', rot: 60, size: 30, color: 'var(--health)', opacity: 0.03 },
  { x: '90%', y: '45%', rot: -20, size: 28, color: 'var(--warm)', opacity: 0.04 },
]

export function NotFoundScene() {
  const trailRef = useRef<HTMLDivElement>(null)
  const ambientRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const cleanups: gsap.core.Tween[] = []

    // Trail paws: appear sequentially with a bounce
    if (trailRef.current) {
      const steps = trailRef.current.querySelectorAll<HTMLElement>('[data-trail]')
      steps.forEach((el, i) => {
        gsap.set(el, { opacity: 0, scale: 0.3, y: 20 })
        cleanups.push(
          gsap.to(el, {
            opacity: 0.15 - i * 0.012,
            scale: 1,
            y: 0,
            duration: 0.5,
            delay: 0.5 + i * 0.12,
            ease: 'back.out(2)',
          }),
        )
      })
    }

    // Ambient paws: gentle float
    if (ambientRef.current) {
      const paws = ambientRef.current.querySelectorAll<HTMLElement>('[data-ambient]')
      paws.forEach((el, i) => {
        cleanups.push(
          gsap.to(el, {
            y: '+=14',
            x: '+=7',
            rotation: `+=${10 + i * 5}`,
            yoyo: true,
            repeat: -1,
            duration: 4 + Math.random() * 3,
            ease: 'sine.inOut',
            delay: i * 0.4,
          }),
        )
      })
    }

    return () => cleanups.forEach((t) => t.kill())
  }, [reducedMotion])

  return (
    <>
      {/* Paw trail — crossing the full page diagonally */}
      <div ref={trailRef} className="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
        {TRAIL_STEPS.map((step, i) => (
          <div
            key={`trail-${i}`}
            data-trail
            className="absolute"
            style={{
              left: step.x,
              top: step.y,
              width: step.size,
              height: step.size,
              opacity: reducedMotion ? 0.15 - i * 0.012 : 0,
              transform: `rotate(${step.rot}deg)`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="var(--foreground)" xmlns="http://www.w3.org/2000/svg">
              <path d={PAW_PATH} />
            </svg>
          </div>
        ))}
      </div>

      {/* Ambient floating paws */}
      <div ref={ambientRef} className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        {AMBIENT_PAWS.map((paw, i) => (
          <div
            key={`ambient-${i}`}
            data-ambient
            className="absolute"
            style={{
              left: paw.x,
              top: paw.y,
              width: paw.size,
              height: paw.size,
              opacity: paw.opacity,
              transform: `rotate(${paw.rot}deg)`,
            }}
          >
            <svg viewBox="0 0 24 24" fill={paw.color} xmlns="http://www.w3.org/2000/svg">
              <path d={PAW_PATH} />
            </svg>
          </div>
        ))}
      </div>
    </>
  )
}
