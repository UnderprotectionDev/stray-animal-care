import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Animal } from '../../../payload-types'

export const revalidateAnimal: CollectionAfterChangeHook<Animal> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/animals/${doc.slug}`

      payload.logger.info(`Revalidating animal at path: ${path}`)

      revalidatePath(path)
      revalidateTag('animals-sitemap')
    }

    // If the animal was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/animals/${previousDoc.slug}`

      payload.logger.info(`Revalidating old animal at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('animals-sitemap')
    }
  }
  return doc
}

export const revalidateAnimalDelete: CollectionAfterDeleteHook<Animal> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/animals/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('animals-sitemap')
  }

  return doc
}
