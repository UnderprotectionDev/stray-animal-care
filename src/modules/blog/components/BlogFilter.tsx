'use client'

import React from 'react'
import { useQueryState } from 'nuqs'

type BlogFilterProps = {
  labels: {
    all: string
    kurtarma: string
    tedavi: string
    gunluk: string
    duyuru: string
    etkinlik: string
  }
}

const FILTER_OPTIONS = [
  { value: '', labelKey: 'all' as const },
  { value: 'kurtarma', labelKey: 'kurtarma' as const },
  { value: 'tedavi', labelKey: 'tedavi' as const },
  { value: 'gunluk', labelKey: 'gunluk' as const },
  { value: 'duyuru', labelKey: 'duyuru' as const },
  { value: 'etkinlik', labelKey: 'etkinlik' as const },
]

export function BlogFilter({ labels }: BlogFilterProps) {
  const [category, setCategory] = useQueryState('category', { defaultValue: '' })

  return (
    <div className="flex flex-wrap gap-[1px] bg-foreground border border-border">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setCategory(option.value || null)}
          aria-pressed={category === option.value}
          className={
            category === option.value
              ? 'badge-sys mint'
              : 'badge-sys'
          }
        >
          {labels[option.labelKey]}
        </button>
      ))}
    </div>
  )
}
