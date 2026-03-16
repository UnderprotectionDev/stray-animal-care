'use client'

import React from 'react'
import SplitText from '@/components/SplitText'

type Props = {
  text: string | null | undefined
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  style?: React.CSSProperties
}

export function AnimatedMegaHeading({ text, className, tag = 'h2', style }: Props) {
  if (!text) return null

  return (
    <div style={style}>
      <SplitText
        text={text}
        tag={tag}
        className={`t-mega uppercase ${className || ''}`}
        splitType="chars"
        duration={0.5}
        delay={30}
        ease="power4.out"
        from={{ opacity: 0, y: 60, rotateX: -90 }}
        to={{ opacity: 1, y: 0, rotateX: 0 }}
        threshold={0.15}
        rootMargin="-80px"
        textAlign="left"
      />
    </div>
  )
}
