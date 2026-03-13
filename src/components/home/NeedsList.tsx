import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Priority = 'acil' | 'yuksek' | 'orta' | 'dusuk'

interface NeedItem {
  nameKey: string
  subKey: string
  priority: Priority
  qtyValue: number
  qtyUnitKey: string
  stockCurrent: number
  stockTarget: number
}

const MOCK_NEEDS: NeedItem[] = [
  {
    nameKey: 'antibiyotik',
    subKey: 'acilTedavi',
    priority: 'acil',
    qtyValue: 20,
    qtyUnitKey: 'unitBox',
    stockCurrent: 3,
    stockTarget: 20,
  },
  {
    nameKey: 'kuruMama',
    subKey: 'forCats',
    priority: 'yuksek',
    qtyValue: 50,
    qtyUnitKey: 'unitKg',
    stockCurrent: 12,
    stockTarget: 50,
  },
  {
    nameKey: 'yasMama',
    subKey: 'forDogs',
    priority: 'orta',
    qtyValue: 30,
    qtyUnitKey: 'unitPiece',
    stockCurrent: 18,
    stockTarget: 30,
  },
  {
    nameKey: 'battaniye',
    subKey: 'kisHazirlik',
    priority: 'orta',
    qtyValue: 15,
    qtyUnitKey: 'unitPiece',
    stockCurrent: 9,
    stockTarget: 15,
  },
  {
    nameKey: 'tasimaKafesi',
    subKey: 'transferIcin',
    priority: 'dusuk',
    qtyValue: 5,
    qtyUnitKey: 'unitPiece',
    stockCurrent: 3,
    stockTarget: 5,
  },
]

const PRIORITY_BADGE_CLASS: Record<Priority, string> = {
  acil: 'badge-sys-dark',
  yuksek: 'badge-sys',
  orta: 'badge-sys',
  dusuk: 'badge-sys-dark',
}

const PRIORITY_KEY: Record<Priority, string> = {
  acil: 'priorityAcil',
  yuksek: 'priorityYuksek',
  orta: 'priorityOrta',
  dusuk: 'priorityDusuk',
}

const CARD_CLASS: Record<string, string> = {
  hero: 'needs-card needs-card-hero',
  high: 'needs-card needs-card-high',
  mid1: 'needs-card needs-card-mid-1',
  mid2: 'needs-card needs-card-mid-2',
  low: 'needs-card needs-card-low',
}

function MeterBar({
  current,
  target,
  priority,
  label,
}: {
  current: number
  target: number
  priority: Priority
  label: string
}) {
  const pct = Math.min(Math.round((current / target) * 100), 100)
  return (
    <div
      className="needs-meter"
      role="meter"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={target}
      aria-label={label}
    >
      <div
        className="needs-meter-fill"
        data-priority={priority}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export async function NeedsList() {
  const t = await getTranslations('home.needs')

  const hero = MOCK_NEEDS[0]!
  const high = MOCK_NEEDS[1]!
  const mid1 = MOCK_NEEDS[2]!
  const mid2 = MOCK_NEEDS[3]!
  const low = MOCK_NEEDS[4]!

  return (
    <section>
      <div className="panel py-4 px-6 flex items-center justify-between border-b border-border">
        <h2 className="t-h2">{t('title')}</h2>
        <Link href="/ihtiyac-listesi" className="btn-cta text-xs py-2 px-4">
          {t('viewAll')}
        </Link>
      </div>

      <div className="needs-grid">
        {/* HERO — Acil */}
        <div className={CARD_CLASS.hero}>
          <div>
            <span className={PRIORITY_BADGE_CLASS[hero.priority]}>
              {t(PRIORITY_KEY[hero.priority])}
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-3 uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t(hero.nameKey)}
            </h3>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t(hero.subKey)}
            </p>
          </div>
          <div>
            <div className="needs-qty-hero">
              {hero.qtyValue}
            </div>
            <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
              {t(hero.qtyUnitKey)} {t('needed')}
            </p>
            <MeterBar
              current={hero.stockCurrent}
              target={hero.stockTarget}
              priority={hero.priority}
              label={`${t(hero.nameKey)} ${t('stockLevel')}`}
            />
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>
              {hero.stockCurrent}/{hero.stockTarget} {t('inStock')}
            </p>
          </div>
        </div>

        {/* Yüksek */}
        <div className={CARD_CLASS.high}>
          <div>
            <span className={PRIORITY_BADGE_CLASS[high.priority]}>
              {t(PRIORITY_KEY[high.priority])}
            </span>
            <h3 className="text-lg font-black mt-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t(high.nameKey)}
            </h3>
            <p className="t-meta mt-0.5">{t(high.subKey)}</p>
          </div>
          <div>
            <div className="needs-qty-card">
              {high.qtyValue}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              {t(high.qtyUnitKey)}
            </p>
            <MeterBar
              current={high.stockCurrent}
              target={high.stockTarget}
              priority={high.priority}
              label={`${t(high.nameKey)} ${t('stockLevel')}`}
            />
          </div>
        </div>

        {/* Orta 1 */}
        <div className={CARD_CLASS.mid1}>
          <div>
            <span className={PRIORITY_BADGE_CLASS[mid1.priority]}>
              {t(PRIORITY_KEY[mid1.priority])}
            </span>
            <h3 className="text-lg font-black mt-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t(mid1.nameKey)}
            </h3>
            <p className="t-meta mt-0.5">{t(mid1.subKey)}</p>
          </div>
          <div>
            <div className="needs-qty-card">
              {mid1.qtyValue}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              {t(mid1.qtyUnitKey)}
            </p>
            <MeterBar
              current={mid1.stockCurrent}
              target={mid1.stockTarget}
              priority={mid1.priority}
              label={`${t(mid1.nameKey)} ${t('stockLevel')}`}
            />
          </div>
        </div>

        {/* Orta 2 */}
        <div className={CARD_CLASS.mid2}>
          <div>
            <span className={PRIORITY_BADGE_CLASS[mid2.priority]}>
              {t(PRIORITY_KEY[mid2.priority])}
            </span>
            <h3 className="text-lg font-black mt-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t(mid2.nameKey)}
            </h3>
            <p className="t-meta mt-0.5">{t(mid2.subKey)}</p>
          </div>
          <div>
            <div className="needs-qty-card">
              {mid2.qtyValue}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              {t(mid2.qtyUnitKey)}
            </p>
            <MeterBar
              current={mid2.stockCurrent}
              target={mid2.stockTarget}
              priority={mid2.priority}
              label={`${t(mid2.nameKey)} ${t('stockLevel')}`}
            />
          </div>
        </div>

        {/* Düşük */}
        <div className={CARD_CLASS.low}>
          <div>
            <span className={PRIORITY_BADGE_CLASS[low.priority]}>
              {t(PRIORITY_KEY[low.priority])}
            </span>
            <h3 className="text-lg font-black mt-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t(low.nameKey)}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {t(low.subKey)}
            </p>
          </div>
          <div>
            <div className="needs-qty-card">
              {low.qtyValue}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              {t(low.qtyUnitKey)}
            </p>
            <MeterBar
              current={low.stockCurrent}
              target={low.stockTarget}
              priority={low.priority}
              label={`${t(low.nameKey)} ${t('stockLevel')}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
