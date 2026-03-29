'use client'

import React from 'react'
import { BaseFAQ } from '@/components/shared/BaseFAQ'

type DonateFAQProps = {
  title: string
  items: { q: string; a: string }[]
}

export function DonateFAQ({ title, items }: DonateFAQProps) {
  return <BaseFAQ items={items} title={title} accentColor="bg-cta" className="space-y-4" />
}
