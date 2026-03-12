import React from 'react'
import { cn } from '@/utilities/ui'

type SectionProps = {
  as?: 'section' | 'div' | 'article' | 'aside'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

export function Section({
  as: Tag = 'section',
  padding: _padding,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn('panel', className)} {...props}>
      {children}
    </Tag>
  )
}
