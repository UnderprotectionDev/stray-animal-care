"use client"

import { useState } from "react"

export function useBlogFilter() {
  const [category, setCategory] = useState<string>("all")
  return { category, setCategory }
}
