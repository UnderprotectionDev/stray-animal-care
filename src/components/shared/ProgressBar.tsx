import React from 'react'
import { cn } from '@/utilities/ui'

type ProgressBarProps = {
  current: number
  target: number
  className?: string
  label?: string
  colorClass?: string
}

export function ProgressBar({ current, target, className, label, colorClass = 'bg-health' }: ProgressBarProps) {
  const percentage = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between t-meta">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-bold">{percentage}%</span>
        </div>
      )}
      <div
        className="h-2 w-full border border-border bg-muted"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={target}
        aria-label={label || `${percentage}% complete`}
      >
        <div
          className={`h-full ${colorClass} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
