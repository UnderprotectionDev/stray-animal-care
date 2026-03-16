'use client'

import React, { useCallback, useMemo } from 'react'
import { useRouter } from '@/i18n/navigation'
import type { Animal, Media as MediaType, SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Masonry, { type Item } from '@/components/Masonry'

type FeaturedAnimalsBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeFeaturedAnimals' }
>

type Props = {
  animals: Animal[]
  block: FeaturedAnimalsBlock
}

const STATUS_COLORS: Record<string, string> = {
  acil: 'var(--cta)',
  tedavide: 'var(--health)',
  'kalici-bakim': 'var(--stats)',
}

export default function AnimalMasonryGallery({ animals, block }: Props) {
  const router = useRouter()
  const handleItemClick = useCallback(
    (item: { url: string }) => router.push(item.url),
    [router],
  )

  const statusMap = useMemo<Record<string, string | null | undefined>>(() => ({
    tedavide: block.statusLabels?.tedavide,
    'kalici-bakim': block.statusLabels?.kaliciBakim,
    acil: block.statusLabels?.acil,
  }), [block.statusLabels])

  const typeMap = useMemo<Record<string, string | null | undefined>>(() => ({
    kedi: block.typeLabels?.kedi,
    kopek: block.typeLabels?.kopek,
  }), [block.typeLabels])

  const genderMap = useMemo<Record<string, string | null | undefined>>(() => ({
    erkek: block.genderLabels?.erkek ?? 'Erkek',
    disi: block.genderLabels?.disi ?? 'Dişi',
    bilinmiyor: block.genderLabels?.bilinmiyor ?? 'Bilinmiyor',
  }), [block.genderLabels])

  const booleanLabels = useMemo(() => ({
    spayedYes: block.booleanLabels?.spayedYes ?? 'Kısır',
    spayedNo: block.booleanLabels?.spayedNo ?? 'Kısır Değil',
    vaccinatedYes: block.booleanLabels?.vaccinatedYes ?? 'Aşılı',
    vaccinatedNo: block.booleanLabels?.vaccinatedNo ?? 'Aşısız',
  }), [block.booleanLabels])

  const items = useMemo(
    () =>
      animals.map((animal) => {
        const firstPhoto =
          animal.photos && animal.photos.length > 0 ? animal.photos[0] : null
        const photo =
          firstPhoto && typeof firstPhoto !== 'number'
            ? (firstPhoto as MediaType)
            : null
        const imageUrl = photo ? getMediaUrl(photo.url) : ''
        const height = photo?.height ?? (300 + ((animal.id * 37) % 200))

        return {
          id: String(animal.id),
          img: imageUrl,
          url: `/canlarimiz/${animal.slug}`,
          height,
          title: animal.name,
          subtitle: statusMap[animal.animalStatus ?? ''] || '',
          badgeColor: animal.animalStatus === 'acil' ? '#EF303B' : '#2D936C',
          meta: {
            type: animal.type,
            animalStatus: animal.animalStatus,
            age: animal.age,
            gender: animal.gender,
            isSpayed: animal.isSpayed,
            isVaccinated: animal.isVaccinated,
            location: animal.location,
          },
        }
      }),
    [animals, statusMap],
  )

  const renderAnimalOverlay = useCallback(
    (item: Item) => {
      const meta = item.meta || {}
      const status = meta.animalStatus as string
      const statusLabel = statusMap[status] || status
      const statusColor = STATUS_COLORS[status] || 'var(--health)'
      const typeLabel = String(typeMap[meta.type as string] || meta.type || '')
      const genderLabel = String(genderMap[meta.gender as string] || meta.gender || '')
      const age = meta.age ? String(meta.age) : ''
      const location = meta.location ? String(meta.location) : ''
      const spayedLabel = meta.isSpayed ? booleanLabels.spayedYes : booleanLabels.spayedNo
      const vaccinatedLabel = meta.isVaccinated ? booleanLabels.vaccinatedYes : booleanLabels.vaccinatedNo

      return (
        <div className="h-full flex flex-col">
          {/* Collapsed: status bar always visible */}
          <div className="flex items-center gap-2 px-3 py-2 min-h-[38px]">
            <span
              className="inline-block w-2 h-2 flex-shrink-0"
              style={{ backgroundColor: statusColor }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-wider font-bold truncate"
              style={{ color: statusColor }}
            >
              {statusLabel}
            </span>
            <span className="font-heading text-xs font-bold text-[var(--palette-black)] truncate ml-auto">
              {item.title}
            </span>
          </div>

          {/* Expanded: detailed info (animated via GSAP) */}
          <div className="shift-overlay-content opacity-0 translate-y-2 px-3 pb-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[11px] text-[var(--warm-gray)] font-mono">
              {typeLabel && <span>{typeLabel}</span>}
              {typeLabel && age && <span>·</span>}
              {age && <span>{age}</span>}
            </div>

            {genderLabel && (
              <span className="text-[11px] text-[var(--warm-gray)] font-mono">
                {genderLabel}
              </span>
            )}

            <div className="flex flex-wrap gap-1.5 mt-1">
              <span
                className={`inline-flex items-center border-[1px] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                  meta.isSpayed
                    ? 'border-[var(--health)] text-[var(--health)]'
                    : 'border-[var(--warm-gray)] text-[var(--warm-gray)]'
                }`}
              >
                {meta.isSpayed ? '✓' : '✗'} {spayedLabel}
              </span>
              <span
                className={`inline-flex items-center border-[1px] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                  meta.isVaccinated
                    ? 'border-[var(--stats)] text-[var(--stats)]'
                    : 'border-[var(--warm-gray)] text-[var(--warm-gray)]'
                }`}
              >
                {meta.isVaccinated ? '✓' : '✗'} {vaccinatedLabel}
              </span>
            </div>

            {location && (
              <span className="text-[10px] text-[var(--warm-gray)] font-mono mt-0.5 truncate">
                &#x25CB; {location}
              </span>
            )}
          </div>
        </div>
      )
    },
    [statusMap, typeMap, genderMap, booleanLabels],
  )

  return (
    <div
      className="relative w-full bg-white border-[1.5px] border-[var(--border)] p-4"
      style={{ minHeight: '500px' }}
    >
      <Masonry
        items={items}
        animateFrom="bottom"
        stagger={0.06}
        blurToFocus
        scaleOnHover={false}
        onItemClick={handleItemClick}
        renderOverlay={renderAnimalOverlay}
      />
    </div>
  )
}
