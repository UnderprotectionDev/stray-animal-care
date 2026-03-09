import Link from "next/link"

export default function NotFound() {
  // TODO: Implement paw-themed 404 page with warm design
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-6xl font-bold text-stone-900">404</h1>
      <p className="mt-4 text-xl text-stone-600">
        Bu sayfa bulunamadi
      </p>
      <p className="mt-2 text-stone-500">
        Aradaginiz sayfa mevcut degil veya tasindi.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-2xl bg-terracotta px-6 py-3 font-medium text-white transition-colors hover:bg-terracotta/90"
      >
        Ana Sayfaya Don
      </Link>
    </main>
  )
}
