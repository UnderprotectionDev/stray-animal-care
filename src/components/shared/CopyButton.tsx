'use client'

import React, { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

type CopyButtonProps = {
  text: string
  label?: string
  className?: string
}

export function CopyButton({ text, label = 'Copy', className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy')
    }
  }, [text])

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn('gap-1.5', className)}
      onClick={handleCopy}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {label}
    </Button>
  )
}
