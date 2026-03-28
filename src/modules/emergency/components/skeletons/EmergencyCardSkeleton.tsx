import React from 'react'

export function EmergencyCardSkeleton() {
  return (
    <div className="border border-border/40 bg-background animate-pulse">
      {/* Image area */}
      <div className="relative aspect-[3/2] bg-muted">
        <div className="absolute top-3 left-3 h-5 w-14 bg-foreground/10" />
      </div>

      {/* Accent stripe */}
      <div className="h-[2px] bg-foreground/10" />

      {/* Content area */}
      <div className="px-4 pt-3 pb-4 space-y-2.5">
        <div className="space-y-1">
          <div className="h-2.5 w-16 bg-foreground/10" />
          <div className="h-4 w-3/4 bg-foreground/10" />
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-foreground/10" />
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-28 bg-foreground/10" />
            <div className="h-2.5 w-8 bg-foreground/10" />
          </div>
        </div>
        <div className="h-3 w-20 bg-foreground/10" />
      </div>
    </div>
  )
}
