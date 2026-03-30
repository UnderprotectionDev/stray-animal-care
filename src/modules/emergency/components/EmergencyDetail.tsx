import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getSocialLink } from '@/utilities/socialLinks'
import { interpolate } from '@/utilities/interpolate'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Heading } from '@/components/shared/Heading'
import { Media } from '@/components/Media'
import { PhotoGallery } from '@/modules/animals/components/PhotoGallery'
import { EmergencyDetailHero } from './EmergencyDetailHero'
import { EmergencyDetailSidebar } from './EmergencyDetailSidebar'
import { UpdateTimeline } from './UpdateTimeline'
import { BeforeAfterWrapper } from './BeforeAfterWrapper'
import RichText from '@/components/RichText'
import type {
  EmergencyCase,
  Animal,
  Media as MediaType,
  UiString,
  SiteSetting,
} from '@/payload-types'

/** Extract plain text from Lexical rich text JSON for excerpt */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractPlainText(node: any, limit = 160): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) {
    return node.children.map((c: unknown) => extractPlainText(c, limit)).join(' ')
  }
  if (node.root) return extractPlainText(node.root, limit)
  return ''
}

function getExcerpt(description: EmergencyCase['description'], maxLen = 160): string | null {
  if (!description) return null
  const text = extractPlainText(description).trim()
  if (!text) return null
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + '…' : text
}

type EmergencyDetailProps = {
  ec: EmergencyCase
  locale: string
  siteSettings?: SiteSetting | null
}

export async function EmergencyDetail({ ec, locale, siteSettings }: EmergencyDetailProps) {
  const ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null

  const collected = ec.collectedAmount ?? 0
  const target = ec.targetAmount ?? 0
  const isActive = ec.caseStatus === 'aktif'

  const photos = (ec.photos ?? []).filter(
    (p): p is MediaType => p !== null && typeof p === 'object',
  )

  const firstPhoto = photos.length > 0 ? photos[0] : null

  const beforePhoto =
    ec.beforePhoto && typeof ec.beforePhoto === 'object'
      ? (ec.beforePhoto as MediaType)
      : null
  const afterPhoto =
    ec.afterPhoto && typeof ec.afterPhoto === 'object'
      ? (ec.afterPhoto as MediaType)
      : null

  const relatedAnimal =
    ec.animal && typeof ec.animal === 'object' ? (ec.animal as Animal) : null

  const excerpt = getExcerpt(ec.description)

  const waLink = getSocialLink(siteSettings?.socialLinks, 'whatsapp')

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero Banner ── */}
      <EmergencyDetailHero
        title={ec.title}
        isActive={isActive}
        statusLabel={isActive ? 'Aktif' : 'Tamamlandı'}
        excerpt={excerpt}
        breadcrumbItems={[
          { label: ui?.layout?.breadcrumb?.home ?? 'Ana Sayfa', href: '/' },
          { label: ui?.emergency?.title ?? 'Acil Vakalar', href: '/acil-vakalar' },
          { label: ec.title },
        ]}
      />

      {/* ── Content + Sidebar ── */}
      <Container className="max-w-6xl py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo section */}
            {photos.length > 1 ? (
              <Section>
                <PhotoGallery
                  photos={photos}
                  animalName={ec.title}
                  labels={{
                    close: ui?.animals?.lightbox?.close ?? 'Kapat',
                    prev: ui?.animals?.lightbox?.prev ?? 'Önceki',
                    next: ui?.animals?.lightbox?.next ?? 'Sonraki',
                    imageOf: ui?.animals?.lightbox?.imageOf ?? '{current} / {total}',
                    noPhotos: ui?.animals?.detail?.noPhotos ?? 'Fotoğraf yok',
                  }}
                />
              </Section>
            ) : firstPhoto ? (
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Media
                  resource={firstPhoto}
                  fill
                  imgClassName="object-cover"
                  priority
                />
              </div>
            ) : null}

            {/* Before/After */}
            {beforePhoto && afterPhoto && (
              <Section>
                <Heading as="h2" className="t-h2 mb-4">
                  {ui?.emergency?.detail?.beforeAfter ?? 'Önce / Sonra'}
                </Heading>
                <div className="aspect-video overflow-hidden">
                  <BeforeAfterWrapper
                    before={beforePhoto}
                    after={afterPhoto}
                    labels={{
                      before: ui?.emergency?.detail?.before ?? 'Önce',
                      after: ui?.emergency?.detail?.after ?? 'Sonra',
                    }}
                  />
                </div>
              </Section>
            )}

            {/* Description */}
            {ec.description && (
              <Section>
                <Heading as="h2" className="t-h2 mb-4">
                  {ui?.emergency?.detail?.description ?? 'Açıklama'}
                </Heading>
                <div className="t-body text-foreground">
                  <RichText data={ec.description} enableGutter={false} />
                </div>
              </Section>
            )}

            {/* Timeline */}
            <Section>
              <Heading as="h2" className="t-h2 mb-4">
                {ui?.emergency?.detail?.updates ?? 'Güncellemeler'}
              </Heading>
              <UpdateTimeline
                updates={ec.updates ?? []}
                noUpdatesLabel={ui?.emergency?.detail?.noUpdates ?? 'Henüz güncelleme yok.'}
                locale={locale}
              />
            </Section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <EmergencyDetailSidebar
              collected={collected}
              target={target}
              progressLabel={ui?.emergency?.progress ?? 'İlerleme'}
              collectedLabel={ui?.emergency?.collected ?? 'Toplanan'}
              targetLabel={ui?.emergency?.target ?? 'Hedef'}
              donateLabel={ui?.emergency?.donateButton ?? 'Destek Ol'}
              relatedAnimal={
                relatedAnimal
                  ? { name: relatedAnimal.name, slug: relatedAnimal.slug ?? '' }
                  : null
              }
              relatedAnimalLabel={ui?.emergency?.detail?.relatedAnimal ?? 'İlgili Hayvan'}
              whatsAppPhone={waLink?.url}
              whatsAppMessage={
                relatedAnimal
                  ? interpolate(
                      ui?.animals?.detail?.whatsappMessage ??
                        '{name} hakkında bilgi almak istiyorum',
                      { name: ec.title },
                    )
                  : undefined
              }
              whatsAppLabel="WhatsApp"
              mobileDonateLabel={ui?.emergency?.donateButton ?? 'Destek Ol'}
              locale={locale}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
