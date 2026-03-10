'use client'

import React from 'react'
import { useQueryState } from 'nuqs'
import { cn } from '@/utilities/ui'

type AnimalFilterProps = {
  labels: {
    all: string
    kedi: string
    kopek: string
  }
}

const FILTER_OPTIONS = [
  { value: '', labelKey: 'all' as const },
  { value: 'kedi', labelKey: 'kedi' as const },
  { value: 'kopek', labelKey: 'kopek' as const },
]

export function AnimalFilter({ labels }: AnimalFilterProps) {
  const [type, setType] = useQueryState('type', { defaultValue: '' })

  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setType(option.value || null)}
          aria-pressed={type === option.value}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
            type === option.value
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
