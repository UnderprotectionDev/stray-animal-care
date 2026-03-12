import React from 'react'

export default function EmergencyCaseLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="h-5 w-64 bg-muted animate-pulse mb-6" />
        <div className="grid gap-0 lg:grid-cols-8 border border-border mt-6">
          <div className="lg:col-span-5 border-r border-border">
            <div className="aspect-video w-full bg-muted animate-pulse border-b border-border" />
            <div className="p-6 space-y-3 border-b border-border">
              <div className="h-6 w-40 bg-muted animate-pulse" />
              <div className="h-4 w-full bg-muted animate-pulse" />
              <div className="h-4 w-full bg-muted animate-pulse" />
              <div className="h-4 w-3/4 bg-muted animate-pulse" />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="p-6 border-b border-border space-y-3">
              <div className="h-6 w-20 bg-muted animate-pulse" />
              <div className="h-8 w-3/4 bg-muted animate-pulse" />
            </div>
            <div className="p-6 border-b border-border space-y-3">
              <div className="h-4 w-full border border-border bg-muted" />
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-muted animate-pulse" />
                <div className="h-4 w-24 bg-muted animate-pulse" />
              </div>
            </div>
            <div className="p-6">
              <div className="h-10 w-full bg-accent/30 border border-border animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
