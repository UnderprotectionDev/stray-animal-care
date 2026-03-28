'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Silk = dynamic(() => import('@/components/Silk'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" style={{ backgroundColor: '#2D936C' }} />,
})

export function HomeHeroSilkBg() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <Silk
        speed={prefersReduced ? 0.5 : 5}
        scale={1}
        color="#2D936C"
        noiseIntensity={1.5}
        rotation={0}
      />
    </div>
  )
}
