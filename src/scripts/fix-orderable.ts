/**
 * One-time script to populate _order values for collections that had
 * orderable: true added after initial data creation.
 *
 * Usage: Run via the API endpoint POST /api/fix-orderable
 * or import and call fixOrderableValues(payload) from onInit.
 */
import type { Payload } from 'payload'

function generateOrderKeys(count: number): string[] {
  const keys: string[] = []
  for (let i = 0; i < count; i++) {
    keys.push(`a${i.toString(36)}`)
  }
  return keys
}

export async function fixOrderableValues(payload: Payload): Promise<{
  results: Record<string, { updated: number; skipped: number }>
}> {
  const collectionsToFix = ['emergency-cases', 'vet-records'] as const
  const results: Record<string, { updated: number; skipped: number }> = {}

  for (const slug of collectionsToFix) {
    const { docs } = await payload.find({
      collection: slug,
      depth: 0,
      limit: 0,
      sort: 'createdAt',
      overrideAccess: true,
      pagination: false,
      select: {
        _order: true,
      },
    })

    const docsWithoutOrder = docs.filter(
      (doc) => !doc._order || doc._order === null,
    )
    const docsWithOrder = docs.filter((doc) => doc._order && doc._order !== null)

    if (docsWithoutOrder.length === 0) {
      results[slug] = { updated: 0, skipped: docs.length }
      continue
    }

    let startIndex = docsWithOrder.length
    const keys = generateOrderKeys(startIndex + docsWithoutOrder.length)

    let updated = 0
    for (const doc of docsWithoutOrder) {
      const orderKey = keys[startIndex]
      try {
        await payload.update({
          id: doc.id,
          collection: slug,
          data: {
            _order: orderKey,
          } as Record<string, unknown>,
          depth: 0,
          overrideAccess: true,
          context: {
            skipRevalidate: true,
          },
        })
        updated++
        startIndex++
      } catch (err) {
        console.error(`Failed to update ${slug} doc ${doc.id}:`, err)
      }
    }

    results[slug] = { updated, skipped: docsWithOrder.length }
  }

  return { results }
}
