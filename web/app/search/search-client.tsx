"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { IconSearch, IconLoader2, IconMoodEmpty } from "@tabler/icons-react"
import { WordCard } from "../_components/WordCard"
import { VocabWord, DialectSlug, DIALECT_META, DIALECT_LIST } from "@/lib/types"

type WordWithDialect = VocabWord & { dialect: DialectSlug }

const MAX_RESULTS = 100

export function SearchClient() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [selectedDialect, setSelectedDialect] = useState<DialectSlug | "all">("all")
  const [allWords, setAllWords] = useState<WordWithDialect[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Auto-load all words on mount
  useEffect(() => {
    loadWords()
  }, [])

  const loadWords = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/data/all-words.json")
      const data = await response.json()
      setAllWords(data)
    } catch {
      console.error("Failed to load words")
      setAllWords([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 250)
    return () => clearTimeout(timer)
  }, [query])

  // Filter words
  const { results, totalMatches } = useMemo(() => {
    let filtered = allWords

    if (selectedDialect !== "all") {
      filtered = filtered.filter((w) => w.dialect === selectedDialect)
    }

    if (!debouncedQuery.trim()) {
      return { results: [], totalMatches: 0 }
    }

    const q = debouncedQuery.toLowerCase()
    const matches = filtered.filter(
      (word) =>
        word.english.toLowerCase().includes(q) ||
        word.arabic.includes(debouncedQuery) ||
        word.transliteration.toLowerCase().includes(q)
    )

    return {
      results: matches.slice(0, MAX_RESULTS),
      totalMatches: matches.length,
    }
  }, [allWords, selectedDialect, debouncedQuery])

  const dialectChips: Array<{ value: DialectSlug | "all"; label: string }> = [
    { value: "all", label: "All Dialects" },
    ...DIALECT_LIST.map((d) => ({ value: d, label: DIALECT_META[d].name })),
  ]

  function getChipStyle(value: DialectSlug | "all", isActive: boolean) {
    if (!isActive) return "bg-white border-warm-border text-ink-muted hover:bg-sand hover:text-ink"

    if (value === "all") return "bg-ink text-cream border-ink"

    const color = value === "modern-standard-arabic" ? "msa" : value
    switch (color) {
      case "egyptian": return "bg-egyptian text-white border-egyptian"
      case "darija": return "bg-darija text-white border-darija"
      case "levantine": return "bg-levantine text-white border-levantine"
      case "msa": return "bg-msa text-white border-msa"
      default: return "bg-ink text-cream border-ink"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative">
        <IconSearch
          size={18}
          stroke={1.5}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search by English, Arabic, or transliteration..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-warm-border text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-sm"
        />
      </div>

      {/* Dialect chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        {dialectChips.map((chip) => (
          <button
            key={chip.value}
            onClick={() => setSelectedDialect(chip.value)}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${getChipStyle(chip.value, selectedDialect === chip.value)}`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-ink-muted">
          <IconLoader2 size={28} stroke={1.5} className="animate-spin-slow mb-3" />
          <p className="text-sm">Loading vocabulary...</p>
        </div>
      )}

      {/* Empty state — no query yet */}
      {!isLoading && !debouncedQuery.trim() && (
        <div className="flex flex-col items-center justify-center py-16 text-ink-muted">
          <IconSearch size={32} stroke={1} className="mb-3 text-warm-border" />
          <p className="text-sm">Type to search across {allWords.length.toLocaleString()} words</p>
        </div>
      )}

      {/* No results */}
      {!isLoading && debouncedQuery.trim() && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-ink-muted">
          <IconMoodEmpty size={32} stroke={1} className="mb-3 text-warm-border" />
          <p className="text-sm">No results for &ldquo;{debouncedQuery}&rdquo;</p>
        </div>
      )}

      {/* Results */}
      {!isLoading && results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-ink-muted">
              {totalMatches > MAX_RESULTS
                ? `Showing ${MAX_RESULTS} of ${totalMatches.toLocaleString()} results`
                : `${totalMatches} result${totalMatches !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map((word, idx) => (
              <WordCard
                key={`${word.dialect}-${word.arabic}-${idx}`}
                word={word}
                dialect={word.dialect}
                showDialect
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
