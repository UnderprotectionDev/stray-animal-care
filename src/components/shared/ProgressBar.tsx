import React from 'react'
import { cn } from '@/utilities/ui'

type ProgressBarProps = {
  current: number
  target: number
  className?: string
  label?: string
}

export function ProgressBar({ current, target, className, label }: ProgressBarProps) {
  const percentage = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      )}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={target}
        aria-label={label || `${percentage}% complete`}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
