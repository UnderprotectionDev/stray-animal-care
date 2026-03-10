import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { SupporterComment } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { SupporterCommentsCarousel } from './SupporterCommentsCarousel'

type SupporterCommentsSectionProps = {
  comments: SupporterComment[]
}

export async function SupporterCommentsSection({ comments }: SupporterCommentsSectionProps) {
  const t = await getTranslations('home.supporters')

  if (!comments.length) return null

  return (
    <Section className="bg-muted/50">
      <Container>
        <Heading as="h2" className="mb-10 text-center">{t('title')}</Heading>
        <SupporterCommentsCarousel comments={comments} />
      </Container>
    </Section>
  )
}
