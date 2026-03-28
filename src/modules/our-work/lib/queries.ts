import 'server-only'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { SiteSetting } from '@/payload-types'

type OurWorkBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeOurWork' }>

async function fetchOurWorkData(locale?: string) {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
    ...(locale ? { locale: locale as 'tr' | 'en' } : {}),
  })

  const ourWorkBlock = settings.homepageBlocks?.find(
    (block): block is OurWorkBlock => block.blockType === 'homeOurWork',
  )

  return ourWorkBlock?.activities ?? []
}

export function getOurWorkActivities(locale?: string) {
  return unstable_cache(
    () => fetchOurWorkData(locale),
    ['our-work-activities', locale ?? 'default'],
    {
      tags: ['global_site-settings'],
      revalidate: 3600,
    },
  )()
}
