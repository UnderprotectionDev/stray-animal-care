import { getLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { UiString } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { PawPrint } from 'lucide-react'

export default async function NotFound() {
  const locale = await getLocale()
  const ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null

  return (
    <div className="container py-28 text-center">
      <PawPrint className="mx-auto size-16 text-muted-foreground" />
      <h1 className="mt-4 font-heading text-8xl text-cta">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">{ui?.notFound?.message ?? 'Aradığınız sayfa bulunamadı.'}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button render={<Link href="/" />}>{ui?.notFound?.goHome ?? 'Ana Sayfa'}</Button>
        <Button variant="outline" render={<Link href="/canlarimiz" />}>
          {ui?.notFound?.viewAnimals ?? 'Hayvanları Gör'}
        </Button>
        <Button variant="outline" render={<Link href="/destek-ol" />}>
          {ui?.notFound?.donate ?? 'Destek Ol'}
        </Button>
      </div>
    </div>
  )
}
