'use client'

import React, { useEffect, useRef, useState, type PropsWithChildren } from 'react'
import gsap from 'gsap'

type Props = PropsWithChildren<{
  color?: string
  speed?: number
  className?: string
}>

export function MovingBorder({
  children,
  color = 'var(--cta)',
  speed = 4,
  className,
}: Props) {
  const borderRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reducedMotion || !borderRef.current) return

    borderRef.current.style.setProperty('--border-angle', '0deg')

    const proxy = { angle: 0 }
    const tween = gsap.to(proxy, {
      angle: 360,
      duration: speed,
      repeat: -1,
      ease: 'none',
      onUpdate() {
        borderRef.current?.style.setProperty('--border-angle', `${proxy.angle}deg`)
      },
    })

    return () => {
      tween.kill()
    }
  }, [reducedMotion, speed])

  if (reducedMotion) {
    return (
      <div
        className={className}
        style={{ border: `1.5px solid ${color}` }}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={borderRef}
      className={`relative ${className || ''}`}
      style={{
        padding: '1.5px',
        background: `conic-gradient(from var(--border-angle, 0deg), transparent 60%, ${color} 80%, transparent 100%)`,
        ['--border-angle' as string]: '0deg',
      }}
    >
      <div className="relative z-[1] h-full">
        {children}
      </div>
    </div>
  )
}
