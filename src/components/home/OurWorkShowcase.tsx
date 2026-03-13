import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'

type OurWorkShowcaseProps = {
  siteSettings: SiteSetting
}

const ACTIVITY_KEYS = [
  'feeding',
  'treatment',
  'spaying',
  'emergency',
  'vaccination',
  'shelter',
] as const

const ACTIVITY_NUMBERS: Record<string, string> = {
  feeding: '01',
  treatment: '02',
  spaying: '03',
  emergency: '04',
  vaccination: '05',
  shelter: '06',
}

const PLACEHOLDER_IMAGES: Record<string, string> = {
  feeding:
    'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=600&h=400&fit=crop',
  treatment:
    'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&h=400&fit=crop',
  spaying:
    'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600&h=400&fit=crop',
  emergency:
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
  vaccination:
    'https://images.unsplash.com/photo-1583337130417-13104dec14c8?w=600&h=400&fit=crop',
  shelter:
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
}

export async function OurWorkShowcase({ siteSettings }: OurWorkShowcaseProps) {
  const t = await getTranslations('home.ourWork')

  const activities = siteSettings.ourWorkActivities ?? []

  return (
    <section>
      <div className="panel flex items-center justify-between py-4 px-6 border-b border-border">
        <h2 className="t-h2">{t('sectionTitle')}</h2>
        <Link href="/calismalarimiz" className="btn-cta text-xs py-2 px-4">
          {t('viewAll')}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {ACTIVITY_KEYS.map((key) => {
          const activity = activities.find((a) => a.key === key)
          const images = activity?.images
          const firstImage =
            images && images.length > 0
              ? typeof images[0] === 'number'
                ? null
                : (images[0] as MediaType)
              : null
          const photoCount = images?.length ?? 0

          return (
            <div
              key={key}
              className="relative group overflow-hidden bg-[var(--muted)] border-b border-r border-border h-[280px]"
            >
              {firstImage ? (
                <Media
                  resource={firstImage}
                  fill
                  imgClassName="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={PLACEHOLDER_IMAGES[key]}
                  alt={t(`activities.${key}.title`)}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              )}
              <div className="photo-overlay-gradient absolute inset-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
                <span className="t-meta text-white/50 font-mono">
                  {ACTIVITY_NUMBERS[key]} // {t(`activities.${key}.title`).toUpperCase()}
                </span>
                <span className="t-h2 text-white">
                  {t(`activities.${key}.title`)}
                </span>
                <span className="t-meta text-white/70">
                  {t(`activities.${key}.description`)}
                </span>
                {photoCount > 0 && (
                  <span className="badge-sys mt-1 self-start">
                    {t('photoCount', { count: photoCount })}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
