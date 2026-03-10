import { getServerSideURL } from '@/utilities/getURL'

interface ArticleInput {
  title: string
  description?: string
  slug: string
  publishedAt?: string
  updatedAt?: string
  image?: string
  authorName?: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function organizationJsonLd() {
  const baseUrl = getServerSideURL()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Paws of Hope',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description:
      'Sokak hayvanlarının bakımı, tedavisi ve sahiplendirilmesi için çalışan gönüllü hayvan hakları platformu.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Turkish', 'English'],
    },
  }
}

export function articleJsonLd(post: ArticleInput) {
  const baseUrl = getServerSideURL()

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description ?? '',
    url: `${baseUrl}/tr/gunluk/${post.slug}`,
    ...(post.image && {
      image: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
    }),
    datePublished: post.publishedAt ?? post.updatedAt ?? new Date().toISOString(),
    dateModified: post.updatedAt ?? post.publishedAt ?? new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: post.authorName ?? 'Paws of Hope',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Paws of Hope',
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.svg` },
    },
  }
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
