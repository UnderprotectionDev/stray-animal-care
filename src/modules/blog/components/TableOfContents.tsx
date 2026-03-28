'use client'

import React, { useEffect, useState, useCallback } from 'react'

type TocItem = {
  id: string
  text: string
  level: 'h2' | 'h3'
}

type TableOfContentsProps = {
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

export function TableOfContents({ categoryToken }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  if (items.length === 0) return null

  return (
    <nav className="toc-sidebar hidden lg:block" aria-label="Table of Contents">
      <p className="font-heading text-xs font-bold uppercase tracking-wider mb-3 opacity-60">
        İçindekiler
      </p>
      <ul className="space-y-0.5 border-l border-border pl-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handleClick(item.id)}
              className={`toc-item ${item.level === 'h3' ? 'toc-item-h3' : ''} ${activeId === item.id ? 'active' : ''}`}
              style={activeId === item.id ? { color: `var(--${categoryToken})` } : undefined}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
