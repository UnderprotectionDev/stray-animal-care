import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Locale } from '@/i18n/config'
import type { EmergencyCase } from '@/payload-types'

async function fetchEmergencyCases(locale: Locale) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'emergency-cases',
    where: { _status: { equals: 'published' } },
    limit: 100,
    sort: '-publishedAt',
    locale,
    depth: 1,
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
  return result.docs as EmergencyCase[]
}

export function getEmergencyCases(locale: Locale) {
  return unstable_cache(
    () => fetchEmergencyCases(locale),
    ['emergency-list', locale],
    { tags: ['emergency-list', locale], revalidate: 30 },
  )()
}

export async function getEmergencyCaseBySlug(slug: string, locale: Locale) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'emergency-cases',
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
    limit: 1,
    locale,
    depth: 2,
  })
  return result.docs[0] ?? null
}

export async function getEmergencyCaseSlugs() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'emergency-cases',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true },
  })
  return result.docs.map((doc) => doc.slug)
}
