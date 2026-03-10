import { Button, type buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Link } from '@/i18n/navigation'
import React from 'react'
import type { VariantProps } from 'class-variance-authority'

import type { Page, Post } from '@/payload-types'

type ButtonVariantProps = VariantProps<typeof buttonVariants>

type CMSLinkType = {
  appearance?: 'inline' | ButtonVariantProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonVariantProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? undefined : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label}
        {children}
      </Link>
    )
  }

  return (
    <Button
      render={<Link href={href} {...newTabProps} />}
      className={cn(className)}
      size={size}
      variant={appearance}
    >
      {label}
      {children}
    </Button>
  )
}
