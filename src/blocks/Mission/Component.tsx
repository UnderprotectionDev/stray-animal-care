import React from 'react'
import type { MissionBlock as MissionBlockType } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CheckCircle } from 'lucide-react'

export const MissionBlockComponent: React.FC<MissionBlockType> = ({
  title,
  content,
  image,
  goals,
  ctaLabel,
  ctaLink,
}) => {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            {title && <Heading as="h2" className="mb-6">{title}</Heading>}
            {content && <RichText data={content} className="prose prose-lg" />}
            {goals && goals.length > 0 && (
              <ul className="mt-6 space-y-3">
                {goals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-secondary" />
                    <span>{goal.text}</span>
                  </li>
                ))}
              </ul>
            )}
            {ctaLabel && ctaLink && (
              <div className="mt-8">
                <Button render={<Link href={ctaLink} />}>{ctaLabel}</Button>
              </div>
            )}
          </div>
          {image && typeof image !== 'number' && (
            <div className="overflow-hidden rounded-xl">
              <Media resource={image} className="w-full" />
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
