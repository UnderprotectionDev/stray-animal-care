'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import CountUp from '@/components/CountUp'
import BlurText from '@/components/BlurText'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'

type StatItem = {
  value: number
  suffix: string
  label: string
  color: string
  colorFg: string
}

type Props = {
  stats: StatItem[]
}

function StatCard({ stat, index, stats }: { stat: StatItem; index: number; stats: StatItem[] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const hoverStat = stats[(index + 1) % stats.length]

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      const glare = glareRef.current
      if (!el) return

      gsap.to(el, {
        backgroundColor: hoverStat.color,
        color: hoverStat.colorFg,
        duration: 0.3,
        ease: 'power2.out',
      })

      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - (rect.left + rect.width / 2)) / 20
      const my = (e.clientY - (rect.top + rect.height / 2)) / 20
      el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.03, 1.03, 1)`
      }

      if (glare) {
        const gx = ((e.clientX - rect.left) / rect.width) * 100
        const gy = ((e.clientY - rect.top) / rect.height) * 100
        glare.style.setProperty('--glare-x', `${gx}%`)
        glare.style.setProperty('--glare-y', `${gy}%`)
        glare.style.opacity = '1'
      }
    },
    [hoverStat.color, hoverStat.colorFg],
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const mx = (e.clientX - (rect.left + rect.width / 2)) / 20
    const my = (e.clientY - (rect.top + rect.height / 2)) / 20
    el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.03, 1.03, 1)`
    }

    if (glare) {
      const gx = ((e.clientX - rect.left) / rect.width) * 100
      const gy = ((e.clientY - rect.top) / rect.height) * 100
      glare.style.setProperty('--glare-x', `${gx}%`)
      glare.style.setProperty('--glare-y', `${gy}%`)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return

    gsap.to(el, {
      backgroundColor: stat.color,
      color: stat.colorFg,
      duration: 0.25,
      ease: 'power2.in',
    })

    el.style.transform = 'translate3d(0px, 0px, 0)'
    if (contentRef.current) {
      contentRef.current.style.transform = 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)'
    }
    if (glare) {
      glare.style.opacity = '0'
    }
  }, [stat.color, stat.colorFg])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden cursor-default h-40 md:h-48"
      style={{
        backgroundColor: stat.color,
        color: stat.colorFg,
        transition: 'transform 0.1s ease-out',
      }}
      onMouseEnter={reducedMotion ? undefined : handleMouseEnter}
      onMouseMove={reducedMotion ? undefined : handleMouseMove}
      onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
    >
      <div
        ref={contentRef}
        className="relative z-10 h-full px-4 py-4 md:px-6 md:py-6 flex flex-col justify-between"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <span className="t-comment block">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <span
            className="block"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            <CountUp to={stat.value} from={0} duration={2} />
            <span>{stat.suffix}</span>
          </span>
          <BlurText
            text={stat.label}
            tag="span"
            className="block mt-2 text-xs md:text-sm font-bold uppercase tracking-wider"
            animateBy="words"
            delay={80}
            stepDuration={0.3}
            direction="bottom"
            threshold={0.3}
          />
        </div>
      </div>
      <GlareOverlay ref={glareRef} />
    </div>
  )
}

export function OurWorkStats({ stats }: Props) {
  if (stats.length === 0) return null

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
      style={{ gap: '1.5px', background: 'var(--palette-black)' }}
    >
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} stats={stats} />
      ))}
    </div>
  )
}
