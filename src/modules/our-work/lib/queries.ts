import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'

async function fetchOurWorkData() {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
  return settings.ourWorkActivities ?? []
}

export function getOurWorkActivities() {
  return unstable_cache(fetchOurWorkData, ['our-work-activities'], {
    tags: ['site-settings'],
    revalidate: 3600,
  })()
}
