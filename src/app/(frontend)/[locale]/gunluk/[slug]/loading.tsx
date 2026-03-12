import React from 'react'
import { Container } from '@/components/shared/Container'

export default function BlogPostLoading() {
  return (
    <Container>
      <div className="sys-wrap my-8">
        <div className="aspect-video w-full bg-muted border border-border" />
        <div className="panel p-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex gap-3">
              <div className="h-6 w-20 bg-muted border border-border" />
              <div className="h-6 w-32 bg-muted border border-border" />
            </div>
            <div className="h-12 w-3/4 bg-muted border border-border" />
            <div className="space-y-3 pt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-muted border border-border" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
