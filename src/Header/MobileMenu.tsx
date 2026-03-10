'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Heart } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from './LanguageSwitcher'

const NAV_ITEMS = [
  { href: '/canlarimiz', labelKey: 'animals' },
  { href: '/acil-durumlar', labelKey: 'emergency' },
  { href: '/posts', labelKey: 'blog' },
] as const

type MobileMenuProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const t = useTranslations('layout.header')
  const tMenu = useTranslations('layout.mobileMenu')

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[280px] p-0">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle>{tMenu('title')}</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-6 py-4">
          {NAV_ITEMS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              onClick={() => onOpenChange(false)}
              className="py-3 text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>

        <div className="px-6">
          <Separator />
        </div>

        <div className="px-6 py-4">
          <LanguageSwitcher />
        </div>

        <div className="px-6">
          <Separator />
        </div>

        <div className="px-6 py-4">
          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            render={<Link href="/donate" onClick={() => onOpenChange(false)} />}
          >
            <Heart className="size-4" />
            {t('donate')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
