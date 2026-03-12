import React from 'react'

export function AnimalDetailSkeleton() {
  return (
    <div className="sys-wrap">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 h-4 w-48 animate-pulse bg-muted" />

        {/* 8-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-8 border border-border">
          {/* Left: photo area — 5 cols */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border">
            <div className="aspect-[4/3] w-full animate-pulse bg-muted" />
            <div className="grid grid-cols-4 gap-px bg-foreground border-t border-border">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse bg-muted" />
              ))}
            </div>
          </div>

          {/* Right: info panel — 3 cols */}
          <div className="lg:col-span-3 bg-background">
            <div className="border-b border-border px-4 py-4 space-y-2">
              <div className="h-5 w-16 animate-pulse bg-muted" />
              <div className="h-8 w-3/4 animate-pulse bg-muted" />
            </div>
            <div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between border-b border-border px-4 py-3">
                  <div className="h-3 w-16 animate-pulse bg-muted" />
                  <div className="h-3 w-20 animate-pulse bg-muted" />
                </div>
              ))}
            </div>
            <div className="p-4 space-y-3">
              <div className="h-12 w-full animate-pulse bg-muted" />
              <div className="h-12 w-full animate-pulse bg-muted" />
            </div>
          </div>
        </div>

        {/* Story + Needs */}
        <div className="mt-8 grid md:grid-cols-2 border border-border">
          <div className="border-b md:border-b-0 md:border-r border-border p-6 space-y-3">
            <div className="h-6 w-32 animate-pulse bg-muted" />
            <div className="h-4 w-full animate-pulse bg-muted" />
            <div className="h-4 w-full animate-pulse bg-muted" />
            <div className="h-4 w-3/4 animate-pulse bg-muted" />
          </div>
          <div className="p-6 space-y-3">
            <div className="h-6 w-32 animate-pulse bg-muted" />
            <div className="h-4 w-full animate-pulse bg-muted" />
            <div className="h-4 w-2/3 animate-pulse bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}
