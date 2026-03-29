import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Config } from '@/payload-types'
import type { Locale } from '@/i18n/config'

type CollectionSlug = keyof Config['collections']

/**
 * Create a cached list query for a Payload collection.
 * Wraps unstable_cache for ISR caching with tags.
 */
export function createListQuery<T>(
  collection: CollectionSlug,
  options: {
    cacheTag: string
    revalidate?: number
    where?: Record<string, unknown>
    sort?: string
    limit?: number
    depth?: number
    select?: Record<string, true>
  },
) {
  const { cacheTag, revalidate = 60, where, sort, limit = 100, depth = 1, select } = options

  async function fetchList(locale: Locale) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection,
      where: where as never,
      limit,
      sort,
      locale,
      depth,
      ...(select ? { select: select as never } : {}),
    })
    return result.docs as T[]
  }

  return function getList(locale: Locale): Promise<T[]> {
    return unstable_cache(() => fetchList(locale), [cacheTag, locale], {
      tags: [cacheTag, locale],
      revalidate,
    })()
  }
}

/**
 * Create a cached single-document query by slug.
 * Uses React cache() for request deduplication.
 */
export function createBySlugQuery<T>(
  collection: CollectionSlug,
  options?: {
    depth?: number
    publishedOnly?: boolean
  },
) {
  const { depth = 2, publishedOnly = true } = options ?? {}

  return cache(async (slug: string, locale: Locale): Promise<T | null> => {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection,
      where: {
        slug: { equals: slug },
        ...(publishedOnly ? { _status: { equals: 'published' } } : {}),
      } as never,
      limit: 1,
      locale,
      depth,
    })
    return (result.docs[0] as T) ?? null
  })
}

/**
 * Create a function that fetches all slugs for a collection.
 * Useful for generateStaticParams.
 */
export function createSlugsQuery(
  collection: CollectionSlug,
  options?: {
    where?: Record<string, unknown>
  },
) {
  const { where = { _status: { equals: 'published' } } } = options ?? {}

  return async function getSlugs(): Promise<string[]> {
    const payload = await getPayload({ config: configPromise })
    const slugs: string[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const result = await payload.find({
        collection,
        where: where as never,
        limit: 100,
        page,
        select: { slug: true } as never,
      })
      slugs.push(...result.docs.map((doc) => (doc as { slug: string }).slug))
      hasMore = result.hasNextPage
      page++
    }

    return slugs
  }
}
