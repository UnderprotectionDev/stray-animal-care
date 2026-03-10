import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'

type ContactCardProps = {
  icon: LucideIcon
  title: string
  description: string
  href: string
  external?: boolean
  children?: React.ReactNode
}

export function ContactCard({ icon: Icon, title, description, href, external, children }: ContactCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        {children ?? (
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {title}
          </a>
        )}
      </CardContent>
    </Card>
  )
}
