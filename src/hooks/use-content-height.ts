'use client'

import { type RefObject, useLayoutEffect, useState } from 'react'

export function useContentHeight(ref: RefObject<HTMLElement | null>): number {
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => setHeight(el.scrollHeight)
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])

  return height
}
