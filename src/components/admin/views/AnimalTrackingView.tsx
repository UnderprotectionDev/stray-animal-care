import type { AdminViewServerProps } from 'payload'

import { Gutter } from '@payloadcms/ui'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { AnimalTrackingContent } from './AnimalTrackingContent'

import './view-styles.scss'

export async function AnimalTrackingView(_props: AdminViewServerProps) {
  const payload = await getPayload({ config: configPromise })

  const animals = await payload.find({
    collection: 'animals',
    limit: 100,
    depth: 1,
    where: { _status: { equals: 'published' } },
    sort: '-createdAt',
    select: {
      name: true,
      type: true,
      animalStatus: true,
      photos: true,
      createdAt: true,
    },
  })

  const serialized = animals.docs.map((doc) => ({
    id: doc.id,
    name: typeof doc.name === 'string' ? doc.name : 'İsimsiz',
    type: (doc.type as string) || 'kedi',
    animalStatus: (doc.animalStatus as string) || 'tedavide',
    photo:
      doc.photos && Array.isArray(doc.photos) && doc.photos.length > 0
        ? typeof doc.photos[0] === 'object' && doc.photos[0] !== null
          ? (doc.photos[0] as { thumbnailURL?: string; url?: string }).thumbnailURL ||
            (doc.photos[0] as { url?: string }).url ||
            null
          : null
        : null,
  }))

  return (
    <Gutter>
      <AnimalTrackingContent animals={serialized} />
    </Gutter>
  )
}
