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
  {
    id: 803,
    title: 'YARALANAN KÖPEK',
    excerpt: 'Trafik kazasında yaralanan köpek için acil ameliyat gerekiyor.',
    imgSrc: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop&crop=face',
  },
  {
    id: 804,
    title: 'DONMA TEHLİKESİ',
    excerpt: 'Soğukta kalan yavru kediler için acil barınak desteği.',
    imgSrc: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop&crop=face',
  },
  {
    id: 805,
    title: 'HASTA YAVRU',
    excerpt: 'Parvovirus teşhisi konulan yavru köpek tedavi altında.',
    imgSrc: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop&crop=face',
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

  const bigItems = usePlaceholder ? PLACEHOLDER_CASES.slice(0, 2) : cases.slice(0, 2)
  const smallItems = usePlaceholder ? PLACEHOLDER_CASES.slice(2, 5) : cases.slice(2, 5)

  return (
    <section>
      {/* Section title bar */}
      <div className="panel flex items-center justify-between py-4 px-6 border-b border-border">
        <h2 className="t-h2">{t('emergencySectionTitle')}</h2>
        <Link href="/acil-vakalar" className="btn-cta text-xs py-2 px-4">
          {t('emergencyViewAll')}
        </Link>
      </div>

      {/* Ticker marquee — black bar with bold white text */}
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

      {/* Emergency cards — magazine grid: 2 big top, 3 small bottom */}
      <div
        className="grid grid-cols-1"
        style={{ gap: '1px', background: 'var(--foreground)' }}
      >
        {/* Top row — 2 big cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '1px', background: 'var(--foreground)' }}
        >
          {bigItems.map((item, i) => {
            const isReal = !usePlaceholder
            const emergencyCase = isReal ? (item as EmergencyCase) : null
            const placeholder = !isReal ? (item as (typeof PLACEHOLDER_CASES)[0]) : null
            const photo = emergencyCase ? getFirstPhoto(emergencyCase) : null

            return (
              <div
                key={isReal ? emergencyCase!.id : placeholder!.id}
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: '1px', background: 'var(--foreground)' }}
              >
                {/* Photo cell */}
                {isReal ? (
                  <Link
                    href={`/acil-vakalar/${emergencyCase!.slug}`}
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
                ) : (
                  <div className="relative aspect-square overflow-hidden bg-stone-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={placeholder!.imgSrc}
                      alt={placeholder!.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale"
                    />
                  </div>
                )}

                {/* Info cell */}
                {isReal ? (
                  <Link
                    href={`/acil-vakalar/${emergencyCase!.slug}`}
                    className="bg-[#C5F0E8] p-6 flex flex-col justify-center gap-3 hover:bg-[#B0E6DA] transition-colors"
                  >
                    <span className="t-meta font-bold text-destructive border border-destructive px-2 py-1 w-fit uppercase">
                      {t('emergencyCodeRed')} {String(89 + i).padStart(3, '0')}
                    </span>
                    <h3 className="t-h2">{emergencyCase!.title}</h3>
                    <p className="t-body text-foreground/70">
                      {emergencyCase!.targetAmount > 0
                        ? `${(emergencyCase!.collectedAmount ?? 0).toLocaleString('tr-TR')} / ${emergencyCase!.targetAmount.toLocaleString('tr-TR')} TL`
                        : ''}
                    </p>
                  </Link>
                ) : (
                  <div className="bg-[#C5F0E8] p-6 flex flex-col justify-center gap-3">
                    <span className="t-meta font-bold text-destructive border border-destructive px-2 py-1 w-fit uppercase">
                      {t('emergencyCodeRed')} {String(89 + i).padStart(3, '0')}
                    </span>
                    <h3 className="t-h2">{placeholder!.title}</h3>
                    <p className="t-body">{placeholder!.excerpt}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom row — 3 small cards */}
        {smallItems.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: '1px', background: 'var(--foreground)' }}
          >
            {smallItems.map((item, i) => {
              const isReal = !usePlaceholder
              const emergencyCase = isReal ? (item as EmergencyCase) : null
              const placeholder = !isReal ? (item as (typeof PLACEHOLDER_CASES)[0]) : null
              const photo = emergencyCase ? getFirstPhoto(emergencyCase) : null

              const content = (
                <div className="flex flex-col h-full">
                  {/* Photo */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
                    {isReal && photo ? (
                      <Media
                        resource={photo}
                        fill
                        imgClassName="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : placeholder ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={placeholder.imgSrc}
                        alt={placeholder.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale"
                      />
                    ) : null}
                  </div>
                  {/* Info */}
                  <div className="flex flex-col gap-1 p-4 flex-1">
                    <span className="t-meta font-bold text-destructive uppercase">
                      {t('emergencyCodeRed')} {String(91 + i).padStart(3, '0')}
                    </span>
                    <h3 className="t-body font-bold line-clamp-2">
                      {isReal ? emergencyCase!.title : placeholder!.title}
                    </h3>
                    {isReal && emergencyCase!.targetAmount > 0 && (
                      <p className="t-meta text-foreground/70">
                        {(emergencyCase!.collectedAmount ?? 0).toLocaleString('tr-TR')} /{' '}
                        {emergencyCase!.targetAmount.toLocaleString('tr-TR')} TL
                      </p>
                    )}
                    {!isReal && placeholder && (
                      <p className="t-meta text-foreground/70 line-clamp-1">{placeholder.excerpt}</p>
                    )}
                  </div>
                </div>
              )

              return isReal ? (
                <Link
                  key={emergencyCase!.id}
                  href={`/acil-vakalar/${emergencyCase!.slug}`}
                  className="bg-white hover:bg-[#C5F0E8] transition-colors group"
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={placeholder!.id}
                  className="bg-white"
                >
                  {content}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
