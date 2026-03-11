'use client'

import React from 'react'
import { ResponsiveContainer } from 'recharts'

export type AdminChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
}

interface AdminChartContainerProps {
  config: AdminChartConfig
  children: React.ComponentProps<typeof ResponsiveContainer>['children']
  style?: React.CSSProperties
  className?: string
}

/**
 * Tailwind-free chart container for Payload admin panel.
 * Replaces shadcn ChartContainer which depends on Tailwind CSS classes.
 */
export const AdminChartContainer: React.FC<AdminChartContainerProps> = ({
  config,
  children,
  style,
}) => {
  const uniqueId = React.useId()
  const chartId = `chart-${uniqueId.replace(/:/g, '')}`

  // Generate CSS variables for chart colors
  const colorVars = Object.entries(config).reduce(
    (acc, [key, value]) => {
      if (value.color) {
        acc[`--color-${key}`] = value.color
      }
      return acc
    },
    {} as Record<string, string>,
  )

  return (
    <div
      data-chart={chartId}
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        fontSize: '12px',
        ...colorVars,
        ...style,
      }}
    >
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  )
}
