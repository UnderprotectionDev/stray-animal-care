import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { TransparencyReport } from '../../../payload-types'

export const revalidateTransparencyReport: CollectionAfterChangeHook<TransparencyReport> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating transparency report: ${doc.title}`)

    try {
      revalidateTag('transparency-reports')
      revalidateTag('tr')
      revalidateTag('en')
    } catch (err) {
      payload.logger.error({ msg: 'Failed to revalidate transparency report', err })
    }
  }
  return doc
}

export const revalidateTransparencyReportDelete: CollectionAfterDeleteHook<TransparencyReport> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      revalidateTag('transparency-reports')
      revalidateTag('tr')
      revalidateTag('en')
    } catch (err) {
      payload.logger.error({ msg: 'Failed to revalidate deleted transparency report', err })
    }
  }

  return doc
}
