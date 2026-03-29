'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '@/hooks/use-outside-click'

/**
 * Manages modal open/close state with:
 * - Escape key handler
 * - Outside click detection
 * - Body overflow lock
 *
 * @returns { isOpen, open, close, modalRef }
 */
export function useModalState<T = boolean>() {
  const [active, setActive] = useState<T | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const open = useCallback((value: T) => setActive(value), [])
  const close = useCallback(() => setActive(null), [])

  // Escape key
  useEffect(() => {
    if (!active) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active])

  // Body overflow lock
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  // Outside click
  useOutsideClick(modalRef, close)

  return { active, open, close, modalRef }
}
