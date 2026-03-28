'use client'

import React, { useMemo, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'

const CHART_COLORS = [
  'var(--health)',
  'var(--trust)',
  'var(--adoption)',
  'var(--warm)',
  'var(--emergency)',
  'var(--cta)',
  'var(--stats)',
]

// Resolved hex values for recharts (CSS vars don't work in SVG fills)
const CHART_HEX_COLORS = [
  '#2D936C', // health
  '#4A46E4', // trust / blue
  '#F26E41', // adoption / orange
  '#FF6B6B', // warm / coral
  '#F5B62A', // emergency / yellow
  '#EF303B', // cta / red
  '#9E74F9', // stats / lilac
]

const CHART_CSS_VARS = CHART_COLORS

type Expense = {
  category?: string | null
  amount?: number | null
  id?: string | null
}

type Props = {
  expenses: Expense[]
  totalExpense: number
  currency: string
  labels: {
    expenses: string
    totalExpense: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderActiveShape(props: any) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
    percent,
  } = props

  // Truncate long names to fit inside donut
  const maxChars = 14
  const displayName =
    payload.name.length > maxChars ? payload.name.slice(0, maxChars) + '…' : payload.name

  return (
    <g>
      {/* Center text */}
      <text
        x={cx}
        y={cy - 14}
        textAnchor="middle"
        fill={fill}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
        }}
      >
        {displayName}
      </text>
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fill="var(--foreground)"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '16px',
          fontWeight: 700,
        }}
      >
        {value.toLocaleString('tr-TR')} ₺
      </text>
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fill="var(--muted-foreground)"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 700,
        }}
      >
        %{(percent * 100).toFixed(1)}
      </text>

      {/* Active sector — slightly expanded */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="var(--background)"
        strokeWidth={2}
      />
    </g>
  )
}

export function ExpenseDonutChart({ expenses, totalExpense, currency, labels }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)

  const data = useMemo(() => {
    return expenses
      .filter((e) => e.amount && e.amount > 0)
      .map((e, i) => ({
        name: e.category || `#${i + 1}`,
        value: e.amount ?? 0,
        color: CHART_HEX_COLORS[i % CHART_HEX_COLORS.length],
        cssVar: CHART_CSS_VARS[i % CHART_CSS_VARS.length],
        pct: totalExpense > 0 ? ((e.amount ?? 0) / totalExpense) * 100 : 0,
      }))
  }, [expenses, totalExpense])

  if (data.length === 0) return null

  return (
    <div>
      <div className="border border-border">
        {/* Chart area with subtle pattern background */}
        <div className="relative p-6 pb-4 bg-muted/20">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={72}
                outerRadius={108}
                paddingAngle={2}
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
                stroke="var(--background)"
                strokeWidth={2}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>

              {/* Center total when no segment is hovered */}
              {activeIndex === undefined && (
                <>
                  <text
                    x="50%"
                    y="43%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--muted-foreground)"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {labels.totalExpense}
                  </text>
                  <text
                    x="50%"
                    y="57%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--foreground)"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '18px',
                      fontWeight: 700,
                    }}
                  >
                    {totalExpense.toLocaleString('tr-TR')} {currency}
                  </text>
                </>
              )}
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="border-t border-border p-4">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {data.map((entry, i) => (
              <button
                key={i}
                type="button"
                className="flex items-center gap-2 text-left transition-opacity duration-200 hover:opacity-70"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                <span
                  className="inline-block size-3 shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {entry.name}
                </span>
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  %{entry.pct.toFixed(0)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
