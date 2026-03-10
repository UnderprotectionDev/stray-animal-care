import React from 'react'
import { cn } from '@/utilities/ui'

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-none',
} as const

type ContainerProps = {
  size?: keyof typeof sizeClasses
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function Container({
  size = 'lg',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 md:px-8', sizeClasses[size], className)} {...props}>
      {children}
    </div>
  )
}
