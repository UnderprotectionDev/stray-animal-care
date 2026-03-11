import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Event } from '../../../payload-types'

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published' || previousDoc?._status === 'published') {
      payload.logger.info(`Revalidating event: ${doc.slug}`)

      try {
        revalidateTag('events-list')
        revalidateTag('events-sitemap')
      } catch (err) {
        payload.logger.error({ msg: 'Failed to revalidate event', err })
      }
    }
  }
  return doc
}

export const revalidateEventDelete: CollectionAfterDeleteHook<Event> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      revalidateTag('events-list')
      revalidateTag('events-sitemap')
    } catch (err) {
      payload.logger.error({ msg: 'Failed to revalidate deleted event', err })
    }
  }

  return doc
}
