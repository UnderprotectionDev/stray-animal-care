import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getAnimalChartData } from '../data/dashboard-queries'
import { AnimalStatsCharts } from '../charts/AnimalStatsCharts'
import type { AnimalTypeDistribution, AnimalStatusDistribution, VaccinationRates } from '../charts/types'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const emptyVaccination: VaccinationRates = { vaccinated: 0, notVaccinated: 0, spayed: 0, notSpayed: 0, total: 0 }

const AnimalStats = async () => {
  let animalTypes: AnimalTypeDistribution[] = []
  let animalStatuses: AnimalStatusDistribution[] = []
  let vaccinationRates: VaccinationRates = emptyVaccination

  try {
    const payload = await getPayload({ config: configPromise })
    const data = await getAnimalChartData(payload)
    animalTypes = data.animalTypes
    animalStatuses = data.animalStatuses
    vaccinationRates = data.vaccinationRates
  } catch (error) {
    console.error('AnimalStats widget error:', error)
  }

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
