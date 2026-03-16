'use client'

import React from 'react'
import RotatingText from '@/components/RotatingText'

type Props = {
  texts: string[]
  className?: string
}

export function HeroRotatingSubtitle({ texts, className }: Props) {
  if (!texts || texts.length === 0) return null

  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <RotatingText
        texts={texts}
        splitBy="characters"
        staggerDuration={0.03}
        staggerFrom="first"
        rotationInterval={3000}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-120%', opacity: 0 }}
        mainClassName="t-h2 uppercase font-bold"
      />
    </div>
  )
}
