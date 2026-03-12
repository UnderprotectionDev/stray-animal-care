import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Section, Container, Heading, StatusBadge, ProgressBar } from '@/components/shared'
import { setRequestLocale } from 'next-intl/server'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function DesignTestPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <Section padding="lg">
      <Container size="lg">
        <div className="space-y-12">
          {/* Typography */}
          <div className="space-y-4">
            <Heading as="h1">Design System Test</Heading>
            <Heading as="h2">Heading 2 — Plus Jakarta Sans</Heading>
            <Heading as="h3">Heading 3</Heading>
            <Heading as="h4">Heading 4</Heading>
            <p className="text-lg">Body text — Inter font. This is a paragraph to verify the body font renders correctly.</p>
            <p className="font-accent text-2xl">Accent text — Caveat font for handwritten style.</p>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <Heading as="h2">Color Palette</Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-accent text-foreground text-center border border-border">Primary (Mint)</div>
              <div className="p-6 bg-background text-foreground text-center border border-border">White (BG)</div>
              <div className="p-6 bg-foreground text-background text-center border border-border">Black (Text)</div>
              <div className="p-6 bg-muted text-foreground text-center border border-border">Muted</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <Heading as="h2">Button Variants</Heading>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <Heading as="h2">Cards</Heading>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Animal Care</CardTitle>
                  <CardDescription>Helping stray animals find hope</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content with the Mint System brutalist theme.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Donate</CardTitle>
                  <CardDescription>Support our cause</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProgressBar current={750} target={1000} label="Donation Goal" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emergency</CardTitle>
                  <CardDescription>Urgent cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="urgent">Urgent</StatusBadge>
                    <StatusBadge status="active">Active</StatusBadge>
                    <StatusBadge status="completed">Completed</StatusBadge>
                    <StatusBadge status="pending">Pending</StatusBadge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Badges & Input */}
          <div className="space-y-4">
            <Heading as="h2">Badges &amp; Input</Heading>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>Default Badge</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="max-w-sm">
              <Input placeholder="Type something..." />
            </div>
          </div>

          {/* Panels */}
          <div className="space-y-4">
            <Heading as="h2">Panels</Heading>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="panel border border-border p-6 bg-background">Panel Default</div>
              <div className="panel border border-border p-6 bg-accent">Panel Mint</div>
              <div className="panel border border-border p-6 bg-muted">Panel Muted</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export const metadata = {
  title: 'Design System Test',
}
