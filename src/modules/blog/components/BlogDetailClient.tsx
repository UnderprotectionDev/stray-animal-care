'use client'

import React from 'react'
import { ScrollProgressBar } from './ScrollProgressBar'
import { TableOfContents } from './TableOfContents'
import { TableOfContentsMobile } from './TableOfContentsMobile'
import { BackToTopButton } from './BackToTopButton'

type BlogDetailClientProps = {
  categoryToken: string
  children: React.ReactNode
}

export function BlogDetailClient({ categoryToken, children }: BlogDetailClientProps) {
  return (
    <>
      <ScrollProgressBar categoryToken={categoryToken} />

      {/* Content wrapper with TOC positioned in left margin */}
      <div className="relative">
        {/* TOC — sticky, positioned in left gutter on xl screens */}
        <div className="hidden xl:block absolute -left-[220px] top-0 w-[200px]">
          <TableOfContents categoryToken={categoryToken} />
        </div>

        {/* Mobile TOC — collapsible panel, shown below hero on < xl */}
        <TableOfContentsMobile categoryToken={categoryToken} />

        {/* Main content */}
        {children}
      </div>

      <BackToTopButton />
    </>
  )
}
