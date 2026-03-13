import React from 'react'
import type { SiteSetting } from '@/payload-types'
import { Link } from '@/i18n/navigation'

type TransparencyBannerBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeTransparencyBanner' }>

type Props = {
  block: TransparencyBannerBlock
}

export function TransparencyBanner({ block }: Props) {
  return (
    <section>
      <div className="panel py-6 px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-muted">
        <div>
          <h2 className="t-h2">{block.title}</h2>
          {block.description && (
            <p className="t-meta text-muted-foreground mt-1">{block.description}</p>
          )}
        </div>
        {block.ctaLabel && block.ctaLink && (
          <Link href={block.ctaLink} className="btn-cta text-xs py-2 px-4 shrink-0">
            {block.ctaLabel}
          </Link>
        )}
      </div>
    </section>
  )
}
