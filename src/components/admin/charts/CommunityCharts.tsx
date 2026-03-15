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
  Legend,
  Tooltip,
} from 'recharts'
import { AdminChartContainer } from './AdminChartContainer'
import type { AdminChartConfig } from './AdminChartContainer'
import type { StatusBreakdown } from './types'
import { ChartCard } from './ChartCard'
import { CHART_COLORS } from './chart-colors'

interface CommunityChartsProps {
  volunteerStatuses: StatusBreakdown[]
  eventTypes: StatusBreakdown[]
  vetRecordTypes: StatusBreakdown[]
  needsUrgency: StatusBreakdown[]
}

const volunteerConfig: AdminChartConfig = {
  beklemede: { label: 'Beklemede', color: CHART_COLORS.beklemede },
  onaylandi: { label: 'Onaylandı', color: CHART_COLORS.onaylandi },
  reddedildi: { label: 'Reddedildi', color: CHART_COLORS.reddedildi },
}

const eventConfig: AdminChartConfig = {
  sahiplendirme: { label: 'Sahiplendirme', color: CHART_COLORS.sahiplendirme },
  'mama-toplama': { label: 'Mama Toplama', color: CHART_COLORS['mama-toplama'] },
  'bakim-gunu': { label: 'Bakım Günü', color: CHART_COLORS['bakim-gunu'] },
  egitim: { label: 'Eğitim', color: CHART_COLORS.egitim },
  diger: { label: 'Diğer', color: CHART_COLORS.diger },
}

const vetConfig: AdminChartConfig = {
  muayene: { label: 'Muayene', color: CHART_COLORS.muayene },
  asi: { label: 'Aşı', color: CHART_COLORS.asi },
  kisirlastirma: { label: 'Kısırlaştırma', color: CHART_COLORS.kisirlastirma },
  ameliyat: { label: 'Ameliyat', color: CHART_COLORS.ameliyat },
  tedavi: { label: 'Tedavi', color: CHART_COLORS.tedavi },
  kontrol: { label: 'Kontrol', color: CHART_COLORS.kontrol },
}

const needsConfig: AdminChartConfig = {
  acil: { label: 'Acil', color: CHART_COLORS['acil-needs'] },
  orta: { label: 'Orta', color: CHART_COLORS.orta },
  yeterli: { label: 'Yeterli', color: CHART_COLORS.yeterli },
}

function hasValues(data: StatusBreakdown[]) {
  return data.some((d) => d.value > 0)
}

export const CommunityCharts: React.FC<CommunityChartsProps> = ({
  volunteerStatuses,
  eventTypes,
  vetRecordTypes,
  needsUrgency,
}) => {
  return (
    <>
      <ChartCard title="Gönüllü Başvuruları" description="Başvuru durumları" isEmpty={!hasValues(volunteerStatuses)}>
        <AdminChartContainer config={volunteerConfig} style={{ height: 200 }}>
          <PieChart>
            <Tooltip />
            <Pie
              data={volunteerStatuses}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              strokeWidth={2}
            >
              {volunteerStatuses.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </AdminChartContainer>
      </ChartCard>

      <ChartCard title="Etkinlik Türleri" description="Türe göre dağılım" isEmpty={!hasValues(eventTypes)}>
        <AdminChartContainer config={eventConfig} style={{ height: 200 }}>
          <BarChart data={eventTypes}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {eventTypes.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </AdminChartContainer>
      </ChartCard>

      <ChartCard title="Veteriner İşlemleri" description="İşlem türleri" isEmpty={!hasValues(vetRecordTypes)}>
        <AdminChartContainer config={vetConfig} style={{ height: 200 }}>
          <PieChart>
            <Tooltip />
            <Pie
              data={vetRecordTypes}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              strokeWidth={2}
            >
              {vetRecordTypes.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </AdminChartContainer>
      </ChartCard>

      <ChartCard title="İhtiyaç Aciliyeti" description="Stok durumu" isEmpty={!hasValues(needsUrgency)}>
        <AdminChartContainer config={needsConfig} style={{ height: 200 }}>
          <PieChart>
            <Tooltip />
            <Pie
              data={needsUrgency}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              strokeWidth={2}
            >
              {needsUrgency.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </AdminChartContainer>
      </ChartCard>
    </>
  )
}
