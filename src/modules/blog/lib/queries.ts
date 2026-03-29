import 'server-only'

import type { Post } from '@/payload-types'
import { createListQuery, createBySlugQuery, createSlugsQuery } from '@/utilities/payloadQueries'

export const getBlogPosts = createListQuery<Post>('posts', {
  cacheTag: 'blog-list',
  where: { _status: { equals: 'published' } },
  sort: '-publishedAt',
  revalidate: 60,
})

export const getBlogPostBySlug = createBySlugQuery<Post>('posts', { depth: 2 })

export const getBlogPostSlugs = createSlugsQuery('posts')
