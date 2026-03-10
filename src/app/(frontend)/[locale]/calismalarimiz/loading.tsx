import React from 'react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Skeleton } from '@/components/ui/skeleton'

export default function OurWorkLoading() {
  return (
    <Section padding="lg">
      <Container>
        <div className="mb-8 text-center space-y-3">
          <Skeleton className="mx-auto h-10 w-56" />
          <Skeleton className="mx-auto h-5 w-80" />
        </div>
        <div className="space-y-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-96" />
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="aspect-[4/3] rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
