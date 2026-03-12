import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { Animal, Media as MediaType } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'

type FeaturedAnimalsProps = {
  animals: Animal[]
}

const PLACEHOLDER_IMAGES: Record<number, string> = {
  901: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&h=800&fit=crop&crop=face',
  902: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=800&fit=crop&crop=face',
  903: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=800&fit=crop&crop=face',
  904: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=800&fit=crop&crop=face',
  905: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=800&fit=crop&crop=face',
}

const PLACEHOLDER_ANIMALS: Animal[] = [
  { id: 901, name: 'Boncuk', slug: 'boncuk', type: 'kedi', age: '2 yaş', gender: 'disi', animalStatus: 'tedavide', featured: true, photos: [], createdAt: '', updatedAt: '', _status: 'published' },
  { id: 902, name: 'Karamel', slug: 'karamel', type: 'kopek', age: '4 yaş', gender: 'erkek', animalStatus: 'kalici-bakim', featured: true, photos: [], createdAt: '', updatedAt: '', _status: 'published' },
  { id: 903, name: 'Pamuk', slug: 'pamuk', type: 'kedi', age: '1 yaş', gender: 'disi', animalStatus: 'tedavide', featured: true, photos: [], createdAt: '', updatedAt: '', _status: 'published' },
  { id: 904, name: 'Çakıl', slug: 'cakil', type: 'kopek', age: '3 yaş', gender: 'erkek', animalStatus: 'acil', featured: true, photos: [], createdAt: '', updatedAt: '', _status: 'published' },
  { id: 905, name: 'Minnoş', slug: 'minnos', type: 'kedi', age: '6 ay', gender: 'disi', animalStatus: 'tedavide', featured: true, photos: [], createdAt: '', updatedAt: '', _status: 'published' },
]

function PlaceholderCard({ animal, t }: { animal: Animal; t: Awaited<ReturnType<typeof getTranslations<'home.featured'>>> }) {
  const animalStatus = animal.animalStatus ?? 'tedavide'
  const statusColor =
    animalStatus === 'acil' ? 'text-red-500' : 'text-[var(--accent)]'
  const imgSrc = PLACEHOLDER_IMAGES[animal.id]

  return (
    <Link
      href={`/canlarimiz/${animal.slug}`}
      className="aspect-[3/4] relative group overflow-hidden bg-[var(--muted)]"
    >
      {imgSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={animal.name}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      )}
      <div className="photo-overlay-gradient absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
        <span className={`t-meta font-bold uppercase ${statusColor}`}>
          {t(`animalStatus.${animalStatus}` as Parameters<typeof t>[0])}
        </span>
        <span className="t-h2 text-white">{animal.name}</span>
        <div className="flex gap-3">
          {animal.type && (
            <span className="t-meta text-white/70">
              {t(`animalType.${animal.type}` as Parameters<typeof t>[0])}
            </span>
          )}
          {animal.age && (
            <span className="t-meta text-white/70">{animal.age}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

function MagazineCard({ animal, t }: { animal: Animal; t: Awaited<ReturnType<typeof getTranslations<'home.featured'>>> }) {
  const firstPhoto =
    animal.photos && animal.photos.length > 0 ? animal.photos[0] : null
  const photo = firstPhoto && typeof firstPhoto !== 'number' ? firstPhoto : null
  const animalStatus = animal.animalStatus ?? 'tedavide'

  const statusColor =
    animalStatus === 'acil' ? 'text-red-500' : 'text-[var(--accent)]'

  return (
    <Link
      href={`/canlarimiz/${animal.slug}`}
      className="aspect-[3/4] relative group overflow-hidden bg-[var(--muted)]"
    >
      {photo && (
        <Media
          resource={photo as MediaType}
          fill
          imgClassName="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      )}
      <div className="photo-overlay-gradient absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
        <span className={`t-meta font-bold uppercase ${statusColor}`}>
          {t(`animalStatus.${animalStatus}` as Parameters<typeof t>[0])}
        </span>
        <span className="t-h2 text-white">{animal.name}</span>
        <div className="flex gap-3">
          {animal.type && (
            <span className="t-meta text-white/70">
              {t(`animalType.${animal.type}` as Parameters<typeof t>[0])}
            </span>
          )}
          {animal.age && (
            <span className="t-meta text-white/70">{animal.age}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

function CTACard({ t }: { t: Awaited<ReturnType<typeof getTranslations<'home.featured'>>> }) {
  return (
    <Link
      href="/canlarimiz"
      className="aspect-[3/4] relative group overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=800&fit=crop&crop=face"
        alt=""
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
      />
      <div className="photo-overlay-gradient absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center gap-1">
        <span className="t-h1 text-white">{t('adoptCta')}</span>
        <span className="t-meta text-[var(--accent)]">{t('adoptCtaLink')}</span>
      </div>
    </Link>
  )
}

export async function FeaturedAnimals({ animals }: FeaturedAnimalsProps) {
  const t = await getTranslations('home.featured')

  // Use placeholder data when no real animals exist
  const usePlaceholder = animals.length === 0
  const data = usePlaceholder ? PLACEHOLDER_ANIMALS : animals

  // Graceful degradation: only show CTA in row 2 when we have 4+ animals
  const row1 = data.slice(0, 3)
  const row2Animals = data.slice(3, 5)
  const showCTA = row2Animals.length > 0

  const CardComponent = usePlaceholder ? PlaceholderCard : MagazineCard

  return (
    <section>
      <div className="panel flex items-center justify-between py-4 px-6 border-b border-border">
        <h2 className="t-h2">{t('animalsTitle')}</h2>
        <Link href="/canlarimiz" className="btn-cta text-xs py-2 px-4">
          {t('animalsViewAll')}
        </Link>
      </div>
      <div className="featured-animals-grid">
        {row1.map((animal) => (
          <CardComponent key={animal.id} animal={animal} t={t} />
        ))}
        {showCTA && (
          <>
            {row2Animals[0] && (
              <CardComponent key={row2Animals[0].id} animal={row2Animals[0]} t={t} />
            )}
            <CTACard t={t} />
            {row2Animals[1] && (
              <CardComponent key={row2Animals[1].id} animal={row2Animals[1]} t={t} />
            )}
          </>
        )}
      </div>
    </section>
  )
}
