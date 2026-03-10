import React from 'react'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogPostLoading() {
  return (
    <>
      <Skeleton className="aspect-video w-full" />
      <Section padding="md">
        <Container size="md">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-12 w-3/4" />
            <div className="space-y-3 pt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
