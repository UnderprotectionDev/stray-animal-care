'use client'

import React, { useCallback, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { UtensilsCrossed, Stethoscope, Scissors } from 'lucide-react'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'

type DonationCardsProps = {
  labels: {
    title: string
    food: { title: string; description: string }
    vet: { title: string; description: string }
    surgery: { title: string; description: string }
  }
}

const CARDS = [
  { key: 'food' as const, Icon: UtensilsCrossed, color: 'var(--palette-teal)', colorFg: '#ffffff' },
  { key: 'vet' as const, Icon: Stethoscope, color: 'var(--palette-blue)', colorFg: '#ffffff' },
  { key: 'surgery' as const, Icon: Scissors, color: 'var(--palette-lilac)', colorFg: '#ffffff' },
]

const HOVER_COLORS = [
  { color: 'var(--palette-orange)', colorFg: '#ffffff' },
  { color: 'var(--palette-teal)', colorFg: '#ffffff' },
  { color: 'var(--palette-red)', colorFg: '#ffffff' },
]

function DonationCard({
  cardDef,
  label,
  index,
}: {
  cardDef: (typeof CARDS)[number]
  label: { title: string; description: string }
  index: number
}) {
  const { Icon, color, colorFg } = cardDef
  const hoverColor = HOVER_COLORS[index]
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      const glare = glareRef.current
      if (!el) return

      gsap.to(el, {
        backgroundColor: hoverColor.color,
        color: hoverColor.colorFg,
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
    [hoverColor.color, hoverColor.colorFg],
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
      backgroundColor: color,
      color: colorFg,
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
  }, [color, colorFg])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden cursor-default h-44 md:h-52"
      style={{
        backgroundColor: color,
        color: colorFg,
        transition: 'transform 0.1s ease-out',
      }}
      onMouseEnter={reducedMotion ? undefined : handleMouseEnter}
      onMouseMove={reducedMotion ? undefined : handleMouseMove}
      onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
    >
      <div
        ref={contentRef}
        className="relative z-10 h-full px-5 py-5 md:px-6 md:py-6 flex flex-col justify-between"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <span className="t-comment block opacity-60">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <Icon className="size-8 mb-3" />
          <p className="font-heading font-bold uppercase text-sm tracking-wide">
            {label.title}
          </p>
          <p className="mt-1 text-xs opacity-80 leading-relaxed">
            {label.description}
          </p>
        </div>
      </div>
      <GlareOverlay ref={glareRef} />
    </div>
  )
}

export function DonationCards({ labels }: DonationCardsProps) {
  return (
    <div className="space-y-4">
      <h2 className="t-h2 uppercase">{labels.title}</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ gap: '1.5px', background: 'var(--palette-black)' }}
      >
        {CARDS.map((cardDef, i) => (
          <DonationCard
            key={cardDef.key}
            cardDef={cardDef}
            label={labels[cardDef.key]}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
