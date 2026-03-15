import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Locale } from '@/i18n/config'

async function fetchBlogPosts(locale: Locale) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    limit: 100,
    sort: '-publishedAt',
    locale,
    depth: 1,
  })
  return result.docs
}

export function getBlogPosts(locale: Locale) {
  return unstable_cache(
    () => fetchBlogPosts(locale),
    ['blog-list', locale],
    { tags: ['blog-list', locale], revalidate: 60 },
  )()
}

export const getBlogPostBySlug = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
    limit: 1,
    locale,
    depth: 2,
  })
  return result.docs[0] ?? null
})

export async function getBlogPostSlugs() {
  const payload = await getPayload({ config: configPromise })
  const slugs: string[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const result = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      limit: 100,
      page,
      select: { slug: true },
    })
    slugs.push(...result.docs.map((doc) => doc.slug))
    hasMore = result.hasNextPage
    page++
  }

  return slugs
}
