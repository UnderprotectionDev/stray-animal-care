import React from 'react'
import { cn } from '@/utilities/ui'

const statusStyles = {
  active: 'badge-sys mint',
  urgent: 'badge-sys critical',
  completed: 'badge-sys',
  pending: 'badge-sys mint',
} as const

type StatusBadgeProps = {
  status: keyof typeof statusStyles
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusStyles[status], className)}>
      {children}
    </span>
  )
}
