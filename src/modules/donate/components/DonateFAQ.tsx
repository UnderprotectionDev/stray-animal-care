'use client'

import React, { useState } from 'react'

type FAQItem = { q: string; a: string }

type DonateFAQProps = {
  title: string
  items: FAQItem[]
}

export function DonateFAQ({ title, items }: DonateFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="t-h2 uppercase">{title}</h2>
      <div className="border border-border">
        {items.map((item, index) => (
          <div key={index} className={index > 0 ? 'border-t border-border' : ''}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-4 text-left t-body font-medium hover:bg-muted transition-colors"
            >
              {item.q}
              <span className="ml-4 shrink-0 text-lg">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="border-t border-border px-4 py-3 t-meta">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
