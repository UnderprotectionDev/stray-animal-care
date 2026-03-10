import React from 'react'
import { cn } from '@/utilities/ui'

const statusStyles = {
  active: 'bg-secondary/20 text-secondary-foreground border-secondary/40',
  urgent: 'bg-destructive/10 text-destructive border-destructive/30',
  completed: 'bg-muted text-muted-foreground border-border',
  pending: 'bg-warning/20 text-foreground border-warning/40',
} as const

type StatusBadgeProps = {
  status: keyof typeof statusStyles
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status],
        className,
      )}
    >
      {children}
    </span>
  )
}
