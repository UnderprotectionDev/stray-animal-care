import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Animal } from '../../../payload-types'

export const revalidateAnimal: CollectionAfterChangeHook<Animal> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published' && doc.slug) {
      payload.logger.info(`Revalidating animal: ${doc.slug}`)

      try {
        revalidatePath(`/tr/canlarimiz/${doc.slug}`)
        revalidatePath(`/en/canlarimiz/${doc.slug}`)
        revalidatePath('/tr/canlarimiz')
        revalidatePath('/en/canlarimiz')
        revalidateTag('animals-list')
        revalidateTag('animals-sitemap')
      } catch (err) {
        payload.logger.error({ msg: 'Failed to revalidate animal paths', err })
      }
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published' && previousDoc?.slug) {
      payload.logger.info(`Revalidating old animal: ${previousDoc.slug}`)

      try {
        revalidatePath(`/tr/canlarimiz/${previousDoc.slug}`)
        revalidatePath(`/en/canlarimiz/${previousDoc.slug}`)
        revalidatePath('/tr/canlarimiz')
        revalidatePath('/en/canlarimiz')
        revalidateTag('animals-list')
        revalidateTag('animals-sitemap')
      } catch (err) {
        payload.logger.error({ msg: 'Failed to revalidate old animal paths', err })
      }
    }
  }
  return doc
}

export const revalidateAnimalDelete: CollectionAfterDeleteHook<Animal> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    try {
      revalidatePath(`/tr/canlarimiz/${doc.slug}`)
      revalidatePath(`/en/canlarimiz/${doc.slug}`)
      revalidatePath('/tr/canlarimiz')
      revalidatePath('/en/canlarimiz')
      revalidateTag('animals-list')
      revalidateTag('animals-sitemap')
    } catch (err) {
      payload.logger.error({ msg: 'Failed to revalidate deleted animal paths', err })
    }
  }

  return doc
}
