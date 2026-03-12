import React from 'react'
import { cn } from '@/utilities/ui'

type ContainerProps = {
  size?: 'sm' | 'md' | 'lg' | 'full'
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export function Container({
  size: _size,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 md:px-8', className)} {...props}>
      {children}
    </div>
  )
}
