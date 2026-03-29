import 'server-only'

import type { EmergencyCase } from '@/payload-types'
import { createListQuery, createBySlugQuery, createSlugsQuery } from '@/utilities/payloadQueries'

export const getEmergencyCases = createListQuery<EmergencyCase>('emergency-cases', {
  cacheTag: 'emergency-list',
  where: { _status: { equals: 'published' } },
  sort: '-publishedAt',
  revalidate: 30,
  select: {
    title: true,
    slug: true,
    photos: true,
    beforePhoto: true,
    afterPhoto: true,
    targetAmount: true,
    collectedAmount: true,
    caseStatus: true,
    publishedAt: true,
    animal: true,
    meta: true,
  },
})

export const getEmergencyCaseBySlug = createBySlugQuery<EmergencyCase>('emergency-cases', { depth: 2 })

export const getEmergencyCaseSlugs = createSlugsQuery('emergency-cases')
