'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { ChevronDown, FileText, Download } from 'lucide-react'
import type { Media, TransparencyReport } from '@/payload-types'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'
import { ExpenseBreakdown } from './ExpenseBreakdown'
import { ExpenseDonutChart } from './ExpenseDonutChart'
import { DonationComparison } from './DonationComparison'

const ACCENT_COLORS = [
  { bg: 'var(--trust)', fg: 'var(--trust-foreground)' },
  { bg: 'var(--health)', fg: 'var(--health-foreground)' },
  { bg: 'var(--adoption)', fg: 'var(--adoption-foreground)' },
  { bg: 'var(--warm)', fg: 'var(--warm-foreground)' },
  { bg: 'var(--emergency)', fg: 'var(--emergency-foreground)' },
  { bg: 'var(--cta)', fg: 'var(--cta-foreground)' },
]

type ReportCardProps = {
  report: TransparencyReport
  labels: {
    expenses: string
    totalExpense: string
    donations: string
    totalDonation: string
    category: string
    amount: string
    comparison: string
    documents: string
    surplusLabel: string
    deficitLabel: string
  }
  currency: string
  index: number
}

export function ReportCard({ report, labels, currency, index }: ReportCardProps) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const expandRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<SVGSVGElement>(null)
  const reducedMotion = useReducedMotion()

  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length]

  // Animate expand/collapse
  useEffect(() => {
    const el = expandRef.current
    if (!el) return

    if (expanded) {
      el.style.display = 'block'
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' },
      )
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (el) el.style.display = 'none'
        },
      })
    }
  }, [expanded])

  // Animate chevron
  useEffect(() => {
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        rotation: expanded ? 180 : 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [expanded])

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      const glare = glareRef.current
      if (!el || reducedMotion) return

      gsap.to(el, {
        borderColor: accent.bg,
        duration: 0.3,
        ease: 'power2.out',
      })

      if (glare) {
        const rect = el.getBoundingClientRect()
        const gx = ((e.clientX - rect.left) / rect.width) * 100
        const gy = ((e.clientY - rect.top) / rect.height) * 100
        glare.style.setProperty('--glare-x', `${gx}%`)
        glare.style.setProperty('--glare-y', `${gy}%`)
        glare.style.opacity = '1'
      }
    },
    [accent.bg, reducedMotion],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      const glare = glareRef.current
      if (!el || reducedMotion) return
      const rect = el.getBoundingClientRect()

      if (glare) {
        const gx = ((e.clientX - rect.left) / rect.width) * 100
        const gy = ((e.clientY - rect.top) / rect.height) * 100
        glare.style.setProperty('--glare-x', `${gx}%`)
        glare.style.setProperty('--glare-y', `${gy}%`)
      }
    },
    [reducedMotion],
  )

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return

    gsap.to(el, {
      borderColor: 'var(--border)',
      duration: 0.25,
      ease: 'power2.in',
    })

    if (glare) {
      glare.style.opacity = '0'
    }
  }, [])

  const monthDate = new Date(report.month)
  const monthLabel = !isNaN(monthDate.getTime())
    ? monthDate.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
      })
    : report.month

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden border border-border bg-background transition-[border-color] duration-200"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Accent bar */}
      <div className="h-1" style={{ backgroundColor: accent.bg }} />

      <GlareOverlay ref={glareRef} glareOpacity={0.08} />

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="relative z-10 flex w-full items-center justify-between p-4 text-left md:p-6 group"
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Month number badge */}
          <div
            className="hidden sm:flex items-center justify-center size-12 shrink-0 font-heading text-lg"
            style={{ backgroundColor: accent.bg, color: accent.fg }}
          >
            {isNaN(monthDate.getTime()) ? '–' : monthDate.getMonth() + 1}
          </div>
          <div className="min-w-0">
            <h3 className="t-h2 truncate">{report.title}</h3>
            <p className="t-meta mt-0.5">{monthLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden text-right sm:block">
            <p className="t-meta">{labels.totalExpense}</p>
            <p
              className="font-heading text-lg"
              style={{ color: accent.bg }}
            >
              {(report.totalExpense ?? 0).toLocaleString('tr-TR')} {currency}
            </p>
          </div>
          <div
            className="flex items-center justify-center size-8 border border-border group-hover:border-foreground transition-colors"
          >
            <ChevronDown ref={chevronRef} className="size-4 text-foreground" />
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div ref={expandRef} className="overflow-hidden" style={{ display: 'none', height: 0 }}>
        <div className="border-t border-border px-4 py-6 md:px-6 space-y-8">
          {/* Expense section: Table then Donut stacked */}
          {report.expenses && report.expenses.length > 0 && (
            <div className="space-y-6">
              <ExpenseBreakdown
                expenses={report.expenses}
                totalExpense={report.totalExpense ?? 0}
                labels={labels}
                currency={currency}
              />
              <ExpenseDonutChart
                expenses={report.expenses}
                totalExpense={report.totalExpense ?? 0}
                currency={currency}
                labels={labels}
              />
            </div>
          )}

          {/* Donation comparison */}
          <DonationComparison
            totalDonation={report.totalDonation ?? 0}
            totalExpense={report.totalExpense ?? 0}
            labels={labels}
            currency={currency}
          />

          {/* Documents */}
          {report.documents && report.documents.length > 0 && (
            <div>
              <h4 className="t-h2 mb-4">{labels.documents}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {report.documents.map((doc) => {
                  const media = typeof doc === 'number' ? null : (doc as Media)
                  if (!media?.url) return null
                  return (
                    <a
                      key={media.id}
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 border border-border p-4 hover:bg-muted transition-colors group/doc"
                    >
                      <div className="flex items-center justify-center size-10 bg-muted text-foreground shrink-0">
                        <FileText className="size-5" />
                      </div>
                      <span className="t-body flex-1 truncate">
                        {media.filename ?? labels.documents}
                      </span>
                      <Download className="size-4 shrink-0 text-muted-foreground group-hover/doc:text-foreground transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
