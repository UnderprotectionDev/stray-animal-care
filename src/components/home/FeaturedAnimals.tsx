import React from 'react'
import type { Animal, Media as MediaType, SiteSetting } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'

type FeaturedAnimalsBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeFeaturedAnimals' }>

type Props = {
  block: FeaturedAnimalsBlock
  animals: Animal[]
}

function AnimalCard({ animal, block }: { animal: Animal; block: FeaturedAnimalsBlock }) {
  const firstPhoto =
    animal.photos && animal.photos.length > 0 ? animal.photos[0] : null
  const photo = firstPhoto && typeof firstPhoto !== 'number' ? firstPhoto : null
  const animalStatus = animal.animalStatus ?? 'tedavide'
  const statusColor = animalStatus === 'acil' ? 'text-red-500' : 'text-[var(--accent)]'

  const statusMap: Record<string, string | null | undefined> = {
    tedavide: block.statusLabels?.tedavide,
    'kalici-bakim': block.statusLabels?.kaliciBakim,
    acil: block.statusLabels?.acil,
  }
  const typeMap: Record<string, string | null | undefined> = {
    kedi: block.typeLabels?.kedi,
    kopek: block.typeLabels?.kopek,
  }

  return (
    <Link
      href={`/canlarimiz/${animal.slug}`}
      className="h-[320px] relative group overflow-hidden bg-[var(--muted)]"
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
          {statusMap[animalStatus] || animalStatus}
        </span>
        <span className="t-h2 text-white">{animal.name}</span>
        <div className="flex gap-3">
          {animal.type && (
            <span className="t-meta text-white/70">
              {typeMap[animal.type] || animal.type}
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

export function FeaturedAnimals({ block, animals }: Props) {
  if (animals.length === 0) return null

  const cards = animals.slice(0, block.limit ?? 6)

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
      <div className="featured-animals-grid">
        {cards.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} block={block} />
        ))}
      </div>
    </section>
  )
}
