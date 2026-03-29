'use client'

import React from 'react'
import { motion } from 'motion/react'
import { useQueryState } from 'nuqs'
import { CATEGORY_CONFIG } from '@/utilities/categoryTokens'

type BlogFilterProps = {
  labels: {
    all: string
    kurtarma: string
    tedavi: string
    gunluk: string
    duyuru: string
    etkinlik: string
  }
  postCounts?: Record<string, number>
}

const FILTER_OPTIONS = [
  { value: '', labelKey: 'all' as const },
  { value: 'kurtarma', labelKey: 'kurtarma' as const },
  { value: 'tedavi', labelKey: 'tedavi' as const },
  { value: 'gunluk', labelKey: 'gunluk' as const },
  { value: 'duyuru', labelKey: 'duyuru' as const },
  { value: 'etkinlik', labelKey: 'etkinlik' as const },
]

export function BlogFilter({ labels, postCounts }: BlogFilterProps) {
  const [current, setCurrent] = useQueryState('category', { defaultValue: '' })

  const activeToken = current
    ? CATEGORY_CONFIG[current]?.token || 'palette-black'
    : 'palette-black'

  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => {
        const isActive = current === option.value
        const count = option.value
          ? postCounts?.[option.value]
          : postCounts
            ? Object.values(postCounts).reduce((sum, n) => sum + n, 0)
            : undefined

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setCurrent(option.value || null)}
            aria-pressed={isActive}
            className={`relative px-4 py-2 font-heading text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
              isActive
                ? 'text-[var(--palette-cream)]'
                : 'bg-background border border-border/30 hover:bg-muted/40 text-foreground'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="blog-filter-active"
                className="absolute inset-0 z-0"
                style={{ background: `var(--${activeToken})` }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5">
              {labels[option.labelKey]}
              {typeof count === 'number' && (
                <span className="font-mono text-[10px] opacity-60">
                  ({count})
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
