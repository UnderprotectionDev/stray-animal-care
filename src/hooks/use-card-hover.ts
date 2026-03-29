'use client'

import { useCallback, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

type UseCardHoverOptions = {
  /** Color to animate to on hover */
  hoverColor: string
  /** Foreground (text) color on hover */
  hoverColorFg: string
  /** Color to return to on leave */
  baseColor: string
  /** Foreground (text) color to return to on leave */
  baseColorFg: string
  /** Divisor for movement offset — higher = less movement (default: 20) */
  moveDivisor?: number
  /** Content scale on hover (default: 1.03) */
  hoverScale?: number
}

/**
 * Reusable hook for GSAP-powered card hover effects with color swap,
 * parallax movement, and glare overlay.
 *
 * Returns refs for the card, content, and glare elements, plus
 * mouse event handlers (or undefined if reduced motion is preferred).
 */
export function useCardHover({
  hoverColor,
  hoverColorFg,
  baseColor,
  baseColorFg,
  moveDivisor = 20,
  hoverScale = 1.03,
}: UseCardHoverOptions) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const updateGlare = useCallback((rect: DOMRect, clientX: number, clientY: number, show?: boolean) => {
    const glare = glareRef.current
    if (!glare) return
    const gx = ((clientX - rect.left) / rect.width) * 100
    const gy = ((clientY - rect.top) / rect.height) * 100
    glare.style.setProperty('--glare-x', `${gx}%`)
    glare.style.setProperty('--glare-y', `${gy}%`)
    if (show !== undefined) glare.style.opacity = show ? '1' : '0'
  }, [])

  const applyTransform = useCallback(
    (rect: DOMRect, clientX: number, clientY: number) => {
      const el = cardRef.current
      if (!el) return
      const mx = (clientX - (rect.left + rect.width / 2)) / moveDivisor
      const my = (clientY - (rect.top + rect.height / 2)) / moveDivisor
      el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(${hoverScale}, ${hoverScale}, 1)`
      }
    },
    [moveDivisor, hoverScale],
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      if (!el) return
      gsap.to(el, { backgroundColor: hoverColor, color: hoverColorFg, duration: 0.3, ease: 'power2.out' })
      const rect = el.getBoundingClientRect()
      applyTransform(rect, e.clientX, e.clientY)
      updateGlare(rect, e.clientX, e.clientY, true)
    },
    [hoverColor, hoverColorFg, applyTransform, updateGlare],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      applyTransform(rect, e.clientX, e.clientY)
      updateGlare(rect, e.clientX, e.clientY)
    },
    [applyTransform, updateGlare],
  )

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el, { backgroundColor: baseColor, color: baseColorFg, duration: 0.25, ease: 'power2.in' })
    el.style.transform = 'translate3d(0px, 0px, 0)'
    if (contentRef.current) {
      contentRef.current.style.transform = 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)'
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }, [baseColor, baseColorFg])

  return {
    cardRef,
    contentRef,
    glareRef,
    handlers: reducedMotion
      ? {}
      : {
          onMouseEnter: handleMouseEnter,
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
        },
  }
}
