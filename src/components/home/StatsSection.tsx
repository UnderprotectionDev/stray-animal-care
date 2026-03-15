'use client'

import React from 'react'
import type { SiteSetting } from '@/payload-types'
import CountUp from '@/components/CountUp'

type StatsBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeStats' }>

type Props = {
  block: StatsBlock
}

function parseStatValue(value: string) {
  const match = value.match(/^(0*)(\d+\.?\d*)\s*(.*)$/)
  if (!match) return { prefix: '', numericValue: 0, suffix: value }
  return {
    prefix: match[1],
    numericValue: parseFloat(match[2]),
    suffix: match[3],
  }
}

export function StatsSection({ block }: Props) {
  const metrics = block.metrics ?? []
  if (metrics.length === 0) return null

  return (
    <section className="bg-stats text-stats-foreground">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {metrics.map((metric, i) => {
          const { prefix, numericValue, suffix } = parseStatValue(metric.value ?? '')
          return (
            <div
              key={metric.id || i}
              className={`px-6 py-8 md:py-12 text-center ${
                i < metrics.length - 1 ? 'md:border-r md:border-palette-cream/20' : ''
              } ${i < 2 ? 'border-b md:border-b-0 border-palette-cream/20' : ''}`}
            >
              <span
                className="t-mega block text-palette-cream"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
              >
                {prefix && <span>{prefix}</span>}
                <CountUp to={numericValue} from={0} duration={2} />
                {suffix && <span>{suffix}</span>}
              </span>
              <span className="t-comment block mt-3 text-palette-cream/70">{metric.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
