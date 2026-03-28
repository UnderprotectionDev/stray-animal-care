import React from 'react'
import { EmergencyCardSkeleton } from '@/modules/emergency/components/skeletons/EmergencyCardSkeleton'

export default function EmergencyLoading() {
  return (
    <>
      {/* Breadcrumb skeleton */}
      <div className="panel px-4 md:px-8 py-3">
        <div className="h-5 w-48 bg-muted animate-pulse" />
      </div>

      <div className="sys-wrap">
        {/* Hero skeleton */}
        <div className="bg-emergency/20 p-6 py-8 lg:py-12 lg:px-8 animate-pulse">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="h-6 w-16 bg-foreground/10" />
              <div className="h-12 w-72 bg-foreground/10" />
              <div className="h-5 w-96 max-w-full bg-foreground/10" />
            </div>
            <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
              <div className="h-8 w-32 bg-foreground/10" />
              <div className="h-8 w-40 bg-foreground/10" />
            </div>
          </div>
        </div>

        {/* Divider skeleton */}
        <div className="h-10 bg-foreground animate-pulse" />

        {/* Section header skeleton */}
        <div className="panel py-5 px-6 lg:px-8 border-b-[1.5px] border-border animate-pulse">
          <div className="h-10 w-56 bg-foreground/10" />
        </div>

        {/* Cards grid skeleton */}
        <div className="panel px-4 py-6 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <EmergencyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
