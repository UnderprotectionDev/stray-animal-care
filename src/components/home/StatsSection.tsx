import React from 'react'
import type { SiteSetting } from '@/payload-types'

type StatsBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeStats' }>

type Props = {
  block: StatsBlock
}

export function StatsSection({ block }: Props) {
  const metrics = block.metrics ?? []
  if (metrics.length === 0) return null

  return (
    <section className="bg-black">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {metrics.map((metric, i) => (
          <div
            key={metric.id || i}
            className={`px-6 py-8 md:py-12 text-center ${
              i < metrics.length - 1 ? 'md:border-r md:border-white/20' : ''
            } ${i < 2 ? 'border-b md:border-b-0 border-white/20' : ''}`}
          >
            <span
              className="t-mega block text-[var(--accent)]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
            >
              {metric.value}
            </span>
            <span className="t-meta font-bold uppercase block mt-3 text-white">{metric.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
