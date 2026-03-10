import React from 'react'
import type { TimelineBlock as TimelineBlockType } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'

export const TimelineBlockComponent: React.FC<TimelineBlockType> = ({ title, items }) => {
  return (
    <Section>
      <Container>
        {title && <Heading as="h2" className="mb-10 text-center">{title}</Heading>}
        {items && items.length > 0 && (
          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-px" />

            <div className="space-y-8">
              {items.map((item, index) => (
                <div key={index} className="relative pl-12 md:pl-0">
                  {/* Dot */}
                  <div className="absolute left-2.5 top-1 size-3 rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1.5" />

                  <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    {item.time && (
                      <span className="mb-1 block text-sm font-medium text-primary">
                        {item.time}
                      </span>
                    )}
                    <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                    {item.description && (
                      <p className="mt-1 text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  )
}
