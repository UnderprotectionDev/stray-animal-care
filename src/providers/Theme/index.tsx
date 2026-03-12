'use client'

import React, { createContext, use } from 'react'

type ThemeContextType = {
  theme: 'light'
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light' })

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeContext value={{ theme: 'light' }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
