import type { Metadata, Viewport } from "next"
import Link from "next/link"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: "Arabic Vocabulary — 15,000+ words across 4 dialects",
    template: "%s — Arabic Vocabulary",
  },
  description: "Browse 15,000+ Arabic vocabulary words across Egyptian, Darija, Levantine, and Modern Standard Arabic with audio pronunciations.",
  metadataBase: new URL("https://arabic-dict.aramb.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Arabic Vocabulary",
  },
  twitter: {
    card: "summary_large_image",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Arabic Vocab",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lexend:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="glass-header sticky top-0 z-50 border-b border-warm-border">
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="font-arabic text-2xl text-gold leading-none" dir="rtl">ع</span>
              <span className="font-display text-xl font-semibold text-ink tracking-tight group-hover:text-ink-light transition-colors">
                Arabic Vocabulary
              </span>
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/search"
                className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
              >
                Search
              </Link>
              <a
                href="https://github.com/selmetwa/arabic-vocab-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink-muted hover:text-ink transition-colors hidden sm:block"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-5 py-6 sm:py-10 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-warm-border mt-auto bg-sand/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-5 py-8 sm:py-10">
            {/* Credits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">Data & API</h3>
                <p className="text-sm text-ink-light leading-relaxed">
                  Built on the{" "}
                  <a
                    href="https://github.com/selmetwa/arabic-vocab-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-medium underline underline-offset-2 decoration-warm-border hover:decoration-gold transition-colors"
                  >
                    Arabic Vocab API
                  </a>{" "}
                  by{" "}
                  <a
                    href="https://github.com/selmetwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-medium underline underline-offset-2 decoration-warm-border hover:decoration-gold transition-colors"
                  >
                    Sherif Elmetwally
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">Vocabulary Source</h3>
                <p className="text-sm text-ink-light leading-relaxed">
                  15,099 words and audio pronunciations sourced from{" "}
                  <a
                    href="https://lingualism.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-medium underline underline-offset-2 decoration-warm-border hover:decoration-gold transition-colors"
                  >
                    Lingualism
                  </a>
                  , covering Egyptian, Darija, Levantine, and MSA dialects.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">Website</h3>
                <p className="text-sm text-ink-light leading-relaxed">
                  Frontend by{" "}
                  <a
                    href="https://github.com/aramb-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-medium underline underline-offset-2 decoration-warm-border hover:decoration-gold transition-colors"
                  >
                    Abdur-Rahman Bilal
                  </a>
                  . Open source on{" "}
                  <a
                    href="https://github.com/selmetwa/arabic-vocab-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-medium underline underline-offset-2 decoration-warm-border hover:decoration-gold transition-colors"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-6 border-t border-warm-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-arabic text-lg text-gold" dir="rtl">ع</span>
                <span className="text-sm text-ink-muted">Arabic Vocabulary</span>
              </div>
              <p className="text-xs text-ink-muted">
                Data & audio from Lingualism. API by Sherif Elmetwally. Not affiliated with Lingualism.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
