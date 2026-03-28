import React from 'react'
import { Container } from '@/components/shared/Container'

export default function BlogLoading() {
  return (
    <Container>
      <div className="my-8 space-y-6">
        <div className="space-y-3">
          <div className="h-10 w-40 bg-muted animate-pulse" />
          <div className="h-5 w-72 bg-muted animate-pulse" />
        </div>
        <div className="flex gap-2 border-b border-border/20 pb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-20 bg-muted animate-pulse" />
          ))}
        </div>
        {/* Featured card skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border/20 overflow-hidden">
          <div className="aspect-[16/10] md:aspect-auto md:min-h-[320px] bg-muted animate-pulse" />
          <div className="p-6 space-y-3">
            <div className="h-4 w-24 bg-muted animate-pulse" />
            <div className="h-7 w-3/4 bg-muted animate-pulse" />
            <div className="h-4 w-full bg-muted animate-pulse" />
            <div className="h-4 w-2/3 bg-muted animate-pulse" />
          </div>
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-border/20 overflow-hidden">
              <div className="aspect-[4/3] bg-muted animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-24 bg-muted animate-pulse" />
                <div className="h-5 w-3/4 bg-muted animate-pulse" />
                <div className="h-4 w-full bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
