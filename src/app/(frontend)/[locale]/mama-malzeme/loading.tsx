import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function SuppliesLoading() {
  return (
    <>
      {/* Breadcrumb skeleton */}
      <div className="panel px-4 md:px-8 py-3">
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="sys-wrap">
        {/* Hero skeleton */}
        <div className="panel bg-emergency/20 py-8 px-6 lg:py-12 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1 space-y-4">
              <Skeleton className="h-14 w-80 md:h-20 md:w-[500px]" />
              <Skeleton className="h-5 w-96 max-w-full" />
            </div>
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-1 w-24 mt-4" />
        </div>

        {/* Stats section header */}
        <div className="panel py-4 px-6">
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted h-40 md:h-48 p-4 flex flex-col justify-between">
              <Skeleton className="h-3 w-8" />
              <div>
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-3 w-24 mt-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Divider skeleton */}
        <Skeleton className="h-10 w-full" />

        {/* Needs section header */}
        <div className="panel py-4 px-6">
          <Skeleton className="h-8 w-44" />
        </div>

        {/* Needs grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-background p-6 space-y-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>

        {/* Shipping section header */}
        <div className="panel py-4 px-6">
          <Skeleton className="h-8 w-48" />
        </div>

        {/* Shipping grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-background p-6 space-y-4">
              <Skeleton className="h-14 w-14" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>

        {/* CTA skeleton */}
        <div className="panel bg-warm/20 py-10 px-6 lg:py-14">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
            <Skeleton className="h-14 w-80" />
            <Skeleton className="h-5 w-96 max-w-full" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>
    </>
  )
}
