import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getAnimalChartData } from '../data/dashboard-queries'
import { AnimalStatsCharts } from '../charts/AnimalStatsCharts'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const AnimalStats = async () => {
  const payload = await getPayload({ config: configPromise })
  const { animalTypes, animalStatuses, vaccinationRates } = await getAnimalChartData(payload)

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__chart-section`}>
        <h3 className={`${baseClass}__section-title`}>Hayvan İstatistikleri</h3>
        <div className={`${baseClass}__chart-grid ${baseClass}__chart-grid--triple`}>
          <AnimalStatsCharts
            types={animalTypes}
            statuses={animalStatuses}
            vaccination={vaccinationRates}
          />
        </div>
      </div>
    </div>
  )
}

export default AnimalStats
