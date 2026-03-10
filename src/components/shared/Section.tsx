import React from 'react'
import { cn } from '@/utilities/ui'

const paddingPresets = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-24 md:py-32',
} as const

type SectionProps = {
  as?: 'section' | 'div' | 'article' | 'aside'
  padding?: keyof typeof paddingPresets
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

export function Section({
  as: Tag = 'section',
  padding = 'md',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(paddingPresets[padding], className)} {...props}>
      {children}
    </Tag>
  )
}
