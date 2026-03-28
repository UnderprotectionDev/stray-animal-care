'use client'

import React, { useRef } from 'react'
import { motion, useInView, type TargetAndTransition } from 'motion/react'

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

type Props = {
  text: string
  tag?: Tag
  className?: string
  style?: React.CSSProperties
  splitBy?: 'words' | 'characters'
  staggerDelay?: number
  threshold?: number
}

const hidden: TargetAndTransition = { y: '110%' }
const visible: TargetAndTransition = { y: '0%' }

export function VerticalCutReveal({
  text,
  tag: Tag = 'h3',
  className,
  style,
  splitBy = 'words',
  staggerDelay = 0.06,
  threshold = 0.3,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  const parts = splitBy === 'characters' ? text.split('') : text.split(/\s+/)

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className} style={style} aria-label={text}>
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'top' }}
        >
          <motion.span
            className="inline-block"
            initial={hidden}
            animate={isInView ? visible : hidden}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: i * staggerDelay,
            }}
            aria-hidden="true"
          >
            {part}
          </motion.span>
          {splitBy === 'words' && i < parts.length - 1 && (
            <span className="inline-block w-[0.3em]" aria-hidden="true" />
          )}
        </span>
      ))}
    </Tag>
  )
}
