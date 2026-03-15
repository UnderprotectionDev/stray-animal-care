'use client'

import React from 'react'
import { useQueryState } from 'nuqs'

type FilterOption<K extends string> = {
  value: string
  labelKey: K
}

type FilterButtonsProps<K extends string> = {
  paramName: string
  options: FilterOption<K>[]
  labels: Record<K, string>
  className?: string
}

export function FilterButtons<K extends string>({
  paramName,
  options,
  labels,
  className = 'flex flex-wrap gap-2',
}: FilterButtonsProps<K>) {
  const [current, setCurrent] = useQueryState(paramName, { defaultValue: '' })

  return (
    <div className={className}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setCurrent(option.value || null)}
          aria-pressed={current === option.value}
          className={
            current === option.value
              ? 'badge-sys cta'
              : 'badge-sys'
          }
        >
          {labels[option.labelKey]}
        </button>
      ))}
    </div>
  )
}
