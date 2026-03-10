import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Locale } from '@/i18n/config'

async function fetchAnimals(locale: Locale) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'animals',
    where: { _status: { equals: 'published' } },
    limit: 100,
    sort: '-publishedAt',
    locale,
    depth: 1,
  })
  return result.docs
}

export function getAnimals(locale: Locale) {
  return unstable_cache(
    () => fetchAnimals(locale),
    ['animals-list', locale],
    { tags: ['animals-list', locale], revalidate: 60 },
  )()
}

export async function getAnimalBySlug(slug: string, locale: Locale) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'animals',
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
    limit: 1,
    locale,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export async function getAnimalSlugs() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'animals',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true },
  })
  return result.docs.map((doc) => doc.slug)
}
