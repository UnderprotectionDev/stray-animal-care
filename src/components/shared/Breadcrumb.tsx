import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from '@/i18n/navigation'
import { cn } from '@/utilities/ui'
import { getServerSideURL } from '@/utilities/getURL'

type BreadcrumbItemType = { label: string; href?: string }

type PageBreadcrumbProps = {
  items: BreadcrumbItemType[]
  className?: string
}

export function PageBreadcrumb({ items, className }: PageBreadcrumbProps) {
  const baseUrl = getServerSideURL()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb className={cn('mb-4', className)}>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <BreadcrumbItem key={index}>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink render={<Link href={item.href!} />}>
                      {item.label}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
