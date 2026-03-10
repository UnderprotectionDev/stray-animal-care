import React from 'react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Skeleton } from '@/components/ui/skeleton'

export default function SuppliesLoading() {
  return (
    <Section padding="lg">
      <Container>
        <div className="mb-8 text-center space-y-3">
          <Skeleton className="mx-auto h-10 w-64" />
          <Skeleton className="mx-auto h-5 w-80" />
        </div>
        <div className="space-y-3 rounded-lg border p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </Container>
    </Section>
  )
}
