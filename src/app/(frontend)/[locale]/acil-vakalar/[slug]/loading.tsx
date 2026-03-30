import React from 'react'

export default function EmergencyCaseLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="px-4 py-8 md:px-6 md:py-10 lg:px-8 bg-emergency/20">
        <div className="mx-auto max-w-5xl space-y-3">
          <div className="h-4 w-48 bg-muted animate-pulse" />
          <div className="h-6 w-20 bg-muted animate-pulse" />
          <div className="h-8 w-80 bg-muted animate-pulse" />
          <div className="h-4 w-64 bg-muted animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video w-full bg-muted animate-pulse" />
            <div className="panel space-y-3">
              <div className="h-6 w-40 bg-muted animate-pulse" />
              <div className="h-4 w-full bg-muted animate-pulse" />
              <div className="h-4 w-full bg-muted animate-pulse" />
              <div className="h-4 w-3/4 bg-muted animate-pulse" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-border/60 bg-background">
              <div className="p-5 space-y-3 border-b border-border/40">
                <div className="h-2 w-full bg-muted animate-pulse" />
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-muted animate-pulse" />
                  <div className="h-4 w-24 bg-muted animate-pulse" />
                </div>
              </div>
              <div className="p-5">
                <div className="h-10 w-full bg-emergency/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
