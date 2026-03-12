import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { EmergencyCase, Media as MediaType } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'

type ActiveEmergenciesProps = {
  cases: EmergencyCase[]
}

const PLACEHOLDER_CASES: { id: number; title: string; excerpt: string; imgSrc: string }[] = [
  {
    id: 801,
    title: 'KAZA GEÇİRMİŞ KEDİ',
    excerpt: 'Acil ortopedi ameliyatı gerekiyor. Klinik masrafları için destek aranıyor.',
    imgSrc: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop&crop=face',
  },
  {
    id: 802,
    title: 'TERK EDİLMİŞ YAVRULAR',
    excerpt: 'Ormana atılmış 5 yavru köpek. Acil geçici yuva ve mama desteği şart.',
    imgSrc: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&h=600&fit=crop&crop=face',
  },
]

function getFirstPhoto(c: EmergencyCase): MediaType | null {
  if (c.photos && c.photos.length > 0) {
    const p = c.photos[0]
    if (typeof p !== 'number') return p
  }
  if (c.beforePhoto && typeof c.beforePhoto !== 'number') return c.beforePhoto
  return null
}

export async function ActiveEmergencies({ cases }: ActiveEmergenciesProps) {
  const t = await getTranslations('home.featured')

  const usePlaceholder = cases.length === 0
  const tickerText = t('emergencyTicker')
  const tickerItems = usePlaceholder
    ? [tickerText, tickerText, tickerText, tickerText]
    : [...cases.map((c) => c.title).filter(Boolean), tickerText].flatMap((item) => [item, item])

  return (
    <section>
      {/* Ticker marquee — black bar with bold white text */}
      <div className="ticker-wrap">
        <div className="ticker-track t-meta font-bold uppercase tracking-wider">
          {tickerItems.map((title, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="text-destructive">///</span>
              {title}
            </span>
          ))}
        </div>
      </div>

      {/* Emergency cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '1px', background: 'var(--foreground)' }}>
        {usePlaceholder ? (
          <>
            {PLACEHOLDER_CASES.map((pc, i) => (
              <React.Fragment key={pc.id}>
                {/* Photo cell */}
                <div className="relative aspect-square overflow-hidden bg-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pc.imgSrc}
                    alt={pc.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                  />
                </div>
                {/* Info cell */}
                <div className="bg-[#C5F0E8] p-6 flex flex-col justify-center gap-3">
                  <span className="t-meta font-bold text-destructive border border-destructive px-2 py-1 w-fit uppercase">
                    {t('emergencyCodeRed')} {String(89 + i).padStart(3, '0')}
                  </span>
                  <h3 className="t-h2">{pc.title}</h3>
                  <p className="t-body">{pc.excerpt}</p>
                </div>
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            {cases.slice(0, 2).map((emergencyCase, i) => {
              const photo = getFirstPhoto(emergencyCase)
              return (
                <React.Fragment key={emergencyCase.id}>
                  {/* Photo cell */}
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
                  {/* Info cell */}
                  <Link
                    href={`/acil-vakalar/${emergencyCase.slug}`}
                    className="bg-[#C5F0E8] p-6 flex flex-col justify-center gap-3 hover:bg-[#B0E6DA] transition-colors"
                  >
                    <span className="t-meta font-bold text-destructive border border-destructive px-2 py-1 w-fit uppercase">
                      {t('emergencyCodeRed')} {String(89 + i).padStart(3, '0')}
                    </span>
                    <h3 className="t-h2">{emergencyCase.title}</h3>
                    <p className="t-body text-foreground/70">
                      {emergencyCase.targetAmount > 0
                        ? `${(emergencyCase.collectedAmount ?? 0).toLocaleString('tr-TR')} / ${emergencyCase.targetAmount.toLocaleString('tr-TR')} TL`
                        : ''}
                    </p>
                  </Link>
                </React.Fragment>
              )
            })}
          </>
        )}
      </div>
    </section>
  )
}
