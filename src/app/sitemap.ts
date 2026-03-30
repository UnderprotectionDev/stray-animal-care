import type { MetadataRoute } from 'next'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { locales } from '@/i18n/config'

const staticRoutes = [
  '/',
  '/iletisim',
  '/destek-ol',
  '/calismalarimiz',
  '/mama-malzeme',
  '/seffaflik',
  '/gonullu-ol',
  '/gelecek-vizyonu',
]

function buildAlternates(path: string) {
  const baseUrl = getServerSideURL()
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = `${baseUrl}/${locale}${path === '/' ? '' : path}`
  }
  return { languages }
}

async function safeFind<T>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  options: Parameters<Awaited<ReturnType<typeof getPayload>>['find']>[0],
): Promise<T[]> {
  try {
    const result = await payload.find(options)
    return result.docs as T[]
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL()
  const payload = await getPayload({ config: configPromise })
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}/tr${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1.0 : 0.8,
    alternates: buildAlternates(route),
  }))

  const posts = await safeFind<{ slug: string; updatedAt?: string }>(payload, {
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/tr/gunluk/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: buildAlternates(`/gunluk/${post.slug}`),
  }))

  const animals = await safeFind<{ slug: string; updatedAt?: string }>(payload, {
    collection: 'animals',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  const animalEntries: MetadataRoute.Sitemap = animals.map((animal) => ({
    url: `${baseUrl}/tr/canlarimiz/${animal.slug}`,
    lastModified: animal.updatedAt ? new Date(animal.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: buildAlternates(`/canlarimiz/${animal.slug}`),
  }))

  const emergencyCases = await safeFind<{ slug: string; updatedAt?: string }>(payload, {
    collection: 'emergency-cases',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true, updatedAt: true },
  })

  const emergencyEntries: MetadataRoute.Sitemap = emergencyCases.map((ec) => ({
    url: `${baseUrl}/tr/acil-vakalar/${ec.slug}`,
    lastModified: ec.updatedAt ? new Date(ec.updatedAt) : now,
    changeFrequency: 'daily',
    priority: 0.8,
    alternates: buildAlternates(`/acil-vakalar/${ec.slug}`),
  }))

  return [...staticEntries, ...postEntries, ...animalEntries, ...emergencyEntries]
}
