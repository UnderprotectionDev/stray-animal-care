'use client'

import React from 'react'
import { StatCard, type StatItem } from '@/components/shared/StatCard'
import { CountUpCurrency } from '@/components/home/CountUpCurrency'
import { CountUpNumber } from '@/components/home/CountUpNumber'

type Props = {
  stats: (StatItem & { isCurrency?: boolean })[]
}

function renderValue(stat: StatItem) {
  if (stat.isCurrency) return <CountUpCurrency value={stat.value} />
  return <CountUpNumber target={stat.value} />
}

export function TransparencyStats({ stats }: Props) {
  if (stats.length === 0) return null

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1.5px]">
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
