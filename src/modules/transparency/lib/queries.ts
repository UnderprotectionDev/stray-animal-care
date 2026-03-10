import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Locale } from '@/i18n/config'

async function fetchReports(locale: Locale) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'transparency-reports',
    limit: 100,
    sort: '-month',
    locale,
  })
  return result.docs
}

export function getReports(locale: Locale) {
  return unstable_cache(
    () => fetchReports(locale),
    ['transparency-reports', locale],
    { tags: ['transparency-reports', locale], revalidate: 3600 },
  )()
}
