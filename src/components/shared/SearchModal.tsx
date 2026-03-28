'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FileTextIcon } from 'lucide-react'

import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from '@/i18n/navigation'
import { searchAction, type SearchResult } from '@/actions/searchAction'
import type { UiString } from '@/payload-types'

type SearchLabels = UiString['search']

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  labels?: SearchLabels | null
}

export function SearchModal({ open, onOpenChange, labels }: SearchModalProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const requestIdRef = useRef(0)

  const debouncedQuery = useDebounce(query, 300)

  const modalPlaceholder = labels?.modal?.placeholder || 'Search...'
  const modalNoResults = labels?.modal?.noResults || 'No results found.'
  const modalShortcut = labels?.modal?.shortcut || 'Open search'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    const currentRequestId = ++requestIdRef.current

    async function fetchResults() {
      setIsLoading(true)
      try {
        const data = await searchAction(debouncedQuery)
        if (currentRequestId !== requestIdRef.current) return
        setResults(data)
      } catch {
        if (currentRequestId !== requestIdRef.current) return
        setResults([])
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsLoading(false)
        }
      }
    }

    fetchResults()
  }, [debouncedQuery])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setResults([])
    }
  }, [open])

  const handleSelect = useCallback(
    (result: SearchResult) => {
      onOpenChange(false)

      if (result.doc?.relationTo && result.slug) {
        const routeMap: Record<string, string> = {
          pages: '',
          posts: '/posts',
          animals: '/canlarimiz',
          'emergency-cases': '/acil-vakalar',
        }

        const prefix = routeMap[result.doc.relationTo] ?? ''
        const slug =
          result.doc.relationTo === 'pages' && result.slug === 'home'
            ? '/'
            : `${prefix}/${result.slug}`
        router.push(slug)
      } else if (result.slug) {
        router.push(`/${result.slug}`)
      }
    },
    [onOpenChange, router],
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={modalShortcut}
      description={modalPlaceholder}
    >
      <Command shouldFilter={false}>
        <CommandInput
          placeholder={`${modalPlaceholder} (⌘K)`}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {debouncedQuery.length >= 2 && !isLoading && results.length === 0 && (
            <CommandEmpty>{modalNoResults}</CommandEmpty>
          )}

          {isLoading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {modalPlaceholder}...
            </div>
          )}

          {results.length > 0 && (
            <CommandGroup>
              {results.map((result) => (
                <CommandItem
                  key={result.id}
                  value={String(result.id)}
                  onSelect={() => handleSelect(result)}
                  className="cursor-pointer"
                >
                  <FileTextIcon className="mr-2 size-4 shrink-0 text-muted-foreground" />
                  <span>{result.title}</span>
                  {result.doc?.relationTo && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {result.doc.relationTo}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
