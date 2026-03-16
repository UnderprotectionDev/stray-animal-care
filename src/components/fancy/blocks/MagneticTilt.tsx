'use client'

import { useEffect, useRef, useState, type PropsWithChildren } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

type Props = PropsWithChildren<{
  maxRotation?: number
  perspective?: number
  className?: string
}>

export function MagneticTilt({
  children,
  maxRotation = 3,
  perspective = 800,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(rawY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    // Map cursor offset to rotation: Y-axis rotates on horizontal movement, X-axis on vertical
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * maxRotation)
    rawX.set(((cy - e.clientY) / (rect.height / 2)) * maxRotation)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </motion.div>
  )
}
