export interface StatusBreakdown {
  name: string
  value: number
  fill: string
}

export interface AnimalTypeDistribution {
  name: string
  value: number
  fill: string
}

export interface AnimalStatusDistribution {
  name: string
  value: number
  fill: string
}

export interface VaccinationRates {
  vaccinated: number
  notVaccinated: number
  spayed: number
  notSpayed: number
  total: number
}

export interface MonthlyFinancial {
  month: string
  donation: number
  expense: number
}

export interface FundraisingItem {
  name: string
  target: number
  collected: number
}

export interface MonthlyTrend {
  month: string
  animals: number
  posts: number
  volunteers: number
}

