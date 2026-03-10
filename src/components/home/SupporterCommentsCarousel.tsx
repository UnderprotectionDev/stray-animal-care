'use client'

import React from 'react'
import { useFormatter } from 'next-intl'
import type { SupporterComment } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Quote } from 'lucide-react'

type SupporterCommentsCarouselProps = {
  comments: SupporterComment[]
}

export function SupporterCommentsCarousel({ comments }: SupporterCommentsCarouselProps) {
  const format = useFormatter()

  return (
    <Carousel
      opts={{ align: 'start', loop: true }}
      className="mx-auto w-full max-w-6xl"
    >
      <CarouselContent>
        {comments.map((comment) => (
          <CarouselItem key={comment.id} className="basis-full md:basis-1/3">
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4">
                <Quote className="size-6 text-primary/40" />
                <p className="flex-1 text-sm italic text-muted-foreground">
                  &ldquo;{comment.comment}&rdquo;
                </p>
                <div className="mt-auto">
                  <p className="text-sm font-medium">{comment.name}</p>
                  {comment.date && (
                    <p className="text-xs text-muted-foreground">
                      {format.dateTime(new Date(comment.date), { dateStyle: 'medium' })}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 md:-left-12" />
      <CarouselNext className="-right-4 md:-right-12" />
    </Carousel>
  )
}
