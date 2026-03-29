'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { StatCard, type StatItem } from '@/components/shared/StatCard'

const CountUp = dynamic(() => import('@/components/CountUp'), { ssr: false })

type Props = {
  stats: (StatItem & { suffix: string })[]
}

function renderValue(stat: StatItem & { suffix?: string }) {
  return (
    <>
      <CountUp to={stat.value} from={0} duration={2} />
      <span>{stat.suffix}</span>
    </>
  )
}

export function SuppliesStats({ stats }: Props) {
  if (stats.length === 0) return null

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: '1.5px', background: 'var(--palette-black)' }}
    >
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          stat={stat}
          index={i}
          hoverStat={stats[(i + 1) % stats.length]}
          renderValue={renderValue}
        />
      ))}
    </div>
  )
}
