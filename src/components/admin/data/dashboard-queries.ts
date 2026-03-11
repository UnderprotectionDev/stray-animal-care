import type { Payload } from 'payload'
import type {
  AnimalTypeDistribution,
  AnimalStatusDistribution,
  VaccinationRates,
  MonthlyFinancial,
  FundraisingItem,
  MonthlyTrend,
  StatusBreakdown,
} from '../charts/types'
import { CHART_COLORS } from '../charts/chart-colors'

const TR_MONTHS = [
  'Oca', 'Sub', 'Mar', 'Nis', 'May', 'Haz',
  'Tem', 'Agu', 'Eyl', 'Eki', 'Kas', 'Ara',
]

function getLast12Months(): { label: string; start: Date; end: Date }[] {
  const now = new Date()
  const months: { label: string; start: Date; end: Date }[] = []

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const start = new Date(d.getFullYear(), d.getMonth(), 1)
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)
    months.push({
      label: `${TR_MONTHS[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`,
      start,
      end,
    })
  }

  return months
}

function countByField<T>(docs: T[], field: keyof T): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const doc of docs) {
    const val = String(doc[field] ?? 'bilinmiyor')
    counts[val] = (counts[val] || 0) + 1
  }
  return counts
}

// --- Individual data fetchers for each widget ---

export async function getAnimalChartData(payload: Payload): Promise<{
  animalTypes: AnimalTypeDistribution[]
  animalStatuses: AnimalStatusDistribution[]
  vaccinationRates: VaccinationRates
}> {
  const allAnimals = await payload.find({
    collection: 'animals',
    limit: 0,
    where: { _status: { equals: 'published' } },
    select: { type: true, animalStatus: true, isSpayed: true, isVaccinated: true },
  })

  const typeCounts = countByField(allAnimals.docs, 'type')
  const animalTypes = [
    { name: 'Kedi', value: typeCounts['kedi'] || 0, fill: CHART_COLORS.kedi },
    { name: 'Kopek', value: typeCounts['kopek'] || 0, fill: CHART_COLORS.kopek },
  ]

  const statusCounts = countByField(allAnimals.docs, 'animalStatus')
  const animalStatuses = [
    { name: 'Tedavide', value: statusCounts['tedavide'] || 0, fill: CHART_COLORS.tedavide },
    { name: 'Kalici Bakim', value: statusCounts['kalici-bakim'] || 0, fill: CHART_COLORS['kalici-bakim'] },
    { name: 'Acil', value: statusCounts['acil'] || 0, fill: CHART_COLORS.acil },
  ]

  const total = allAnimals.docs.length
  const vaccinated = allAnimals.docs.filter((d) => d.isVaccinated).length
  const spayed = allAnimals.docs.filter((d) => d.isSpayed).length
  const vaccinationRates = {
    vaccinated,
    notVaccinated: total - vaccinated,
    spayed,
    notSpayed: total - spayed,
    total,
  }

  return { animalTypes, animalStatuses, vaccinationRates }
}

export async function getFinancialData(payload: Payload): Promise<{
  monthlyFinancials: MonthlyFinancial[]
  fundraising: FundraisingItem[]
}> {
  const [transparencyReports, activeEmergencies] = await Promise.all([
    payload.find({
      collection: 'transparency-reports',
      limit: 24,
      sort: 'month',
      select: { month: true, totalDonation: true, totalExpense: true },
    }),
    payload.find({
      collection: 'emergency-cases',
      limit: 10,
      where: { caseStatus: { equals: 'aktif' }, _status: { equals: 'published' } },
      select: { title: true, targetAmount: true, collectedAmount: true },
    }),
  ])

  const monthlyFinancials = transparencyReports.docs.map((r) => {
    const d = new Date(r.month as string)
    const monthIndex = d.getMonth()
    const label = isNaN(monthIndex)
      ? 'Bilinmiyor'
      : `${TR_MONTHS[monthIndex]} ${d.getFullYear().toString().slice(-2)}`
    return {
      month: label,
      donation: (r.totalDonation as number) || 0,
      expense: (r.totalExpense as number) || 0,
    }
  })

  const fundraising = activeEmergencies.docs.map((e) => ({
    name: typeof e.title === 'string' ? e.title : 'Vaka',
    target: (e.targetAmount as number) || 0,
    collected: (e.collectedAmount as number) || 0,
  }))

  return { monthlyFinancials, fundraising }
}

