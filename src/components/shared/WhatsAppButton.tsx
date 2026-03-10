import React from 'react'
import { cn } from '@/utilities/ui'

type WhatsAppButtonProps = {
  phone: string
  message?: string
  children: React.ReactNode
  className?: string
}

export function WhatsAppButton({ phone, message, children, className }: WhatsAppButtonProps) {
  const cleanPhone = phone.replace(/\D/g, '')

  if (!cleanPhone) {
    return null
  }

  const url = message
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${cleanPhone}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#20BD5A]',
        className,
      )}
    >
      {children}
    </a>
  )
}
