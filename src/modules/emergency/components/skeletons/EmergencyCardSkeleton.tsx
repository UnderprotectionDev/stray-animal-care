import React from 'react'

export function EmergencyCardSkeleton() {
  return (
    <div className="border border-border bg-background">
      <div className="aspect-video w-full bg-muted animate-pulse" />
      <div className="p-4 space-y-3 border-t border-border">
        <div className="h-5 w-full bg-muted animate-pulse" />
        <div className="h-5 w-4/5 bg-muted animate-pulse" />
        <div className="h-3 w-full border border-border bg-muted" />
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-muted animate-pulse" />
          <div className="h-4 w-24 bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  )
}
