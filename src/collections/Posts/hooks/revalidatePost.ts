import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import { locales } from '@/i18n/config'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating post: ${doc.slug}`)

      try {
        for (const locale of locales) {
          revalidatePath(`/${locale}/gunluk/${doc.slug}`)
          revalidatePath(`/${locale}/gunluk`)
        }
        revalidateTag('posts-sitemap')
        revalidateTag('blog-list')
      } catch (err) {
        payload.logger.error({ msg: 'Failed to revalidate post paths', err })
      }
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old post: ${previousDoc.slug}`)

      try {
        for (const locale of locales) {
          revalidatePath(`/${locale}/gunluk/${previousDoc.slug}`)
          revalidatePath(`/${locale}/gunluk`)
        }
        revalidateTag('posts-sitemap')
        revalidateTag('blog-list')
      } catch (err) {
        payload.logger.error({ msg: 'Failed to revalidate old post paths', err })
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      for (const locale of locales) {
        revalidatePath(`/${locale}/gunluk/${doc?.slug}`)
        revalidatePath(`/${locale}/gunluk`)
      }
      revalidateTag('posts-sitemap')
      revalidateTag('blog-list')
    } catch (err) {
      payload.logger.error({ msg: 'Failed to revalidate deleted post paths', err })
    }
  }

  return doc
}
