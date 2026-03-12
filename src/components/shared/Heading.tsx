import React from 'react'
import { cn } from '@/utilities/ui'

const defaultSizes = {
  h1: 't-mega',
  h2: 't-h1',
  h3: 't-h2',
  h4: 't-h2',
} as const

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLHeadingElement>

export function Heading({ as: Tag = 'h2', className, children, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(defaultSizes[Tag], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
