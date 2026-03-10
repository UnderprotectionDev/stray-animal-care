import React from 'react'
import { cn } from '@/utilities/ui'

const defaultSizes = {
  h1: 'text-4xl md:text-5xl font-bold',
  h2: 'text-3xl md:text-4xl font-semibold',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-medium',
} as const

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLHeadingElement>

export function Heading({ as: Tag = 'h2', className, children, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn('font-heading tracking-tight', defaultSizes[Tag], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
