import 'server-only'

import type { Animal } from '@/payload-types'
import { createListQuery, createBySlugQuery, createSlugsQuery } from '@/utilities/payloadQueries'

export const getAnimals = createListQuery<Animal>('animals', {
  cacheTag: 'animals-list',
  where: { _status: { equals: 'published' } },
  sort: '-publishedAt',
  revalidate: 60,
})

export const getAnimalBySlug = createBySlugQuery<Animal>('animals', { depth: 1 })

export const getAnimalSlugs = createSlugsQuery('animals')
