import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

// UIStrings has 235+ localized fields. PostgreSQL's json_build_array is limited
// to FUNC_MAX_ARGS (100). We batch-fetch using `select` to keep each query
// under the limit, then merge the results.
const UI_STRINGS_BATCHES: string[][] = [
  // Batch 1: ~69 localized fields
  ['common', 'layout', 'search', 'posts', 'home', 'ourWork', 'notFound', 'contact'],
  // Batch 2: ~64 localized fields
  ['animals', 'emergency', 'blog'],
  // Batch 3: ~80 localized fields
  ['donate', 'supplies', 'transparency'],
  // Batch 4: ~59 localized fields
  ['volunteer', 'vision'],
]

async function getUIStrings(depth: number, locale?: string) {
  const payload = await getPayload({ config: configPromise })

  const results = await Promise.all(
    UI_STRINGS_BATCHES.map((groups) => {
      const select: Record<string, true> = {}
      for (const g of groups) select[g] = true
      return payload.findGlobal({
        slug: 'ui-strings' as Global,
        depth,
        ...(locale ? { locale: locale as 'tr' | 'en' } : {}),
        select,
      })
    }),
  )

  return Object.assign({}, ...results) as Config['globals']['ui-strings']
}

async function getGlobal(slug: Global, depth = 0, locale?: string) {
  try {
    if (slug === 'ui-strings') {
      return await getUIStrings(depth, locale)
    }

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
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * In development, bypasses unstable_cache so DB changes are reflected immediately.
 */
export const getCachedGlobal = (slug: Global, depth = 0, locale?: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return () => getGlobal(slug, depth, locale)
  }
  return unstable_cache(async () => getGlobal(slug, depth, locale), [slug, String(depth), locale ?? 'default'], {
    tags: [`global_${slug}`],
  })
}
