import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const MOCK_NEEDS = [
  { item: 'Kuru Mama (Kedi)', priority: 'Yüksek', qty: '50 kg' },
  { item: 'Yaş Mama (Köpek)', priority: 'Orta', qty: '30 adet' },
  { item: 'Antibiyotik', priority: 'Acil', qty: '20 kutu' },
  { item: 'Battaniye', priority: 'Orta', qty: '15 adet' },
  { item: 'Taşıma Kafesi', priority: 'Düşük', qty: '5 adet' },
]

export async function NeedsList() {
  const t = await getTranslations('home.needs')

  return (
    <section>
      <div className="panel py-4 px-6 flex items-center justify-between border-b border-border">
        <h2 className="t-h2">{t('title')}</h2>
        <Link href="/ihtiyac-listesi" className="btn-cta text-xs py-2 px-4">
          {t('viewAll')}
        </Link>
      </div>
      <div className="panel p-0 overflow-x-auto">
        <table className="sys-table">
          <thead>
            <tr>
              <th>{t('item')}</th>
              <th>{t('priority')}</th>
              <th>{t('quantity')}</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_NEEDS.map((need, i) => (
              <tr key={i}>
                <td className="font-bold">{need.item}</td>
                <td>
                  <span className={`badge-sys ${need.priority === 'Acil' ? 'critical' : need.priority === 'Yüksek' ? 'mint' : ''}`}>
                    {need.priority}
                  </span>
                </td>
                <td className="t-meta">{need.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
