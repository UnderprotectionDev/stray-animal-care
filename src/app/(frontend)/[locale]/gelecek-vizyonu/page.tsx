import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { UiString } from '@/payload-types'
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

  let ui: UiString | null = null
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
    // ui-strings fetch failed
  }

  return (
    <>
      {/* Hero */}
      <Section padding="lg">
        <Container>
          <PageBreadcrumb
            items={[
              { label: ui?.layout?.breadcrumb?.home || '', href: '/' },
              { label: ui?.vision?.title || '' },
            ]}
          />
          <div className="mb-12 text-center">
            <Heading as="h1" className="mb-4">
              {ui?.vision?.title}
            </Heading>
            <p className="t-body mx-auto max-w-2xl text-lg">
              {ui?.vision?.subtitle}
            </p>
          </div>

          {/* Association Goal */}
          <div className="mx-auto mb-16 max-w-3xl">
            <div className="panel border border-border p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-border bg-accent">
                <Target className="h-8 w-8 text-foreground" />
              </div>
              <Heading as="h2" className="mb-3">
                {ui?.vision?.association?.title}
              </Heading>
              <p className="t-body text-lg">
                {ui?.vision?.association?.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Short-Term Goals */}
      <Section padding="md">
        <Container>
          <div className="mb-10 text-center">
            <Heading as="h2" className="mb-2">
              {ui?.vision?.shortTerm?.title}
            </Heading>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-4xl">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-foreground md:block" />
            <div className="absolute left-6 top-0 h-full w-0.5 bg-foreground md:hidden" />

            <div className="space-y-8 md:space-y-12">
              {shortTermGoals.map((goal, index) => {
                const Icon = goal.icon
                const isLeft = index % 2 === 0

                return (
                  <div key={goal.key} className="relative flex items-center">
                    {/* Mobile layout */}
                    <div className="md:hidden flex w-full items-start gap-4 pl-14">
                      <div className="absolute left-3 top-1 flex h-7 w-7 items-center justify-center border border-border bg-accent">
                        <Icon className="h-3.5 w-3.5 text-foreground" />
                      </div>
                      <div className="panel border border-border p-5">
                        <h3 className="font-heading mb-1 text-lg font-semibold">
                          {ui?.vision?.shortTerm?.[`${goal.key}Title`]}
                        </h3>
                        <p className="t-body text-sm">
                          {ui?.vision?.shortTerm?.[`${goal.key}Description`]}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden w-full md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                      {/* Left card */}
                      <div className={isLeft ? '' : 'order-3'}>
                        {isLeft && (
                          <div className="panel border border-border p-6 ml-auto max-w-sm">
                            <h3 className="font-heading mb-2 text-lg font-semibold">
                              {ui?.vision?.shortTerm?.[`${goal.key}Title`]}
                            </h3>
                            <p className="t-body text-sm">
                              {ui?.vision?.shortTerm?.[`${goal.key}Description`]}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center border-2 border-border bg-accent">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>

                      {/* Right card */}
                      <div className={isLeft ? 'order-3' : ''}>
                        {!isLeft && (
                          <div className="panel border border-border p-6 max-w-sm">
                            <h3 className="font-heading mb-2 text-lg font-semibold">
                              {ui?.vision?.shortTerm?.[`${goal.key}Title`]}
                            </h3>
                            <p className="t-body text-sm">
                              {ui?.vision?.shortTerm?.[`${goal.key}Description`]}
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
              {ui?.vision?.longTerm?.title}
            </Heading>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-4xl">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-foreground md:block" />
            <div className="absolute left-6 top-0 h-full w-0.5 bg-foreground md:hidden" />

            <div className="space-y-8 md:space-y-12">
              {longTermGoals.map((goal, index) => {
                const Icon = goal.icon
                const isLeft = index % 2 === 0

                return (
                  <div key={goal.key} className="relative flex items-center">
                    {/* Mobile layout */}
                    <div className="md:hidden flex w-full items-start gap-4 pl-14">
                      <div className="absolute left-3 top-1 flex h-7 w-7 items-center justify-center border border-border bg-accent">
                        <Icon className="h-3.5 w-3.5 text-foreground" />
                      </div>
                      <div className="panel border border-border p-5">
                        <h3 className="font-heading mb-1 text-lg font-semibold">
                          {ui?.vision?.longTerm?.[`${goal.key}Title`]}
                        </h3>
                        <p className="t-body text-sm">
                          {ui?.vision?.longTerm?.[`${goal.key}Description`]}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden w-full md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                      {/* Left card */}
                      <div className={isLeft ? '' : 'order-3'}>
                        {isLeft && (
                          <div className="panel border border-border p-6 ml-auto max-w-sm">
                            <h3 className="font-heading mb-2 text-lg font-semibold">
                              {ui?.vision?.longTerm?.[`${goal.key}Title`]}
                            </h3>
                            <p className="t-body text-sm">
                              {ui?.vision?.longTerm?.[`${goal.key}Description`]}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center border-2 border-border bg-accent">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>

                      {/* Right card */}
                      <div className={isLeft ? 'order-3' : ''}>
                        {!isLeft && (
                          <div className="panel border border-border p-6 max-w-sm">
                            <h3 className="font-heading mb-2 text-lg font-semibold">
                              {ui?.vision?.longTerm?.[`${goal.key}Title`]}
                            </h3>
                            <p className="t-body text-sm">
                              {ui?.vision?.longTerm?.[`${goal.key}Description`]}
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
      <Section padding="md">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-border bg-accent">
              <Users className="h-8 w-8 text-foreground" />
            </div>
            <Heading as="h2" className="mb-3">
              {ui?.vision?.network?.title}
            </Heading>
            <p className="t-body text-lg">
              {ui?.vision?.network?.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section padding="lg">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h2" className="mb-3">
              {ui?.vision?.cta?.title}
            </Heading>
            <p className="t-body mb-8 text-lg">
              {ui?.vision?.cta?.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" render={<Link href="/destek-ol" />}>
                {ui?.vision?.cta?.donate}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/gonullu-ol" />}
              >
                {ui?.vision?.cta?.volunteer}
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
  let ui: UiString | null = null
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
    // ui-strings fetch failed
  }
  return {
    title: ui?.vision?.meta?.title || 'Gelecek Vizyonu — Paws of Hope',
    description: ui?.vision?.meta?.description || 'Derneğimizin gelecek vizyonu ve hedefleri.',
  }
}
