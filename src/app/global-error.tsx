"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="tr">
      <body>
        <main style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1C1917" }}>
            Bir hata olustu
          </h1>
          <p style={{ marginTop: "1rem", color: "#57534e" }}>
            Beklenmeyen bir hata olustu. Lutfen sayfayi yenileyin.
          </p>
          <button
            onClick={reset}
            style={{ marginTop: "2rem", padding: "0.75rem 1.5rem", backgroundColor: "#C2410C", color: "white", border: "none", borderRadius: "1rem", cursor: "pointer", fontSize: "1rem" }}
          >
            Tekrar Dene
          </button>
        </main>
      </body>
    </html>
  )
}
