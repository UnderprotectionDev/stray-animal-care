import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { locales } from '@/i18n/config'
import {
  Building2,
  Scissors,
  Users,
  Stethoscope,
  Scale,
  Hospital,
  MapPin,
  Megaphone,
  Target,
  ArrowRight,
} from 'lucide-react'

export const revalidate = 3600

type Args = {
  params: Promise<{ locale: string }>
}

const shortTermGoals = [
  { key: 'shelter', icon: Building2 },
  { key: 'spay', icon: Scissors },
  { key: 'volunteers', icon: Users },
  { key: 'clinic', icon: Stethoscope },
] as const

const longTermGoals = [
  { key: 'ngo', icon: Scale },
  { key: 'vetClinic', icon: Hospital },
  { key: 'foster', icon: MapPin },
  { key: 'awareness', icon: Megaphone },
] as const

export default async function VisionPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const [t, tBreadcrumb] = await Promise.all([
    getTranslations('vision'),
    getTranslations('layout.breadcrumb'),
  ])

  return (
    <>
      {/* Hero */}
      <Section padding="lg">
        <Container>
          <PageBreadcrumb
            items={[
              { label: tBreadcrumb('home'), href: '/' },
              { label: t('title') },
            ]}
          />
          <div className="mb-12 text-center">
            <Heading as="h1" className="mb-4">
              {t('title')}
            </Heading>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              {t('subtitle')}
            </p>
          </div>

          {/* Association Goal */}
          <div className="mx-auto mb-16 max-w-3xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-8 text-center dark:border-amber-900/30 dark:bg-amber-950/20">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                <Target className="h-8 w-8 text-amber-700 dark:text-amber-400" />
              </div>
              <Heading as="h2" className="mb-3">
                {t('association.title')}
              </Heading>
              <p className="text-muted-foreground text-lg">
                {t('association.description')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Short-Term Goals */}
      <Section padding="md" className="bg-muted/30">
        <Container>
          <div className="mb-10 text-center">
            <Heading as="h2" className="mb-2">
              {t('shortTerm.title')}
            </Heading>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-4xl">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300 md:block" />
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300 md:hidden" />

            <div className="space-y-8 md:space-y-12">
              {shortTermGoals.map((goal, index) => {
                const Icon = goal.icon
                const isLeft = index % 2 === 0

                return (
                  <div key={goal.key} className="relative flex items-center">
                    {/* Mobile layout */}
                    <div className="md:hidden flex w-full items-start gap-4 pl-14">
                      <div className="absolute left-3 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-amber-400 bg-white dark:bg-gray-900">
                        <Icon className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="rounded-xl border bg-card p-5 shadow-sm">
                        <h3 className="font-heading mb-1 text-lg font-semibold">
                          {t(`shortTerm.${goal.key}.title`)}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {t(`shortTerm.${goal.key}.description`)}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden w-full md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                      {/* Left card */}
                      <div className={isLeft ? '' : 'order-3'}>
                        {isLeft && (
                          <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md ml-auto max-w-sm">
                            <h3 className="font-heading mb-2 text-lg font-semibold">
                              {t(`shortTerm.${goal.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {t(`shortTerm.${goal.key}.description`)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-white shadow-sm dark:bg-gray-900">
                        <Icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>

                      {/* Right card */}
                      <div className={isLeft ? 'order-3' : ''}>
                        {!isLeft && (
                          <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md max-w-sm">
                            <h3 className="font-heading mb-2 text-lg font-semibold">
                              {t(`shortTerm.${goal.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {t(`shortTerm.${goal.key}.description`)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Long-Term Goals */}
      <Section padding="md">
        <Container>
          <div className="mb-10 text-center">
            <Heading as="h2" className="mb-2">
              {t('longTerm.title')}
            </Heading>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-4xl">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-green-300 via-green-500 to-green-300 md:block" />
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-green-300 via-green-500 to-green-300 md:hidden" />

            <div className="space-y-8 md:space-y-12">
              {longTermGoals.map((goal, index) => {
                const Icon = goal.icon
                const isLeft = index % 2 === 0

                return (
                  <div key={goal.key} className="relative flex items-center">
                    {/* Mobile layout */}
                    <div className="md:hidden flex w-full items-start gap-4 pl-14">
                      <div className="absolute left-3 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-green-400 bg-white dark:bg-gray-900">
                        <Icon className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="rounded-xl border bg-card p-5 shadow-sm">
                        <h3 className="font-heading mb-1 text-lg font-semibold">
                          {t(`longTerm.${goal.key}.title`)}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {t(`longTerm.${goal.key}.description`)}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden w-full md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                      {/* Left card */}
                      <div className={isLeft ? '' : 'order-3'}>
                        {isLeft && (
                          <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md ml-auto max-w-sm">
                            <h3 className="font-heading mb-2 text-lg font-semibold">
                              {t(`longTerm.${goal.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {t(`longTerm.${goal.key}.description`)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-400 bg-white shadow-sm dark:bg-gray-900">
                        <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>

                      {/* Right card */}
                      <div className={isLeft ? 'order-3' : ''}>
                        {!isLeft && (
                          <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md max-w-sm">
                            <h3 className="font-heading mb-2 text-lg font-semibold">
                              {t(`longTerm.${goal.key}.title`)}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {t(`longTerm.${goal.key}.description`)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Growing Volunteer Network */}
      <Section padding="md" className="bg-muted/30">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
              <Users className="h-8 w-8 text-green-700 dark:text-green-400" />
            </div>
            <Heading as="h2" className="mb-3">
              {t('network.title')}
            </Heading>
            <p className="text-muted-foreground text-lg">
              {t('network.description')}
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section padding="lg">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h2" className="mb-3">
              {t('cta.title')}
            </Heading>
            <p className="text-muted-foreground mb-8 text-lg">
              {t('cta.description')}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" render={<Link href="/destek-ol" />}>
                {t('cta.donate')}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/gonullu-ol" />}
              >
                {t('cta.volunteer')}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'vision.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
