import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function AnimalDetailSkeleton() {
  return (
    <div className="container py-8">
      <Skeleton className="mb-6 h-5 w-48" />
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: hero + gallery */}
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>
        {/* Right: sidebar */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      {/* Story + Needs */}
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}
