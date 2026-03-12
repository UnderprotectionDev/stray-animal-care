'use client'

import React from 'react'
import { useQueryState } from 'nuqs'

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
          className={
            type === option.value
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
