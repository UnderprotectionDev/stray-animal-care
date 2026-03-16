'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const CircularGallery = dynamic(() => import('@/components/CircularGallery'), { ssr: false })

type OurWorkBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeOurWork' }
>

type Props = {
  activities: NonNullable<OurWorkBlock['activities']>
}

export default function OurWorkCircularGallery({ activities }: Props) {
  const items = useMemo(
    () =>
      activities.flatMap((activity) => {
        const images = activity.images ?? []
        return images
          .map((img) => {
            const media = typeof img === 'number' ? null : (img as MediaType)
            const imageUrl = media ? getMediaUrl(media.url) : ''
            if (!imageUrl) return null
            return {
              image: imageUrl,
              text: activity.title?.toUpperCase() ?? '',
            }
          })
          .filter(Boolean) as { image: string; text: string }[]
      }),
    [activities],
  )

  if (items.length === 0) return null

  return (
    <div className="relative w-full h-[clamp(420px,55vw,700px)] bg-background overflow-hidden cursor-grab active:cursor-grabbing">
      <CircularGallery
        items={items}
        bend={3}
        textColor="#111111"
        borderRadius={0}
        font="bold 24px var(--font-heading)"
      />
    </div>
  )
}
