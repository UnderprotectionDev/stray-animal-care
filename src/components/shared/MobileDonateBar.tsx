'use client'

import { Link } from '@/i18n/navigation'
import { Heart } from 'lucide-react'

type Props = {
  label?: string | null
}

export function MobileDonateBar({ label }: Props) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <Link
        href="/destek-ol"
        className="flex items-center justify-center gap-2 bg-foreground text-accent py-3 px-4 font-bold text-sm uppercase tracking-wider font-mono border-t border-border"
      >
        <Heart className="size-4 fill-current" />
        {label || 'Destek Ol'}
      </Link>
    </div>
  )
}
