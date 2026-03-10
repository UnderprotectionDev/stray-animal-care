import React from 'react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <Section padding="lg">
      <Container>
        <div className="mb-8 text-center space-y-3">
          <Skeleton className="mx-auto h-10 w-40" />
          <Skeleton className="mx-auto h-5 w-72" />
        </div>
        <div className="mb-8 flex justify-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-lg border overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="space-y-2 p-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
