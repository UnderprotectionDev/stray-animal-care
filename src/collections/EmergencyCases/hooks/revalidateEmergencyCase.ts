import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { EmergencyCase } from '../../../payload-types'

export const revalidateEmergencyCase: CollectionAfterChangeHook<EmergencyCase> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/emergency/${doc.slug}`

      payload.logger.info(`Revalidating emergency case at path: ${path}`)

      revalidatePath(path)
      revalidateTag('emergency-sitemap')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/emergency/${previousDoc.slug}`

      payload.logger.info(`Revalidating old emergency case at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('emergency-sitemap')
    }
  }
  return doc
}

export const revalidateEmergencyCaseDelete: CollectionAfterDeleteHook<EmergencyCase> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/emergency/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('emergency-sitemap')
  }

  return doc
}
