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
    <div className="space-y-16">
      {/* Active cases */}
      <div>
        <h2 className="font-bold text-xl uppercase tracking-widest text-foreground mb-6 pb-2 border-b border-border">
          {labels.activeCases}
        </h2>
        {active.length === 0 ? (
          <p className="text-sm text-muted-foreground font-mono">{labels.noActive}</p>
        ) : (
          <div className="grid gap-px bg-foreground sm:grid-cols-2 lg:grid-cols-3 border border-border">
            {active.map((ec) => (
              <div key={ec.id} className="bg-background">
                <EmergencyCard ec={ec} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed cases */}
      {completed.length > 0 && (
        <div>
          <h2 className="font-bold text-xl uppercase tracking-widest text-foreground mb-6 pb-2 border-b border-border">
            {labels.completedCases}
          </h2>
          <div className="grid gap-px bg-foreground sm:grid-cols-2 lg:grid-cols-3 border border-border">
            {completed.map((ec) => (
              <div key={ec.id} className="bg-background">
                <EmergencyCard ec={ec} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