export async function getTrendData(payload: Payload): Promise<MonthlyTrend[]> {
  const last12 = getLast12Months()
  const twelveMonthsAgo = last12[0].start.toISOString()

  const [recentAnimals, recentPosts, allVolunteers] = await Promise.all([
    payload.find({
      collection: 'animals',
      limit: 0,
      where: {
        _status: { equals: 'published' },
        createdAt: { greater_than: twelveMonthsAgo },
      },
      select: { createdAt: true },
    }),
    payload.find({
      collection: 'posts',
      limit: 0,
      where: {
        _status: { equals: 'published' },
        createdAt: { greater_than: twelveMonthsAgo },
      },
      select: { createdAt: true },
    }),
    payload.find({
      collection: 'volunteers',
      limit: 0,
      where: { createdAt: { greater_than: twelveMonthsAgo } },
      select: { appliedAt: true, createdAt: true },
    }),
  ])

  return last12.map(({ label, start, end }) => {
    const animalCount = recentAnimals.docs.filter((d) => {
      const created = new Date(d.createdAt)
      return created >= start && created <= end
    }).length

    const postCount = recentPosts.docs.filter((d) => {
      const created = new Date(d.createdAt)
      return created >= start && created <= end
    }).length

    const volunteerCount = allVolunteers.docs.filter((d) => {
      const applied = new Date((d.appliedAt || d.createdAt) as string)
      return applied >= start && applied <= end
    }).length

    return { month: label, animals: animalCount, posts: postCount, volunteers: volunteerCount }
  })
}

export async function getCommunityData(payload: Payload): Promise<{
  volunteerStatuses: StatusBreakdown[]
  eventTypes: StatusBreakdown[]
  vetRecordTypes: StatusBreakdown[]
  needsUrgency: StatusBreakdown[]
}> {
  const [allVolunteers, allEvents, allVetRecords, allNeeds] = await Promise.all([
    payload.find({
      collection: 'volunteers',
      limit: 0,
      select: { applicationStatus: true },
    }),
    payload.find({
      collection: 'events',
      limit: 0,
      where: { _status: { equals: 'published' } },
      select: { eventType: true },
    }),
    payload.find({
      collection: 'vet-records',
      limit: 0,
      select: { recordType: true },
    }),
    payload.find({
      collection: 'needs-list',
      limit: 0,
      select: { urgency: true },
    }),
  ])

  const volCounts = countByField(allVolunteers.docs, 'applicationStatus')
  const volunteerStatuses = [
    { name: 'Beklemede', value: volCounts['beklemede'] || 0, fill: CHART_COLORS.beklemede },
    { name: 'Onaylandi', value: volCounts['onaylandi'] || 0, fill: CHART_COLORS.onaylandi },
    { name: 'Reddedildi', value: volCounts['reddedildi'] || 0, fill: CHART_COLORS.reddedildi },
  ]

  const eventCounts = countByField(allEvents.docs, 'eventType')
  const eventTypes = [
    { name: 'Sahiplendirme', value: eventCounts['sahiplendirme'] || 0, fill: CHART_COLORS.sahiplendirme },
    { name: 'Mama Toplama', value: eventCounts['mama-toplama'] || 0, fill: CHART_COLORS['mama-toplama'] },
    { name: 'Bakim Gunu', value: eventCounts['bakim-gunu'] || 0, fill: CHART_COLORS['bakim-gunu'] },
    { name: 'Egitim', value: eventCounts['egitim'] || 0, fill: CHART_COLORS.egitim },
    { name: 'Diger', value: eventCounts['diger'] || 0, fill: CHART_COLORS.diger },
  ]

  const vetCounts = countByField(allVetRecords.docs, 'recordType')
  const vetRecordTypes = [
    { name: 'Muayene', value: vetCounts['muayene'] || 0, fill: CHART_COLORS.muayene },
    { name: 'Asi', value: vetCounts['asi'] || 0, fill: CHART_COLORS.asi },
    { name: 'Kisiklastirma', value: vetCounts['kisirlastirma'] || 0, fill: CHART_COLORS.kisirlastirma },
    { name: 'Ameliyat', value: vetCounts['ameliyat'] || 0, fill: CHART_COLORS.ameliyat },
    { name: 'Tedavi', value: vetCounts['tedavi'] || 0, fill: CHART_COLORS.tedavi },
    { name: 'Kontrol', value: vetCounts['kontrol'] || 0, fill: CHART_COLORS.kontrol },
  ]

  const needsCounts = countByField(allNeeds.docs, 'urgency')
  const needsUrgency = [
    { name: 'Acil', value: needsCounts['acil'] || 0, fill: CHART_COLORS['acil-needs'] },
    { name: 'Orta', value: needsCounts['orta'] || 0, fill: CHART_COLORS.orta },
    { name: 'Yeterli', value: needsCounts['yeterli'] || 0, fill: CHART_COLORS.yeterli },
  ]

  return { volunteerStatuses, eventTypes, vetRecordTypes, needsUrgency }
}
