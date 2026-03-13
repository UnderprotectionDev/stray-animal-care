import type { CalloutBlock as CalloutBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & CalloutBlockProps

const variantStyles = {
  info: 'border-l-[#A8D5BA]',
  warning: 'border-l-amber-500',
  success: 'border-l-green-600',
  error: 'border-l-[#FF0000]',
} as const

export const CalloutBlock: React.FC<Props> = ({ className, content, variant, title }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn(
          'border border-black border-l-4 p-6',
          variant && variantStyles[variant],
        )}
      >
        {title && <p className="t-body font-bold mb-2">{title}</p>}
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
