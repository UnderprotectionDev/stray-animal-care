import React from 'react'

export function AnimalCardSkeleton() {
  return (
    <div className="border border-border bg-background">
      <div className="aspect-square w-full animate-pulse bg-muted" />
      <div className="border-t border-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="h-3 w-20 animate-pulse bg-muted" />
          <div className="h-4 w-14 animate-pulse bg-muted" />
        </div>
        <div className="px-3 py-2">
          <div className="h-3 w-12 animate-pulse bg-muted" />
        </div>
      </div>
    </div>
  )
}
