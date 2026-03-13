import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getTrendData } from '../data/dashboard-queries'
import { TimeSeriesCharts } from '../charts/TimeSeriesCharts'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const TimeTrends = async () => {
  let monthlyTrends: { month: string; animals: number; posts: number; volunteers: number }[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    monthlyTrends = await getTrendData(payload)
  } catch (error) {
    console.error('TimeTrends widget error:', error)
  }

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__chart-section`}>
        <h3 className={`${baseClass}__section-title`}>Zaman Serisi Trendler</h3>
        <div className={`${baseClass}__chart-grid--full`}>
          <TimeSeriesCharts data={monthlyTrends} />
        </div>
      </div>
    </div>
  )
}

export default TimeTrends
