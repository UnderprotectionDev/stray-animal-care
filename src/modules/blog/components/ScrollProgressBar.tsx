'use client'

import React from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

type ScrollProgressBarProps = {
  categoryToken: string
}

export function ScrollProgressBar({ categoryToken }: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX,
        backgroundColor: `var(--${categoryToken})`,
      }}
    />
  )
}
