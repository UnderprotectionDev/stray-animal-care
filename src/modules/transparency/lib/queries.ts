import 'server-only'

import type { TransparencyReport } from '@/payload-types'
import { createListQuery } from '@/utilities/payloadQueries'

export const getReports = createListQuery<TransparencyReport>('transparency-reports', {
  cacheTag: 'transparency-reports',
  sort: '-month',
  revalidate: 3600,
})
