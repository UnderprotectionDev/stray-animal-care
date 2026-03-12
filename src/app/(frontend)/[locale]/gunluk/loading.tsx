import React from 'react'
import { Container } from '@/components/shared/Container'

export default function BlogLoading() {
  return (
    <Container>
      <div className="sys-wrap my-8">
        <div className="panel p-8 text-center space-y-3">
          <div className="mx-auto h-10 w-40 bg-muted border border-border" />
          <div className="mx-auto h-5 w-72 bg-muted border border-border" />
        </div>
        <div className="panel p-4 flex justify-center gap-[1px] bg-foreground">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-muted" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-[1px] bg-foreground md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-background border border-border">
              <div className="aspect-video w-full bg-muted" />
              <div className="border-t border-border p-4 space-y-2">
                <div className="h-5 w-3/4 bg-muted" />
                <div className="h-4 w-1/3 bg-muted" />
                <div className="h-4 w-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
