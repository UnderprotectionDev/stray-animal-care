'use client'

import React from 'react'
import { useQueryState } from 'nuqs'
import { AnimalCard } from './AnimalCard'
import type { Animal } from '@/payload-types'

type AnimalListProps = {
  animals: Animal[]
  labels: {
    typeLabels: Record<string, string>
    statusLabels: Record<string, string>
    noResults: string
  }
}

export function AnimalList({ animals, labels }: AnimalListProps) {
  const [type] = useQueryState('type', { defaultValue: '' })

  const filtered = type ? animals.filter((a) => a.type === type) : animals

  if (filtered.length === 0) {
    return (
      <div className="border border-border bg-background px-6 py-16 text-center">
        <span className="t-meta">{labels.noResults}</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground">
      {filtered.map((animal) => (
        <div key={animal.id} className="bg-background">
          <AnimalCard
            animal={animal}
            typeLabel={labels.typeLabels[animal.type] ?? animal.type}
            statusLabel={animal.animalStatus ? (labels.statusLabels[animal.animalStatus] ?? animal.animalStatus) : ''}
          />
        </div>
      ))}
    </div>
  )
}
