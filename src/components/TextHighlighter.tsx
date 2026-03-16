'use client'

import React, { forwardRef, useImperativeHandle, useCallback } from 'react'
import { motion, useInView, type Easing } from 'motion/react'
import { cn } from '@/utilities/ui'

type Direction = 'ltr' | 'rtl'
type TriggerType = 'inView' | 'hover' | 'manual'

export type TextHighlighterRef = {
  animate: () => void
  reset: () => void
}

type TextHighlighterProps = {
  children: React.ReactNode
  highlightColor?: string
  className?: string
  triggerType?: TriggerType
  direction?: Direction
  transition?: {
    duration?: number
    ease?: Easing
    delay?: number
  }
  useInViewOptions?: {
    once?: boolean
    amount?: number
    margin?: string
  }
}

const TextHighlighter = forwardRef<TextHighlighterRef, TextHighlighterProps>(
  (
    {
      children,
      highlightColor = '#f0f050',
      className,
      triggerType = 'inView',
      direction = 'ltr',
      transition = { duration: 0.6, ease: 'easeOut', delay: 0 },
      useInViewOptions = { once: true, amount: 0.3 },
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLSpanElement>(null)
    const isInView = useInView(internalRef, {
      once: useInViewOptions.once,
      amount: useInViewOptions.amount,
      margin: useInViewOptions.margin as `${number}px` | undefined,
    })

    const [isAnimating, setIsAnimating] = React.useState(false)

    const animate = useCallback(() => setIsAnimating(true), [])
    const reset = useCallback(() => setIsAnimating(false), [])

    useImperativeHandle(ref, () => ({ animate, reset }), [animate, reset])

    const shouldAnimate =
      triggerType === 'inView' ? isInView : triggerType === 'manual' ? isAnimating : false

    const gradientDirection = direction === 'ltr' ? 'to right' : 'to left'

    return (
      <motion.span
        ref={internalRef}
        className={cn('relative inline', className)}
        style={{
          backgroundImage: `linear-gradient(${gradientDirection}, ${highlightColor} 50%, transparent 50%)`,
          backgroundSize: '200% 100%',
          backgroundPosition: direction === 'ltr' ? 'right' : 'left',
          backgroundRepeat: 'no-repeat',
          padding: '0.05em 0.15em',
          margin: '-0.05em -0.15em',
        }}
        animate={
          shouldAnimate
            ? { backgroundPosition: direction === 'ltr' ? 'left' : 'right' }
            : { backgroundPosition: direction === 'ltr' ? 'right' : 'left' }
        }
        transition={{
          duration: transition.duration,
          ease: transition.ease,
          delay: transition.delay,
        }}
        onMouseEnter={triggerType === 'hover' ? animate : undefined}
        onMouseLeave={triggerType === 'hover' ? reset : undefined}
      >
        {children}
      </motion.span>
    )
  },
)

TextHighlighter.displayName = 'TextHighlighter'

export default TextHighlighter
