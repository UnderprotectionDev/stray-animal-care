'use client'

import React from 'react'
import { FilterButtons } from '@/components/shared/FilterButtons'

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
  return (
    <FilterButtons
      paramName="type"
      options={FILTER_OPTIONS}
      labels={labels}
    />
  )
}
