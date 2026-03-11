import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getFinancialData } from '../data/dashboard-queries'
import { FinancialCharts } from '../charts/FinancialCharts'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const FinancialOverview = async () => {
  const payload = await getPayload({ config: configPromise })
  const { monthlyFinancials, fundraising } = await getFinancialData(payload)

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
