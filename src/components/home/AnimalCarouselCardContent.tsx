'use client'

import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Animal, Media as MediaType, SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type FeaturedAnimalsBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeFeaturedAnimals' }
>

type Props = {
  animal: Animal
  block: FeaturedAnimalsBlock
}

const statusColorMap: Record<string, string> = {
  acil: 'bg-cta text-white',
  tedavide: 'bg-health text-white',
  'kalici-bakim': 'bg-stats text-white',
}

export function AnimalCarouselCardContent({ animal, block }: Props) {
  const firstPhoto =
    animal.photos && animal.photos.length > 0 ? animal.photos[0] : null
  const photo = firstPhoto && typeof firstPhoto !== 'number' ? firstPhoto : null
  const photoUrl = photo ? getMediaUrl((photo as MediaType).url) : null

  const animalStatus = animal.animalStatus ?? 'tedavide'

  const statusMap: Record<string, string | null | undefined> = {
    tedavide: block.statusLabels?.tedavide,
    'kalici-bakim': block.statusLabels?.kaliciBakim,
    acil: block.statusLabels?.acil,
  }
  const typeMap: Record<string, string | null | undefined> = {
    kedi: block.typeLabels?.kedi,
    kopek: block.typeLabels?.kopek,
  }
  const genderMap: Record<string, string | null | undefined> = {
    erkek: block.genderLabels?.erkek,
    disi: block.genderLabels?.disi,
    bilinmiyor: block.genderLabels?.bilinmiyor,
  }

  return (
    <div className="px-8 pb-8 space-y-6">
      {/* Hero image */}
      {photoUrl && (
        <div className="relative w-full h-64 md:h-96 border-[1.5px] border-[var(--border)] overflow-hidden">
          <Image src={photoUrl} alt={animal.name} fill className="object-cover" />
        </div>
      )}

      {/* Status badge */}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`inline-block px-3 py-1 font-mono text-xs uppercase tracking-wider border-[1.5px] border-[var(--border)] ${statusColorMap[animalStatus] || 'bg-[var(--muted)]'}`}
        >
          {statusMap[animalStatus] || animalStatus}
        </span>

        {animal.isSpayed != null && (
          <span className="inline-block px-3 py-1 font-mono text-xs uppercase tracking-wider border-[1.5px] border-[var(--border)] bg-[var(--muted)]">
            {animal.isSpayed ? block.booleanLabels?.spayedYes : block.booleanLabels?.spayedNo}
          </span>
        )}
        {animal.isVaccinated != null && (
          <span className="inline-block px-3 py-1 font-mono text-xs uppercase tracking-wider border-[1.5px] border-[var(--border)] bg-[var(--muted)]">
            {animal.isVaccinated ? block.booleanLabels?.vaccinatedYes : block.booleanLabels?.vaccinatedNo}
          </span>
        )}
      </div>

      {/* Info row */}
      <div className="flex flex-wrap gap-4 font-mono text-sm text-[var(--muted-foreground)]">
        {animal.type && <span>{typeMap[animal.type] || animal.type}</span>}
        {animal.age && <span>{animal.age}</span>}
        {animal.gender && <span>{genderMap[animal.gender] || animal.gender}</span>}
        {animal.location && <span>{animal.location}</span>}
      </div>

      {/* CTA */}
      <Link
        href={`/canlarimiz/${animal.slug}`}
        className="btn-cta inline-block text-sm py-3 px-6"
      >
        {block.adoptCta || 'DETAYLARI GÖR'}
      </Link>
    </div>
  )
}
