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

interface CommunityChartsProps {
  volunteerStatuses: StatusBreakdown[]
  eventTypes: StatusBreakdown[]
  vetRecordTypes: StatusBreakdown[]
  needsUrgency: StatusBreakdown[]
}

const volunteerConfig: AdminChartConfig = {
  beklemede: { label: 'Beklemede', color: '#eab308' },
  onaylandi: { label: 'Onaylandı', color: '#22c55e' },
  reddedildi: { label: 'Reddedildi', color: '#ef4444' },
}

const eventConfig: AdminChartConfig = {
  sahiplendirme: { label: 'Sahiplendirme', color: '#8b5cf6' },
  'mama-toplama': { label: 'Mama Toplama', color: '#14b8a6' },
  'bakim-gunu': { label: 'Bakım Günü', color: '#f59e0b' },
  egitim: { label: 'Eğitim', color: '#3b82f6' },
  diger: { label: 'Diğer', color: '#6b7280' },
}

const vetConfig: AdminChartConfig = {
  muayene: { label: 'Muayene', color: '#8b5cf6' },
  asi: { label: 'Aşı', color: '#22c55e' },
  kisirlastirma: { label: 'Kısırlaştırma', color: '#f59e0b' },
  ameliyat: { label: 'Ameliyat', color: '#ef4444' },
  tedavi: { label: 'Tedavi', color: '#3b82f6' },
  kontrol: { label: 'Kontrol', color: '#6b7280' },
}

const needsConfig: AdminChartConfig = {
  acil: { label: 'Acil', color: '#ef4444' },
  orta: { label: 'Orta', color: '#eab308' },
  yeterli: { label: 'Yeterli', color: '#22c55e' },
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
