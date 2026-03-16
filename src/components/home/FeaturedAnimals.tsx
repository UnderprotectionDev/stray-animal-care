'use client'

import React from 'react'
import type { Animal, Media as MediaType, SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { AnimatedSectionHeader } from './AnimatedSectionHeader'
import { AnimalCarouselCardContent } from './AnimalCarouselCardContent'
import { Carousel, Card } from '@/components/fancy/apple-cards-carousel'

type FeaturedAnimalsBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeFeaturedAnimals' }>

type Props = {
  block: FeaturedAnimalsBlock
  animals: Animal[]
}

export function FeaturedAnimals({ block, animals }: Props) {
  if (animals.length === 0) return null

  const cards = animals.slice(0, block.limit ?? 6)

  const statusMap: Record<string, string | null | undefined> = {
    tedavide: block.statusLabels?.tedavide,
    'kalici-bakim': block.statusLabels?.kaliciBakim,
    acil: block.statusLabels?.acil,
  }

  const carouselCards = cards.map((animal, index) => {
    const firstPhoto = animal.photos && animal.photos.length > 0 ? animal.photos[0] : null
    const photo = firstPhoto && typeof firstPhoto !== 'number' ? firstPhoto : null
    const photoUrl = photo ? getMediaUrl((photo as MediaType).url) : '/placeholder.svg'
    const animalStatus = animal.animalStatus ?? 'tedavide'

    return (
      <Card
        key={animal.id}
        index={index}
        layout
        card={{
          src: photoUrl,
          title: animal.name,
          category: statusMap[animalStatus] || animalStatus,
          content: <AnimalCarouselCardContent animal={animal} block={block} />,
        }}
      />
    )
  })

  return (
    <section className="bg-white">
      <AnimatedSectionHeader title={block.sectionTitle} viewAllLabel={block.viewAllLabel} viewAllLink={block.viewAllLink} />
      <Carousel items={carouselCards} />
    </section>
  )
}
