"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-4xl font-bold text-stone-900">
        Bir hata olustu
      </h1>
      <p className="mt-4 text-stone-600">
        Sayfa yuklenirken bir sorun olustu. Lutfen tekrar deneyin.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-2xl bg-terracotta px-6 py-3 font-medium text-white transition-colors hover:bg-terracotta/90"
      >
        Tekrar Dene
      </button>
    </main>
  )
}
