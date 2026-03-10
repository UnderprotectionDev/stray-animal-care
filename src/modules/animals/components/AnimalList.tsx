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
      <div className="py-16 text-center text-muted-foreground">
        {labels.noResults}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filtered.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          typeLabel={labels.typeLabels[animal.type] ?? animal.type}
          statusLabel={animal.animalStatus ? (labels.statusLabels[animal.animalStatus] ?? animal.animalStatus) : ''}
        />
      ))}
    </div>
  )
}
