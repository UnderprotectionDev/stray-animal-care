import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { EmergencyCase } from '../../../payload-types'

export const revalidateEmergencyCase: CollectionAfterChangeHook<EmergencyCase> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published' && doc.slug) {
      payload.logger.info(`Revalidating emergency case: ${doc.slug}`)

      try {
        revalidatePath(`/tr/acil-vakalar/${doc.slug}`)
        revalidatePath(`/en/acil-vakalar/${doc.slug}`)
        revalidatePath('/tr/acil-vakalar')
        revalidatePath('/en/acil-vakalar')
        revalidateTag('emergency-list')
        revalidateTag('emergency-sitemap')
      } catch (err) {
        payload.logger.error({ msg: 'Failed to revalidate emergency case paths', err })
      }
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published' && previousDoc?.slug) {
      payload.logger.info(`Revalidating old emergency case: ${previousDoc.slug}`)

      try {
        revalidatePath(`/tr/acil-vakalar/${previousDoc.slug}`)
        revalidatePath(`/en/acil-vakalar/${previousDoc.slug}`)
        revalidatePath('/tr/acil-vakalar')
        revalidatePath('/en/acil-vakalar')
        revalidateTag('emergency-list')
        revalidateTag('emergency-sitemap')
      } catch (err) {
        payload.logger.error({ msg: 'Failed to revalidate old emergency case paths', err })
      }
    }
  }
  return doc
}

export const revalidateEmergencyCaseDelete: CollectionAfterDeleteHook<EmergencyCase> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    try {
      revalidatePath(`/tr/acil-vakalar/${doc.slug}`)
      revalidatePath(`/en/acil-vakalar/${doc.slug}`)
      revalidatePath('/tr/acil-vakalar')
      revalidatePath('/en/acil-vakalar')
      revalidateTag('emergency-list')
      revalidateTag('emergency-sitemap')
    } catch (err) {
      payload.logger.error({ msg: 'Failed to revalidate deleted emergency case paths', err })
    }
  }

  return doc
}
