import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function OurWorkLoading() {
  return (
    <>
      {/* Breadcrumb skeleton */}
      <div className="panel px-4 md:px-8 py-3">
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="sys-wrap">
        {/* Hero skeleton */}
        <div className="panel bg-health/20 py-8 px-6 lg:py-12 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1 space-y-4">
              <Skeleton className="h-14 w-80 md:h-20 md:w-[500px]" />
              <Skeleton className="h-5 w-96 max-w-full" />
            </div>
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-1 w-24 mt-4" />
        </div>

        {/* Stats section header skeleton */}
        <div className="panel py-4 px-6">
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Stats grid skeleton (6 cards) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6" style={{ gap: '1.5px', background: 'var(--palette-black)' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-muted h-40 md:h-48 p-4 flex flex-col justify-between">
              <Skeleton className="h-3 w-8" />
              <div>
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-3 w-24 mt-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Divider band skeleton */}
        <Skeleton className="h-10 w-full" />

        {/* Activity showcase section header */}
        <div className="panel py-4 px-6">
          <Skeleton className="h-8 w-44" />
        </div>

        {/* Activity showcase skeleton (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1.5px', background: 'var(--palette-black)' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-background p-6 space-y-4">
              <Skeleton className="h-14 w-14" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="aspect-[4/3] w-full" />
            </div>
          ))}
        </div>

        {/* Process section header */}
        <div className="panel py-4 px-6">
          <Skeleton className="h-8 w-48" />
        </div>

        {/* Process timeline skeleton (4 steps) */}
        <div className="panel px-6 py-8">
          <div className="grid gap-6 md:grid-cols-4 md:gap-[1.5px] md:bg-border">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-background p-6 space-y-4">
                <Skeleton className="h-14 w-16" />
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Activity detail rows skeleton (3 rows) */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-b-[1.5px] border-border">
            <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
              <div className={`flex flex-col gap-8 md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="space-y-[1.5px] md:w-[55%]">
                  <Skeleton className="aspect-[3/2] w-full" />
                  <div className="grid grid-cols-2 gap-[1.5px]">
                    <Skeleton className="aspect-[4/3]" />
                    <Skeleton className="aspect-[4/3]" />
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-4 md:w-[45%]">
                  <Skeleton className="h-12 w-12" />
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-20 w-full max-w-md" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* FAQ section header */}
        <div className="panel py-4 px-6">
          <Skeleton className="h-8 w-48" />
        </div>

        {/* FAQ skeleton */}
        <div className="panel px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block lg:w-1/3">
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="lg:w-2/3 space-y-0 border border-border">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`p-4 ${i > 0 ? 'border-t border-border' : ''}`}>
                  <Skeleton className="h-5 w-full max-w-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA skeleton */}
        <div className="panel bg-cta/20 py-10 px-6 lg:py-14">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
            <Skeleton className="h-14 w-80" />
            <Skeleton className="h-5 w-96 max-w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-36" />
              <Skeleton className="h-12 w-36" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
