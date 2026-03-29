'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container py-28 text-center">
      <AlertTriangle className="mx-auto size-16 text-cta" />
      <h1 className="mt-4 font-heading text-4xl">Bir hata oluştu</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Beklenmeyen bir sorun oluştu. Lütfen tekrar deneyin.
      </p>
      <div className="mt-8">
        <Button onClick={() => reset()}>Tekrar Dene</Button>
      </div>
    </div>
  )
}
