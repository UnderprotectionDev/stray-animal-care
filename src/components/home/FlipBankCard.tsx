'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

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

export function FlipBankCard({ account, colorIndex, copyLabel }: Props) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)
  const [copied, setCopied] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const flippedRef = useRef(false)

  const color = ACCENT_COLORS[colorIndex % ACCENT_COLORS.length]
  const initial = account.bankName.charAt(0).toUpperCase()

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const flipTo = useCallback(
    (show: boolean) => {
      if (!innerRef.current) return
      if (reducedMotion) {
        setFlipped(show)
        return
      }
      gsap.to(innerRef.current, {
        rotateY: show ? 180 : 0,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      setFlipped(show)
      flippedRef.current = show
    },
    [reducedMotion],
  )

  const handleMouseEnter = useCallback(() => flipTo(true), [flipTo])
  const handleMouseLeave = useCallback(() => flipTo(false), [flipTo])

  const handleClick = useCallback(() => {
    flipTo(!flippedRef.current)
  }, [flipTo])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        flipTo(!flippedRef.current)
      }
    },
    [flipTo],
  )

  const copyIban = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation()
      try {
        await navigator.clipboard.writeText(account.iban)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // noop
      }
    },
    [account.iban],
  )

  // Detect touch device for click vs hover behavior
  const isTouchRef = useRef(false)
  useEffect(() => {
    isTouchRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])

  const hoverProps = {
    onMouseEnter: () => {
      if (!isTouchRef.current) handleMouseEnter()
    },
    onMouseLeave: () => {
      if (!isTouchRef.current) handleMouseLeave()
    },
    onClick: () => {
      if (isTouchRef.current) handleClick()
    },
  }

  return (
    <div
      className="relative"
      style={{ perspective: '800px' }}
      {...hoverProps}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${account.bankName} — ${flipped ? 'IBAN görünür' : 'çevirmek için üzerine gelin'}`}
    >
      <div
        ref={innerRef}
        className="relative w-full"
        style={{
          transformStyle: 'preserve-3d',
          height: '200px',
        }}
      >
        {/* ── Front Face ── */}
        <div
          className="absolute inset-0 border-[1.5px] border-border p-6 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: color.bg,
            ...(reducedMotion
              ? { display: flipped ? 'none' : 'block' }
              : {}),
          }}
        >
          {/* Currency badge */}
          <span
            className="absolute top-4 right-4 badge-sys text-xs font-bold"
            style={{
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              borderColor: 'var(--foreground)',
            }}
          >
            {account.currency || 'TRY'}
          </span>

          {/* Bank name */}
          <h4
            className="t-h2 uppercase mt-2 relative z-10"
            style={{ color: color.fg }}
          >
            {account.bankName}
          </h4>

          {/* Decorative initial watermark */}
          <span
            className="absolute -bottom-6 -right-2 text-[10rem] leading-none font-heading select-none pointer-events-none"
            style={{ color: color.fg, opacity: 0.08 }}
            aria-hidden="true"
          >
            {initial}
          </span>
        </div>

        {/* ── Back Face ── */}
        <div
          className="absolute inset-0 border-[1.5px] border-border bg-background overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            ...(reducedMotion
              ? { display: flipped ? 'block' : 'none', transform: 'none' }
              : {}),
          }}
        >
          {/* Colored left strip */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ backgroundColor: color.bg }}
          />

          <div className="p-6 pl-8 space-y-3">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <span className="t-meta font-bold font-heading text-lg uppercase">
                {account.bankName}
              </span>
              <span
                className="badge-sys text-xs"
                style={{
                  backgroundColor: color.bg,
                  color: color.fg,
                  borderColor: color.bg,
                }}
              >
                {account.currency || 'TRY'}
              </span>
            </div>

            {/* IBAN */}
            <div className="bg-background border-[1.5px] border-border p-3">
              <code className="font-mono text-sm break-all">{account.iban}</code>
            </div>

            {/* Account holder */}
            {account.accountHolder && (
              <p className="t-meta text-muted-foreground">{account.accountHolder}</p>
            )}

            {/* Copy button */}
            <button
              type="button"
              onClick={copyIban}
              className="btn-health inline-flex items-center text-sm font-bold uppercase tracking-wider px-4 py-2"
            >
              {copied ? 'KOPYALANDI!' : copyLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
