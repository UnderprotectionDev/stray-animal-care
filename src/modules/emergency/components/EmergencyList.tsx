import React from 'react'
import { EmergencyCard } from './EmergencyCard'
import type { EmergencyCase } from '@/payload-types'

type EmergencyListProps = {
  cases: EmergencyCase[]
  labels: {
    activeCases: string
    noActive: string
    completedCases: string
  }
}

export function EmergencyList({ cases, labels }: EmergencyListProps) {
  const active = cases.filter((c) => c.caseStatus === 'aktif')
  const completed = cases.filter((c) => c.caseStatus === 'tamamlandi')

  return (
    <div className="space-y-12">
      {/* Active cases */}
      <div>
        <h2 className="font-heading text-2xl font-semibold mb-6">{labels.activeCases}</h2>
        {active.length === 0 ? (
          <p className="text-muted-foreground">{labels.noActive}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {active.map((ec) => (
              <EmergencyCard key={ec.id} ec={ec} />
            ))}
          </div>
        )}
      </div>

      {/* Completed cases */}
      {completed.length > 0 && (
        <div>
          <h2 className="font-heading text-2xl font-semibold mb-6">{labels.completedCases}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((ec) => (
              <EmergencyCard key={ec.id} ec={ec} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
