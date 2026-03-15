import type { AdminViewServerProps } from 'payload'

import { Gutter } from '@payloadcms/ui'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CaseTrackingContent } from './CaseTrackingContent'

import './view-styles.scss'

export async function CaseTrackingView(_props: AdminViewServerProps) {
  const payload = await getPayload({ config: configPromise })

  const cases = await payload.find({
    collection: 'emergency-cases',
    limit: 50,
    where: { _status: { equals: 'published' } },
    sort: '-createdAt',
    select: {
      title: true,
      caseStatus: true,
      targetAmount: true,
      collectedAmount: true,
      createdAt: true,
    },
  })

  const serialized = cases.docs.map((doc) => ({
    id: doc.id,
    title: typeof doc.title === 'string' ? doc.title : 'Başlıksız',
    caseStatus: (doc.caseStatus as string) || 'aktif',
    targetAmount: (doc.targetAmount as number) || 0,
    collectedAmount: (doc.collectedAmount as number) || 0,
    createdAt: doc.createdAt,
  }))

  return (
    <Gutter>
      <CaseTrackingContent cases={serialized} />
    </Gutter>
  )
}
