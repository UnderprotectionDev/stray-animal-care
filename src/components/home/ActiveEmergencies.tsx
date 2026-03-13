import React from 'react'
import type { EmergencyCase, Media as MediaType, SiteSetting } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'

type ActiveEmergenciesBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeActiveEmergencies' }>

type Props = {
  block: ActiveEmergenciesBlock
  cases: EmergencyCase[]
}

function getFirstPhoto(c: EmergencyCase): MediaType | null {
  if (c.photos && c.photos.length > 0) {
    const p = c.photos[0]
    if (typeof p !== 'number') return p
  }
  if (c.beforePhoto && typeof c.beforePhoto !== 'number') return c.beforePhoto
  return null
}

export function ActiveEmergencies({ block, cases }: Props) {
  if (cases.length === 0) return null

  const labels = block.labels ?? {}
  const tickerText = block.tickerText || ''
  const tickerItems = [...cases.map((c) => c.title).filter(Boolean), tickerText].flatMap((item) => [item, item])

  const bigItems = cases.slice(0, 2)
  const smallItems = cases.slice(2, block.limit ?? 5)

  return (
    <section>
      <div className="panel flex items-center justify-between py-4 px-6 border-b border-border">
        <h2 className="t-h2">{block.sectionTitle}</h2>
        {block.viewAllLabel && block.viewAllLink && (
          <Link href={block.viewAllLink} className="btn-cta text-xs py-2 px-4">
            {block.viewAllLabel}
          </Link>
        )}
      </div>

      <div className="ticker-wrap">
        <div className="ticker-track t-meta font-bold uppercase tracking-wider">
          {tickerItems.map((title, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="text-destructive">{'///'}</span>
              {title}
            </span>
          ))}
        </div>
      </div>

      <div
        className="grid grid-cols-1"
        style={{ gap: '1px', background: 'var(--foreground)' }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '1px', background: 'var(--foreground)' }}
        >
          {bigItems.map((emergencyCase, i) => {
            const photo = getFirstPhoto(emergencyCase)
            return (
              <div
                key={emergencyCase.id}
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: '1px', background: 'var(--foreground)' }}
              >
                <Link
                  href={`/acil-vakalar/${emergencyCase.slug}`}
                  className="relative aspect-square overflow-hidden bg-stone-200 group"
                >
                  {photo && (
                    <Media
                      resource={photo}
                      fill
                      imgClassName="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  )}
                </Link>
                <Link
                  href={`/acil-vakalar/${emergencyCase.slug}`}
                  className="bg-[#C5F0E8] p-6 flex flex-col justify-center gap-3 hover:bg-[#B0E6DA] transition-colors"
                >
                  <span className="t-meta font-bold text-destructive border border-destructive px-2 py-1 w-fit uppercase">
                    {labels.codeRed || 'CODE RED'} {String(89 + i).padStart(3, '0')}
                  </span>
                  <h3 className="t-h2">{emergencyCase.title}</h3>
                  <p className="t-body text-foreground/70">
                    {emergencyCase.targetAmount > 0
                      ? `${(emergencyCase.collectedAmount ?? 0).toLocaleString('tr-TR')} / ${emergencyCase.targetAmount.toLocaleString('tr-TR')} TL`
                      : ''}
                  </p>
                </Link>
              </div>
            )
          })}
        </div>

        {smallItems.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: '1px', background: 'var(--foreground)' }}
          >
            {smallItems.map((emergencyCase, i) => {
              const photo = getFirstPhoto(emergencyCase)
              return (
                <Link
                  key={emergencyCase.id}
                  href={`/acil-vakalar/${emergencyCase.slug}`}
                  className="bg-white hover:bg-[#C5F0E8] transition-colors group"
                >
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
                      {photo && (
                        <Media
                          resource={photo}
                          fill
                          imgClassName="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1 p-4 flex-1">
                      <span className="t-meta font-bold text-destructive uppercase">
                        {labels.codeRed || 'CODE RED'} {String(91 + i).padStart(3, '0')}
                      </span>
                      <h3 className="t-body font-bold line-clamp-2">
                        {emergencyCase.title}
                      </h3>
                      {emergencyCase.targetAmount > 0 && (
                        <p className="t-meta text-foreground/70">
                          {(emergencyCase.collectedAmount ?? 0).toLocaleString('tr-TR')} /{' '}
                          {emergencyCase.targetAmount.toLocaleString('tr-TR')} TL
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
