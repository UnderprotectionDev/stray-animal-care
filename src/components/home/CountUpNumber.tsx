'use client'

import React from 'react'
import { useCountAnimation } from '@/hooks/use-count-animation'

type CountUpNumberProps = {
  target: number
  duration?: number
  className?: string
}

export function CountUpNumber({ target, duration = 2000, className }: CountUpNumberProps) {
  const { ref, value } = useCountAnimation(target, duration)

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
    </span>
  )
}
