'use client'

import React from 'react'
import { useQueryState } from 'nuqs'
import { cn } from '@/utilities/ui'

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
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setCategory(option.value || null)}
          aria-pressed={category === option.value}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
            category === option.value
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground',
          )}
        >
          {labels[option.labelKey]}
        </button>
      ))}
    </div>
  )
}
