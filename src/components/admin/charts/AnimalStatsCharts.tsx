'use client'

import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
} from 'recharts'
import { AdminChartContainer } from './AdminChartContainer'
import type { AdminChartConfig } from './AdminChartContainer'
import type { AnimalTypeDistribution, AnimalStatusDistribution, VaccinationRates } from './types'
import { ChartCard } from './ChartCard'
import { CHART_COLORS } from './chart-colors'

interface AnimalStatsChartsProps {
  types: AnimalTypeDistribution[]
  statuses: AnimalStatusDistribution[]
  vaccination: VaccinationRates
}

const typeConfig: AdminChartConfig = {
  kedi: { label: 'Kedi', color: CHART_COLORS.kedi },
  kopek: { label: 'Köpek', color: CHART_COLORS.kopek },
}

const statusConfig: AdminChartConfig = {
  tedavide: { label: 'Tedavide', color: CHART_COLORS.tedavide },
  'kalici-bakim': { label: 'Kalıcı Bakım', color: CHART_COLORS['kalici-bakim'] },
  acil: { label: 'Acil', color: CHART_COLORS.acil },
}

const vaccinationConfig: AdminChartConfig = {
  vaccinated: { label: 'Aşılı', color: CHART_COLORS.asi },
  spayed: { label: 'Kısır', color: CHART_COLORS.tedavide },
}

export const AnimalStatsCharts: React.FC<AnimalStatsChartsProps> = ({
  types,
  statuses,
  vaccination,
}) => {
  const totalTypes = types.reduce((sum, t) => sum + t.value, 0)
  const totalStatuses = statuses.reduce((sum, s) => sum + s.value, 0)

  const radialData = [
    {
      name: 'Aşılı',
      value: vaccination.total > 0 ? Math.round((vaccination.vaccinated / vaccination.total) * 100) : 0,
      fill: CHART_COLORS.asi,
    },
    {
      name: 'Kısır',
      value: vaccination.total > 0 ? Math.round((vaccination.spayed / vaccination.total) * 100) : 0,
      fill: CHART_COLORS.tedavide,
    },
  ]

  return (
    <>
      <ChartCard title="Tür Dağılımı" description="Kedi / Köpek oranı" isEmpty={totalTypes === 0}>
        <AdminChartContainer config={typeConfig} style={{ height: 220 }}>
          <PieChart>
            <Tooltip />
            <Pie
              data={types}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={2}
            >
              {types.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </AdminChartContainer>
      </ChartCard>

      <ChartCard title="Durum Dağılımı" description="Hayvan durumları" isEmpty={totalStatuses === 0}>
        <AdminChartContainer config={statusConfig} style={{ height: 220 }}>
          <BarChart data={statuses}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {statuses.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </AdminChartContainer>
      </ChartCard>

      <ChartCard
        title="Sağlık Oranları"
        description="Aşılama & kısırlaştırma %"
        isEmpty={vaccination.total === 0}
      >
        <AdminChartContainer config={vaccinationConfig} style={{ height: 220 }}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="90%"
            data={radialData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              dataKey="value"
              background
              cornerRadius={6}
            />
            <Legend
              iconSize={10}
              formatter={(value, _entry) => {
                const item = radialData.find((d) => d.name === value)
                return `${value}: %${item?.value ?? 0}`
              }}
            />
          </RadialBarChart>
        </AdminChartContainer>
      </ChartCard>
    </>
  )
}
