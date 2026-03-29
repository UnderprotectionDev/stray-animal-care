import { getLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { UiString } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { NotFoundScene } from './not-found-scene'

export default async function NotFound() {
  const locale = await getLocale()
  const ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  const isEn = locale === 'en'

  return (
    <div className="not-found-grid relative min-h-[calc(100dvh-3.5rem)] overflow-hidden border-t-[1.5px] border-foreground/20">
      {/* Animated paw trail + ambient elements */}
      <NotFoundScene />

      {/* ── Cell 1: Giant "4" ── */}
      <div className="not-found-cell-1 relative flex items-center justify-center border-b-[1.5px] border-r-[1.5px] border-foreground/20 bg-cta/[0.06]">
        <span className="t-outline select-none font-heading text-[clamp(6rem,18vw,14rem)] leading-none" aria-hidden="true">
          4
        </span>
        {/* Corner label */}
        <span className="t-comment absolute left-3 top-3 text-foreground/40">// ERROR</span>
      </div>

      {/* ── Cell 2: Giant "0" ── */}
      <div className="not-found-cell-2 relative flex items-center justify-center border-b-[1.5px] border-foreground/20 bg-stats/[0.06]">
        <span className="t-outline select-none font-heading text-[clamp(6rem,18vw,14rem)] leading-none" aria-hidden="true">
          0
        </span>
      </div>

      {/* ── Cell 3: Giant "4" ── */}
      <div className="not-found-cell-3 relative flex items-center justify-center border-r-[1.5px] border-foreground/20 bg-emergency/[0.06]">
        <span className="t-outline select-none font-heading text-[clamp(6rem,18vw,14rem)] leading-none" aria-hidden="true">
          4
        </span>
        {/* Large decorative paw in this cell */}
        <svg
          className="absolute bottom-4 right-4 size-20 text-foreground/[0.04] sm:size-28 md:size-36"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <ellipse cx="8" cy="6" rx="2.5" ry="3" />
          <ellipse cx="16" cy="6" rx="2.5" ry="3" />
          <ellipse cx="4" cy="12" rx="2" ry="2.5" />
          <ellipse cx="20" cy="12" rx="2" ry="2.5" />
          <path d="M7 16c0-3 2.5-5 5-5s5 2 5 5c0 2.5-2 4.5-5 4.5S7 18.5 7 16z" />
        </svg>
      </div>

      {/* ── Cell 4: Content ── */}
      <div className="not-found-cell-4 relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 md:px-16 lg:px-20">
        {/* Accessible heading */}
        <h1 className="sr-only">404 — {isEn ? 'Page Not Found' : 'Sayfa Bulunamadı'}</h1>

        {/* Visible heading — inline 404 */}
        <div className="mb-2 flex items-baseline gap-3">
          <span className="font-heading text-5xl text-cta sm:text-6xl md:text-7xl">404</span>
          <div className="h-[1.5px] flex-1 bg-foreground/20" aria-hidden="true" />
        </div>

        <h2 className="t-h1 mt-4 max-w-lg uppercase">
          {isEn ? 'This page wandered off' : 'Bu sayfa kaybolmuş'}
        </h2>

        <p className="t-body mt-4 max-w-md text-muted-foreground">
          {ui?.notFound?.message ?? 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.'}
        </p>

        {/* Divider */}
        <div className="my-8 h-[1.5px] w-24 bg-foreground/30" aria-hidden="true" />

        {/* CTA */}
        <div>
          <Button
            size="lg"
            render={<Link href="/" />}
            className="btn-cta px-10 text-base font-bold uppercase tracking-wider"
          >
            {ui?.notFound?.goHome ?? (isEn ? 'Go Home' : 'Ana Sayfaya Git')}
          </Button>
        </div>

        {/* Bottom corner accent */}
        <span className="t-comment absolute bottom-3 right-4 text-foreground/30">
          // {isEn ? 'PAGE_NOT_FOUND' : 'SAYFA_BULUNAMADI'}
        </span>
      </div>
    </div>
  )
}
