import React from 'react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimalCardSkeleton } from '@/modules/animals/components/skeletons/AnimalCardSkeleton'

export default function AnimalsLoading() {
  return (
    <Section padding="lg">
      <Container>
        <div className="mb-8 text-center space-y-3">
          <Skeleton className="mx-auto h-10 w-48" />
          <Skeleton className="mx-auto h-5 w-72" />
        </div>
        <div className="mb-8 flex justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <AnimalCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
