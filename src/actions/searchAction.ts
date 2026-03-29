'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export interface SearchResult {
  id: number
  title: string
  slug: string
  doc?: {
    relationTo: string
    value: number
  }
}

export async function searchAction(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return []

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'search',
    overrideAccess: false,
    where: {
      or: [{ title: { like: query } }, { slug: { like: query } }],
    },
    limit: 10,
    depth: 0,
  })

  return docs.map((doc) => ({
    id: doc.id,
    title: doc.title ?? '',
    slug: doc.slug ?? '',
    doc: doc.doc
      ? {
          relationTo: doc.doc.relationTo,
          value: typeof doc.doc.value === 'number' ? doc.doc.value : Number(doc.doc.value),
        }
      : undefined,
  }))
}
