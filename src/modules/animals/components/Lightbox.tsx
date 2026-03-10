'use client'

import React, { useEffect, useState, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type LightboxProps = {
  photos: MediaType[]
  open: boolean
  initialIndex: number
  onOpenChange: (open: boolean) => void
  labels: {
    close: string
    prev: string
    next: string
    imageOf: string
  }
}

export function Lightbox({ photos, open, initialIndex, onOpenChange, labels }: LightboxProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(initialIndex)

  useEffect(() => {
    if (!api || !open) return
    api.scrollTo(initialIndex, true)
    setCurrent(initialIndex)
  }, [api, open, initialIndex])

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => { api.off('select', onSelect) }
  }, [api])

  const handlePrev = useCallback(() => api?.scrollPrev(), [api])
  const handleNext = useCallback(() => api?.scrollNext(), [api])

  const counter = labels.imageOf
    .replace('{current}', String(current + 1))
    .replace('{total}', String(photos.length))

  return (
    <Dialog open={open} onOpenChange={(newOpen) => onOpenChange(newOpen)}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl gap-0 p-0 bg-black/95"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-white/70">{counter}</span>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-white hover:bg-white/10"
            onClick={() => onOpenChange(false)}
            aria-label={labels.close}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {photos.map((photo, idx) => (
                <CarouselItem key={photo.id ?? idx}>
                  <div className="relative aspect-[4/3] w-full">
                    <Media
                      resource={photo}
                      fill
                      imgClassName="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Custom nav buttons */}
          {photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                onClick={handlePrev}
                aria-label={labels.prev}
              >
                <ChevronLeft className="size-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                onClick={handleNext}
                aria-label={labels.next}
              >
                <ChevronRight className="size-6" />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
