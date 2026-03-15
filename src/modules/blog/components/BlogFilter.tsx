'use client'

import React from 'react'
import { FilterButtons } from '@/components/shared/FilterButtons'

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
  return (
    <FilterButtons
      paramName="category"
      options={FILTER_OPTIONS}
      labels={labels}
      className="flex flex-wrap gap-[1px] bg-foreground border border-border"
    />
  )
}
