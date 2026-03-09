"use client"

import { useState } from "react"

export function useAnimalFilter() {
  const [filter, setFilter] = useState<"all" | "kedi" | "kopek">("all")
  return { filter, setFilter }
}
