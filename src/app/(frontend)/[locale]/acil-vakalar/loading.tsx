import React from 'react'
import { EmergencyCardSkeleton } from '@/modules/emergency/components/skeletons/EmergencyCardSkeleton'

export default function EmergencyLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-10 border-b border-border pb-4">
          <div className="h-10 w-64 bg-muted animate-pulse" />
        </div>
        <div className="mb-6">
          <div className="h-7 w-40 bg-muted animate-pulse border-b border-border pb-2" />
        </div>
        <div className="grid gap-px bg-foreground sm:grid-cols-2 lg:grid-cols-3 border border-border">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-background">
              <EmergencyCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
