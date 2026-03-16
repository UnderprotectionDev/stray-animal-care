'use client'

import { ElasticLine } from '@/components/ElasticLine'

export function ElasticDivider() {
  return (
    <div
      className="w-full"
      style={{
        height: '40px',
        background: 'var(--background)',
        color: 'var(--foreground)',
        margin: '-0.75px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <ElasticLine
        strokeWidth={1.5}
        grabThreshold={10}
        releaseThreshold={40}
        transition={{ type: 'spring', stiffness: 300, damping: 5 }}
        animateInTransition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </div>
  )
}
