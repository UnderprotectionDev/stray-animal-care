import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

type FAQItem = { q: string; a: string }

type DonateFAQProps = {
  title: string
  items: FAQItem[]
}

export function DonateFAQ({ title, items }: DonateFAQProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      <Accordion>
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
