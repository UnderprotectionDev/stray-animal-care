import React from 'react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Skeleton } from '@/components/ui/skeleton'

export default function TransparencyLoading() {
  return (
    <Section padding="lg">
      <Container>
        <div className="mb-8 text-center space-y-3">
          <Skeleton className="mx-auto h-10 w-64" />
          <Skeleton className="mx-auto h-5 w-80" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </Container>
    </Section>
  )
}
