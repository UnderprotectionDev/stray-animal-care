'use client'

import React, { useCallback, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { Package, HandHeart, ShoppingCart } from 'lucide-react'
import { VerticalCutReveal } from '@/components/fancy/text/VerticalCutReveal'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'
import { ScrollAnimationTrigger } from '@/components/ui/scroll-animation-trigger'

const METHODS = [
  {
    key: 'cargo' as const,
    Icon: Package,
    color: 'var(--trust)',
    colorFg: 'var(--trust-foreground)',
  },
  {
    key: 'inPerson' as const,
    Icon: HandHeart,
    color: 'var(--warm)',
    colorFg: 'var(--warm-foreground)',
  },
  {
    key: 'online' as const,
    Icon: ShoppingCart,
    color: 'var(--health)',
    colorFg: 'var(--health-foreground)',
  },
]

type Props = {
  labels: {
    title: string
    description: string
    cargo: string
    inPerson: string
    online: string
  }
  cardTitles?: {
    cargo: string
    inPerson: string
    online: string
  }
}

function ShippingCard({
  labelKey,
  text,
  Icon,
  accentColor,
  accentForeground,
  index,
}: {
  labelKey: string
  text: string
  Icon: React.ComponentType<{ className?: string }>
  accentColor: string
  accentForeground: string
  index: number
}) {
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
        backgroundColor: accentColor,
        color: accentForeground,
        duration: 0.3,
        ease: 'power2.out',
      })

      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - (rect.left + rect.width / 2)) / 25
      const my = (e.clientY - (rect.top + rect.height / 2)) / 25
      el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.02, 1.02, 1)`
      }

      if (glare) {
        const gx = ((e.clientX - rect.left) / rect.width) * 100
        const gy = ((e.clientY - rect.top) / rect.height) * 100
        glare.style.setProperty('--glare-x', `${gx}%`)
        glare.style.setProperty('--glare-y', `${gy}%`)
        glare.style.opacity = '1'
      }
    },
    [accentColor, accentForeground],
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const mx = (e.clientX - (rect.left + rect.width / 2)) / 25
    const my = (e.clientY - (rect.top + rect.height / 2)) / 25
    el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.02, 1.02, 1)`
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
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
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
  }, [])

  return (
    <ScrollAnimationTrigger effect="slide" direction="up" delay={index * 0.12} once>
      <div
        ref={cardRef}
        className="relative overflow-hidden bg-background text-foreground cursor-default"
        style={{ transition: 'transform 0.1s ease-out' }}
        onMouseEnter={reducedMotion ? undefined : handleMouseEnter}
        onMouseMove={reducedMotion ? undefined : handleMouseMove}
        onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
      >
        <div
          ref={contentRef}
          className="relative z-10 p-6 lg:p-8 flex flex-col gap-4 h-full"
          style={{ transition: 'transform 0.1s ease-out' }}
        >
          {/* Icon */}
          <div
            className="flex h-14 w-14 items-center justify-center border-[1.5px] border-current"
            style={{ backgroundColor: accentColor, color: accentForeground }}
          >
            <Icon className="h-7 w-7" />
          </div>

          {/* Title as label key for the shipping method */}
          <VerticalCutReveal
            text={labelKey}
            tag="h3"
            className="font-heading text-lg font-bold uppercase"
          />

          {/* Description */}
          <p className="t-body text-sm opacity-80">{text}</p>
        </div>
        <GlareOverlay ref={glareRef} />
      </div>
    </ScrollAnimationTrigger>
  )
}

const DEFAULT_TITLES = {
  cargo: 'Kargo',
  inPerson: 'Elden Teslim',
  online: 'Online Sipariş',
}

export function SuppliesShipping({ labels, cardTitles }: Props) {
  const titles = cardTitles ?? DEFAULT_TITLES

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: '1.5px', background: 'var(--palette-black)' }}
    >
      {METHODS.map(({ key, Icon, color, colorFg }, i) => (
        <ShippingCard
          key={key}
          labelKey={titles[key]}
          text={labels[key]}
          Icon={Icon}
          accentColor={color}
          accentForeground={colorFg}
          index={i}
        />
      ))}
    </div>
  )
}
