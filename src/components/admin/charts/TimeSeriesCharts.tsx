'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { AdminChartContainer } from './AdminChartContainer'
import type { AdminChartConfig } from './AdminChartContainer'
import type { MonthlyTrend } from './types'
import { ChartCard } from './ChartCard'
import { CHART_COLORS } from './chart-colors'

interface TimeSeriesChartsProps {
  data: MonthlyTrend[]
}

const trendConfig: AdminChartConfig = {
  animals: { label: 'Hayvanlar', color: CHART_COLORS.trendAnimals },
  posts: { label: 'Yazılar', color: CHART_COLORS.trendPosts },
  volunteers: { label: 'Gönüllüler', color: CHART_COLORS.trendVolunteers },
}

export const TimeSeriesCharts: React.FC<TimeSeriesChartsProps> = ({ data }) => {
  const hasData = data.some((d) => d.animals > 0 || d.posts > 0 || d.volunteers > 0)

  return (
    <ChartCard
      title="Son 12 Ay Trendleri"
      description="Aylık yeni hayvan, yazı ve gönüllü başvuruları"
      isEmpty={!hasData}
    >
      <AdminChartContainer config={trendConfig} style={{ height: 300 }}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="animals"
            name="Hayvanlar"
            stroke={CHART_COLORS.trendAnimals}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="posts"
            name="Yazılar"
            stroke={CHART_COLORS.trendPosts}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="volunteers"
            name="Gönüllüler"
            stroke={CHART_COLORS.trendVolunteers}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </AdminChartContainer>
    </ChartCard>
  )
}
