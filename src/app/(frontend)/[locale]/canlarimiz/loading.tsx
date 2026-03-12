import React from 'react'
import { AnimalCardSkeleton } from '@/modules/animals/components/skeletons/AnimalCardSkeleton'

export default function AnimalsLoading() {
  return (
    <div className="sys-wrap">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8 border-b border-border pb-6">
          <div className="h-10 w-48 animate-pulse bg-muted" />
          <div className="mt-2 h-4 w-72 animate-pulse bg-muted" />
        </div>

        {/* Filter skeleton */}
        <div className="mb-8 flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-7 w-20 animate-pulse border border-muted bg-muted" />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-background">
              <AnimalCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
