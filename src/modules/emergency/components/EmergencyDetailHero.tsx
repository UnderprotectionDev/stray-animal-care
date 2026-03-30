'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { FloatingPaws } from '@/components/shared/FloatingPaws'

const BlurText = dynamic(() => import('@/components/BlurText'), { ssr: false })
const DotGridBackground = dynamic(
  () =>
    import('@/components/home/DotGridBackground').then(
      (mod) => mod.DotGridBackground,
    ),
  { ssr: false },
)

type EmergencyDetailHeroProps = {
  title: string
  isActive: boolean
  statusLabel: string
  excerpt?: string | null
  breadcrumbItems: { label: string; href?: string }[]
}

export function EmergencyDetailHero({
  title,
  isActive,
  statusLabel,
  excerpt,
  breadcrumbItems,
}: EmergencyDetailHeroProps) {
  return (
    <div className="relative overflow-hidden px-4 py-8 md:px-6 md:py-10 lg:px-8 bg-emergency text-emergency-foreground">
      <DotGridBackground />
      <FloatingPaws color="var(--emergency-foreground)" />

      <div className="relative z-10 mx-auto max-w-5xl flex flex-col gap-3">
        <PageBreadcrumb items={breadcrumbItems} />

        <div className="flex items-center gap-3 mt-2">
          <StatusBadge status={isActive ? 'urgent' : 'completed'}>
            {statusLabel}
          </StatusBadge>
        </div>

        <h1 className="t-h1 leading-tight">{title}</h1>

        {excerpt && (
          <div className="opacity-75 max-w-2xl">
            <BlurText
              text={excerpt}
              tag="p"
              className="text-sm md:text-base leading-relaxed"
              animateBy="words"
              delay={40}
              stepDuration={0.25}
              direction="bottom"
              threshold={0.15}
            />
          </div>
        )}
      </div>
    </div>
  )
}
