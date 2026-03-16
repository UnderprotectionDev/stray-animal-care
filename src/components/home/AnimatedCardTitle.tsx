'use client'

import React from 'react'
import SplitText from '@/components/SplitText'

type Props = {
  text: string | null | undefined
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

export function AnimatedCardTitle({ text, className, tag = 'span' }: Props) {
  if (!text) return null

  return (
    <SplitText
      text={text}
      tag={tag}
      className={className || 't-h2 text-white'}
      splitType="words"
      duration={0.4}
      delay={40}
      ease="power3.out"
      from={{ opacity: 0, y: 20 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.2}
      rootMargin="-30px"
      textAlign="left"
    />
  )
}
