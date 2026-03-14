import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { locales } from '@/i18n/config'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating page: ${doc.slug}`)

      try {
        for (const locale of locales) {
          const path = doc.slug === 'home' ? `/${locale}` : `/${locale}/${doc.slug}`
          revalidatePath(path)
        }
        revalidateTag('pages-sitemap')
      } catch (err) {
        payload.logger.error({ msg: 'Failed to revalidate page paths', err })
      }
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old page: ${previousDoc.slug}`)

      try {
        for (const locale of locales) {
          const path = previousDoc.slug === 'home' ? `/${locale}` : `/${locale}/${previousDoc.slug}`
          revalidatePath(path)
        }
        revalidateTag('pages-sitemap')
      } catch (err) {
        payload.logger.error({ msg: 'Failed to revalidate old page paths', err })
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const locale of locales) {
        const path = doc?.slug === 'home' ? `/${locale}` : `/${locale}/${doc?.slug}`
        revalidatePath(path)
      }
      revalidateTag('pages-sitemap')
    } catch (err) {
      payload.logger.error({ msg: 'Failed to revalidate deleted page paths', err })
    }
  }

  return doc
}
