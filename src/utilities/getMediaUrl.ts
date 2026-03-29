import { getClientSideURL } from '@/utilities/getURL'
import type { Media as MediaType } from '@/payload-types'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}

/**
 * Extract the first photo from a Payload photos array.
 * Handles the case where photos may be number IDs (unpopulated) or Media objects.
 */
export function getFirstPhoto(
  photos: (number | MediaType)[] | null | undefined,
): MediaType | null {
  const first = photos?.[0]
  if (!first || typeof first === 'number') return null
  return first
}

/**
 * Get the URL for the first photo, with a fallback.
 */
export function getFirstPhotoUrl(
  photos: (number | MediaType)[] | null | undefined,
  fallback = '/placeholder.svg',
): string {
  const photo = getFirstPhoto(photos)
  return photo?.url ? getMediaUrl(photo.url) : fallback
}
