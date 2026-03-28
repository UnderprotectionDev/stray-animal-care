import type { CollectionAfterReadHook } from 'payload'
import { User } from 'src/payload-types'

export const populateAuthors: CollectionAfterReadHook = async ({ doc, req, req: { payload } }) => {
  if (doc?.authors && doc?.authors?.length > 0) {
    const authorDocs: User[] = []

    for (const author of doc.authors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'users',
          depth: 0,
          req,
        })

        if (authorDoc) {
          authorDocs.push(authorDoc)
        }
      } catch (err) {
        payload.logger.warn(`Failed to populate author: ${err}`)
      }
    }

    doc.populatedAuthors = authorDocs.map((authorDoc) => ({
      id: authorDoc.id,
      name: authorDoc.name,
    }))
  }

  return doc
}
