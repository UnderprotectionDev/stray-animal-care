'use client'

import dynamic from 'next/dynamic'
import type { Media as MediaType } from '@/payload-types'

const BeforeAfter = dynamic(
  () => import('./BeforeAfter').then((m) => m.BeforeAfter),
  { ssr: false },
)

type BeforeAfterWrapperProps = {
  before: MediaType
  after: MediaType
  labels: { before: string; after: string }
}

export function BeforeAfterWrapper({ before, after, labels }: BeforeAfterWrapperProps) {
  return <BeforeAfter before={before} after={after} labels={labels} />
}
