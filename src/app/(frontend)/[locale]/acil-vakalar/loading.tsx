import React from 'react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Skeleton } from '@/components/ui/skeleton'
import { EmergencyCardSkeleton } from '@/modules/emergency/components/skeletons/EmergencyCardSkeleton'

export default function EmergencyLoading() {
  return (
    <Section padding="lg">
      <Container>
        <div className="mb-8 text-center">
          <Skeleton className="mx-auto h-10 w-48" />
        </div>
        <Skeleton className="mb-6 h-8 w-36" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <EmergencyCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
