'use client'

import React from 'react'
import ClickSpark from '@/components/ClickSpark'

export function ClickSparkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark
      sparkColor="#4A46E4"
      sparkSize={14}
      sparkRadius={40}
      sparkCount={8}
      duration={500}
      easing="ease-out"
      extraScale={1.4}
    >
      {children}
    </ClickSpark>
  )
}
