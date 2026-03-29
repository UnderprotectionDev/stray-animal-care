import 'server-only'

import type { NeedsList } from '@/payload-types'
import { createListQuery } from '@/utilities/payloadQueries'

export const getNeedsList = createListQuery<NeedsList>('needs-list', {
  cacheTag: 'needs-list',
  sort: '_order',
  depth: 0,
  revalidate: 60,
})
