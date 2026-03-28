'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { findClosestEdge4, getEdgeTransform } from '@/utilities/edgeDetection'

const ACCENT_COLORS = [
  { bg: 'var(--cta)', fg: 'var(--cta-foreground)' },
  { bg: 'var(--stats)', fg: 'var(--stats-foreground)' },
  { bg: 'var(--health)', fg: 'var(--health-foreground)' },
  { bg: 'var(--trust)', fg: 'var(--trust-foreground)' },
]

type BankAccount = {
  id?: string | null
  bankName: string
  accountHolder: string
  iban: string
  currency?: ('TRY' | 'USD' | 'EUR') | null
}

type Props = {
  account: BankAccount
  colorIndex: number
  copyLabel: string
}

export function InteractiveBankCard({ account, colorIndex, copyLabel }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const color = ACCENT_COLORS[colorIndex % ACCENT_COLORS.length]

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const showOverlay = useCallback(() => {
    const overlay = overlayRef.current
    if (!overlay || reducedMotion) return
    gsap.killTweensOf(overlay)
    gsap.to(overlay, { xPercent: 0, yPercent: 0, duration: 0.3, ease: 'power2.out' })
  }, [reducedMotion])

  const hideOverlay = useCallback(() => {
    const overlay = overlayRef.current
    if (!overlay || reducedMotion) return
    gsap.killTweensOf(overlay)
    gsap.to(overlay, { xPercent: -100, yPercent: 0, duration: 0.25, ease: 'power2.in' })
  }, [reducedMotion])

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current
    const overlay = overlayRef.current
    if (!el || !overlay || reducedMotion) return
    const edge = findClosestEdge4(e, el)
    const from = getEdgeTransform(edge)
    gsap.killTweensOf(overlay)
    gsap.fromTo(overlay, from, { xPercent: 0, yPercent: 0, duration: 0.3, ease: 'power2.out' })
  }, [reducedMotion])

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current
    const overlay = overlayRef.current
    if (!el || !overlay || reducedMotion) return
    const edge = findClosestEdge4(e, el)
    const to = getEdgeTransform(edge)
    gsap.killTweensOf(overlay)
    gsap.to(overlay, { ...to, duration: 0.25, ease: 'power2.in' })
  }, [reducedMotion])

  const copyIban = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(account.iban)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
    }
  }, [account.iban])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      copyIban()
    }
  }, [copyIban])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden border-[1.5px] border-border bg-background cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={showOverlay}
      onBlur={hideOverlay}
      onClick={copyIban}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${copyLabel} ${account.bankName} IBAN`}
    >
      {/* Direction-aware overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center"
        style={{ backgroundColor: color.bg, transform: 'translateX(-100%)' }}
      >
        <span
          className="font-heading text-lg font-bold uppercase tracking-wider"
          style={{ color: color.fg }}
        >
          {copied ? 'KOPYALANDI!' : `${copyLabel} IBAN`}
        </span>
      </div>

      {/* Colored left border strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color.bg }} />

      {/* Card content */}
      <div className="p-6 pl-8 space-y-3 relative z-0">
        <div className="flex items-center justify-between">
          <span className="t-meta font-bold font-heading text-lg uppercase">
            {account.bankName}
          </span>
          <span
            className="badge-sys text-xs"
            style={{ backgroundColor: color.bg, color: color.fg, borderColor: color.bg }}
          >
            {account.currency || 'TRY'}
          </span>
        </div>
        <div className="flex items-center gap-3 bg-background border-[1.5px] border-border p-3">
          <code className="font-mono text-sm break-all flex-1">{account.iban}</code>
        </div>
        {account.accountHolder && (
          <p className="t-meta text-muted-foreground">{account.accountHolder}</p>
        )}
      </div>
    </div>
  )
}
