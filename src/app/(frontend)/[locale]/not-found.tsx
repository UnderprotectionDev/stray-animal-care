import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { PawPrint } from 'lucide-react'

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <div className="container py-28 text-center">
      <PawPrint className="mx-auto size-16 text-muted-foreground" />
      <h1 className="mt-4 font-accent text-8xl text-accent">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t('message')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button render={<Link href="/" />}>{t('goHome')}</Button>
        <Button variant="outline" render={<Link href="/canlarimiz" />}>
          {t('viewAnimals')}
        </Button>
        <Button variant="outline" render={<Link href="/destek-ol" />}>
          {t('donate')}
        </Button>
      </div>
    </div>
  )
}
