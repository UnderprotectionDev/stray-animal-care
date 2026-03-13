import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0, locale?: string) {
  try {
    const payload = await getPayload({ config: configPromise })

    const global = await payload.findGlobal({
      slug,
      depth,
      ...(locale ? { locale: locale as 'tr' | 'en' } : {}),
    })

    return global
  } catch (error) {
    console.error(`[getGlobal] Failed to fetch "${slug}":`, error)
    return null
  }
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0, locale?: string) =>
  unstable_cache(async () => getGlobal(slug, depth, locale), [slug, String(depth), locale ?? 'default'], {
    tags: [`global_${slug}`],
  })
