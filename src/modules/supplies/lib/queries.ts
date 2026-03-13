import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Locale } from '@/i18n/config'

async function fetchNeedsList(locale: Locale) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'needs-list',
    limit: 100,
    sort: '_order',
    locale,
  })
  return result.docs
}

export function getNeedsList(locale: Locale) {
  return unstable_cache(
    () => fetchNeedsList(locale),
    ['needs-list', locale],
    { tags: ['needs-list', locale], revalidate: 60 },
  )()
}
