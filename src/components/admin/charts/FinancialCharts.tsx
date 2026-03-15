'use client'

import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Tooltip,
  Legend,
} from 'recharts'
import { AdminChartContainer } from './AdminChartContainer'
import type { AdminChartConfig } from './AdminChartContainer'
import type { MonthlyFinancial, FundraisingItem } from './types'
import { ChartCard } from './ChartCard'
import { CHART_COLORS } from './chart-colors'

interface FinancialChartsProps {
  monthly: MonthlyFinancial[]
  fundraising: FundraisingItem[]
}

const financialConfig: AdminChartConfig = {
  donation: { label: 'Bağış', color: CHART_COLORS.donation },
  expense: { label: 'Gider', color: CHART_COLORS.expense },
}

const fundraisingConfig: AdminChartConfig = {
  collected: { label: 'Toplanan', color: CHART_COLORS.onaylandi },
  remaining: { label: 'Kalan', color: CHART_COLORS.darkCream },
}

const currencyFormatter = (value: number) => `₺${value.toLocaleString('tr-TR')}`

export const FinancialCharts: React.FC<FinancialChartsProps> = ({ monthly, fundraising }) => {
  const fundraisingData = fundraising.map((item) => ({
    name: item.name.length > 20 ? item.name.slice(0, 20) + '…' : item.name,
    collected: item.collected,
    remaining: Math.max(0, item.target - item.collected),
    target: item.target,
  }))

  return (
    <>
      <ChartCard
        title="Aylık Bağış & Gider"
        description="Şeffaflık raporlarından"
        isEmpty={monthly.length === 0}
      >
        <AdminChartContainer config={financialConfig} style={{ height: 260 }}>
          <AreaChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₺${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
            <Tooltip formatter={currencyFormatter} />
            <Legend />
            <Area
              type="monotone"
              dataKey="donation"
              name="Bağış"
              stackId="1"
              stroke={CHART_COLORS.donation}
              fill={CHART_COLORS.donation}
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Gider"
              stackId="2"
              stroke={CHART_COLORS.expense}
              fill={CHART_COLORS.expense}
              fillOpacity={0.3}
            />
          </AreaChart>
        </AdminChartContainer>
      </ChartCard>

      <ChartCard
        title="Bağış Hedefleri"
        description="Aktif acil vakalar"
        isEmpty={fundraisingData.length === 0}
      >
        <AdminChartContainer config={fundraisingConfig} style={{ height: 260 }}>
          <BarChart data={fundraisingData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `₺${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
            />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
            <Tooltip formatter={currencyFormatter} />
            <Bar dataKey="collected" name="Toplanan" stackId="a" fill={CHART_COLORS.onaylandi} radius={[0, 0, 0, 0]} />
            <Bar dataKey="remaining" name="Kalan" stackId="a" fill={CHART_COLORS.darkCream} radius={[0, 4, 4, 0]} />
          </BarChart>
        </AdminChartContainer>
      </ChartCard>
    </>
  )
}
