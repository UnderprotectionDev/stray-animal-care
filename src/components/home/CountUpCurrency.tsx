'use client'

import React, { useEffect, useRef, useState } from 'react'
import { formatCurrency } from '@/utilities/formatCurrency'

type CountUpCurrencyProps = {
  value: number | null | undefined
  duration?: number
  className?: string
}

export function CountUpCurrency({ value, duration = 2000, className }: CountUpCurrencyProps) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element || value == null) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCurrent(Math.round(eased * value))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [value, duration])

  if (value == null) return <span className={className}>—</span>

  return (
    <span ref={ref} className={className}>
      {formatCurrency(current)}
    </span>
  )
}
