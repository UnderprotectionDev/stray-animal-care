'use client'

import React from 'react'
import { useCountAnimation } from '@/hooks/use-count-animation'
import { formatCurrency } from '@/utilities/formatCurrency'

type CountUpCurrencyProps = {
  value: number | null | undefined
  duration?: number
  className?: string
}

export function CountUpCurrency({ value, duration = 2000, className }: CountUpCurrencyProps) {
  const { ref, value: animatedValue } = useCountAnimation(value ?? 0, duration)

  if (value == null) return <span className={className}>—</span>

  return (
    <span ref={ref} className={className}>
      {formatCurrency(animatedValue)}
    </span>
  )
}
