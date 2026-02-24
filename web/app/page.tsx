import Link from "next/link"
import { IconSearch, IconBook2, IconWorld, IconCategory } from "@tabler/icons-react"
import { DialectCard } from "./_components/DialectCard"
import { getAllDialectStats, DIALECT_LIST } from "@/lib/vocab"

export default function Home() {
  const stats = getAllDialectStats()

  const totalWords = Object.values(stats).reduce((sum, s) => sum + s.wordCount, 0)
  const totalCategories = Object.values(stats).reduce((sum, s) => sum + s.categoryCount, 0)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-white border border-warm-border mb-12 pattern-geo noise-overlay">
        <div className="relative z-10 px-5 sm:px-8 py-10 sm:py-16">
          {/* Decorative Arabic watermark */}
          <div
            className="absolute top-1/2 right-8 -translate-y-1/2 font-arabic text-[12rem] leading-none text-warm-border/40 select-none pointer-events-none hidden md:block"
            dir="rtl"
            aria-hidden="true"
          >
            عربي
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-3 tracking-tight">
            Arabic Vocabulary
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-xl mb-8 sm:mb-10">
            Browse {totalWords.toLocaleString()} words across 4 Arabic dialects with audio pronunciations.
            Built on vocabulary data from{" "}
            <a href="https://lingualism.com" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Lingualism</a>
            {" "}and the{" "}
            <a href="https://github.com/selmetwa/arabic-vocab-api" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Arabic Vocab API</a>
            {" "}by{" "}
            <a href="https://github.com/selmetwa" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Sherif Elmetwally</a>.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-5 sm:gap-8 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center">
                <IconBook2 size={20} stroke={1.5} className="text-gold" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-ink">{totalWords.toLocaleString()}</div>
                <div className="text-xs text-ink-muted">Words</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center">
                <IconWorld size={20} stroke={1.5} className="text-gold" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-ink">4</div>
                <div className="text-xs text-ink-muted">Dialects</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center">
                <IconCategory size={20} stroke={1.5} className="text-gold" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-ink">{totalCategories}</div>
                <div className="text-xs text-ink-muted">Categories</div>
              </div>
            </div>
          </div>

          {/* Search CTA */}
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-cream text-sm font-medium hover:bg-ink-light transition-colors"
          >
            <IconSearch size={16} stroke={2} />
            Search all words
          </Link>
        </div>
      </section>

      {/* Dialect Grid */}
      <section>
        <h2 className="font-display text-2xl font-semibold text-ink mb-6">Browse by Dialect</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DIALECT_LIST.map((dialect) => (
            <DialectCard
              key={dialect}
              dialect={dialect}
              wordCount={stats[dialect].wordCount}
              categoryCount={stats[dialect].categoryCount}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
