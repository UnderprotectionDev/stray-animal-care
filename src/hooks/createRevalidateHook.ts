import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { locales } from '@/i18n/config'

type CollectionRevalidateConfig = {
  entityName: string
  tags: string[]
  paths?: string[]
  resolvePaths?: (doc: Record<string, unknown>, locale: string) => string[]
  checkStatus?: boolean
}

export function createCollectionRevalidateHooks({
  entityName,
  tags,
  paths,
  resolvePaths,
  checkStatus = true,
}: CollectionRevalidateConfig): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
} {
  function revalidateAll(doc: Record<string, unknown>) {
    for (const locale of locales) {
      if (resolvePaths) {
        for (const p of resolvePaths(doc, locale)) {
          revalidatePath(p)
        }
      } else if (paths) {
        for (const template of paths) {
          const resolved = template
            .replace('{locale}', locale)
            .replace('{slug}', String(doc.slug ?? ''))
          revalidatePath(resolved)
        }
      }
    }
    for (const tag of tags) {
      revalidateTag(tag)
    }
  }

  const afterChange: CollectionAfterChangeHook = ({
    doc,
    previousDoc,
    req: { payload, context },
  }) => {
    if (context.disableRevalidate) return doc

    if (checkStatus) {
      if (doc._status === 'published') {
        payload.logger.info(`Revalidating ${entityName}: ${doc.slug ?? doc.title}`)
        try {
          revalidateAll(doc)
        } catch (err) {
          payload.logger.error({ msg: `Failed to revalidate ${entityName}`, err })
        }
      }

      if (previousDoc?._status === 'published' && doc._status !== 'published') {
        payload.logger.info(`Revalidating old ${entityName}: ${previousDoc.slug ?? previousDoc.title}`)
        try {
          revalidateAll(previousDoc)
        } catch (err) {
          payload.logger.error({ msg: `Failed to revalidate old ${entityName}`, err })
        }
      }
    } else {
      payload.logger.info(`Revalidating ${entityName}: ${doc.title ?? doc.slug}`)
      try {
        revalidateAll(doc)
      } catch (err) {
        payload.logger.error({ msg: `Failed to revalidate ${entityName}`, err })
      }
    }

    return doc
  }

  const afterDelete: CollectionAfterDeleteHook = ({
    doc,
    req: { payload, context },
  }) => {
    if (context.disableRevalidate) return doc

    try {
      revalidateAll(doc as Record<string, unknown>)
    } catch (err) {
      payload.logger.error({ msg: `Failed to revalidate deleted ${entityName}`, err })
    }

    return doc
  }

  return { afterChange, afterDelete }
}

type GlobalRevalidateConfig = {
  entityName: string
  tags: string[]
}

export function createGlobalRevalidateHook({
  entityName,
  tags,
}: GlobalRevalidateConfig): GlobalAfterChangeHook {
  return ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating ${entityName}`)
      for (const tag of tags) {
        revalidateTag(tag)
      }
    }
    return doc
  }
}
