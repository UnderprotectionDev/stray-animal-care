'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

type TocItem = {
  id: string
  text: string
  level: 'h2' | 'h3'
}

type TableOfContentsMobileProps = {
  categoryToken: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function TableOfContentsMobile({ categoryToken }: TableOfContentsMobileProps) {
  const [items, setItems] = useState<TocItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector('.prose-blog')
      if (!container) return

      const headings = container.querySelectorAll('h2, h3')
      const tocItems: TocItem[] = []

      headings.forEach((heading) => {
        const text = heading.textContent || ''
        if (!text.trim()) return

        let id = heading.id
        if (!id) {
          id = slugify(text)
          heading.id = id
        }

        tocItems.push({
          id,
          text: text.trim(),
          level: heading.tagName.toLowerCase() as 'h2' | 'h3',
        })
      })

      setItems(tocItems)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }, [])

  if (items.length === 0) return null

  return (
    <div className="xl:hidden panel p-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-muted transition-colors"
      >
        <span className="t-comment text-xs">{'İÇİNDEKİLER'}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border"
          >
            <nav className="px-5 py-3" aria-label="Table of Contents">
              <ul className="space-y-1 border-l border-border pl-3">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleClick(item.id)}
                      className={`text-left w-full text-xs font-mono transition-opacity hover:opacity-100 ${
                        item.level === 'h3' ? 'pl-3 text-[11px] opacity-40' : 'opacity-60'
                      }`}
                      style={{ color: `var(--${categoryToken})` }}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
