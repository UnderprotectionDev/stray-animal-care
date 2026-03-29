'use client'

import { useSyncExternalStore } from 'react'

const getSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const getServerSnapshot = () => false
const subscribe = (callback: () => void) => {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
