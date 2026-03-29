'use client'

import React from 'react'
import { BaseFAQ } from '@/components/shared/BaseFAQ'

type Props = {
  items: { q: string; a: string }[]
}

export function OurWorkFAQ({ items }: Props) {
  return <BaseFAQ items={items} accentColor="bg-health" className="panel px-6 py-8 lg:px-8" />
}
