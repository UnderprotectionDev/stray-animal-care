'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { Link } from '@/i18n/navigation'
import type { EmergencyCase, Media as MediaType, Animal } from '@/payload-types'

const fmt = (n: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)

type EmergencyCardProps = {
  ec: EmergencyCase
  index: number
  donateLabel?: string
}

export function EmergencyCard({ ec, index, donateLabel }: EmergencyCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const firstPhoto =
    ec.photos && ec.photos.length > 0 ? (ec.photos[0] as MediaType) : null
  const imageUrl =
    firstPhoto && typeof firstPhoto === 'object'
      ? firstPhoto.url ?? firstPhoto.thumbnailURL ?? ''
      : ''
  const imageAlt =
    firstPhoto && typeof firstPhoto === 'object'
      ? firstPhoto.alt ?? ec.title
      : ec.title

  const collected = ec.collectedAmount ?? 0
  const target = ec.targetAmount ?? 0
  const pct = target > 0 ? Math.min(Math.round((collected / target) * 100), 100) : 0
  const isActive = ec.caseStatus === 'aktif'

  const animalName =
    ec.animal && typeof ec.animal === 'object' ? (ec.animal as Animal).name : null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 * index, ease: 'easeOut' }}
      className="group/card border border-border/40 bg-background hover:border-border transition-colors duration-300"
    >
      <Link
        href={`/acil-vakalar/${ec.slug}`}
        className="block"
      >
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground/20">
              <span className="font-heading text-4xl uppercase opacity-20">SOS</span>
            </div>
          )}

          {/* Status pill */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                isActive
                  ? 'bg-destructive/90 text-white'
                  : 'bg-health/90 text-white'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-white/80'}`} />
              {isActive ? 'Aktif' : 'Tamamlandı'}
            </span>
          </div>

          {/* Bottom gradient for smooth transition */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Colored accent stripe */}
        <div className={`h-[2px] ${isActive ? 'bg-emergency' : 'bg-health'}`} />

        {/* Content */}
        <div className="px-4 pt-3 pb-4 space-y-2.5">
          {/* Animal name + title */}
          <div>
            {animalName && (
              <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                {animalName}
              </p>
            )}
            <h3 className="font-heading text-sm lg:text-[15px] font-bold uppercase leading-snug text-foreground line-clamp-2 group-hover/card:text-emergency transition-colors">
              {ec.title}
            </h3>
          </div>

          {/* Progress bar + amounts */}
          {target > 0 && (
            <div className="space-y-1.5">
              <div className="w-full h-1.5 bg-border/50 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${isActive ? 'bg-emergency' : 'bg-health'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>{fmt(collected)} / {fmt(target)}</span>
                <span className="font-bold text-foreground">{pct}%</span>
              </div>
            </div>
          )}

          {/* Donate link */}
          {isActive && donateLabel && (
            <p className="text-[11px] font-bold uppercase tracking-wider text-emergency group-hover/card:underline">
              {donateLabel} &rarr;
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
