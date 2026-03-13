import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getFinancialData } from '../data/dashboard-queries'
import { FinancialCharts } from '../charts/FinancialCharts'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const FinancialOverview = async () => {
  let monthlyFinancials: { month: string; donation: number; expense: number }[] = []
  let fundraising: { name: string; target: number; collected: number }[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const data = await getFinancialData(payload)
    monthlyFinancials = data.monthlyFinancials
    fundraising = data.fundraising
  } catch (error) {
    console.error('FinancialOverview widget error:', error)
  }

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__chart-section`}>
        <h3 className={`${baseClass}__section-title`}>Finansal Göstergeler</h3>
        <div className={`${baseClass}__chart-grid`}>
          <FinancialCharts
            monthly={monthlyFinancials}
            fundraising={fundraising}
          />
        </div>
      </div>
    </div>
  )
}

export default FinancialOverview
