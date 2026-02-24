import Link from "next/link"
import { IconArrowRight, IconBook2, IconCategory } from "@tabler/icons-react"
import { DialectSlug, DIALECT_META } from "@/lib/vocab"

interface DialectCardProps {
  dialect: DialectSlug
  wordCount: number
  categoryCount: number
}

function getCardStyles(dialect: DialectSlug) {
  const color = DIALECT_META[dialect].color
  switch (color) {
    case "egyptian":
      return "border-l-egyptian hover:bg-egyptian-light/50"
    case "darija":
      return "border-l-darija hover:bg-darija-light/50"
    case "levantine":
      return "border-l-levantine hover:bg-levantine-light/50"
    case "msa":
      return "border-l-msa hover:bg-msa-light/50"
    default:
      return "border-l-warm-border hover:bg-sand/50"
  }
}

function getArabicColor(dialect: DialectSlug) {
  const color = DIALECT_META[dialect].color
  switch (color) {
    case "egyptian": return "text-egyptian"
    case "darija": return "text-darija"
    case "levantine": return "text-levantine"
    case "msa": return "text-msa"
    default: return "text-gold"
  }
}

export function DialectCard({ dialect, wordCount, categoryCount }: DialectCardProps) {
  const meta = DIALECT_META[dialect]

  return (
    <Link
      href={`/${dialect}`}
      className={`group block bg-white rounded-xl border border-warm-border border-l-4 ${getCardStyles(dialect)} p-6 transition-all hover:shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`font-arabic text-3xl leading-none ${getArabicColor(dialect)}`} dir="rtl">
          {meta.arabicName}
        </span>
        <IconArrowRight
          size={20}
          stroke={1.5}
          className="text-ink-muted group-hover:text-ink group-hover:translate-x-0.5 transition-all"
        />
      </div>

      <h3 className="font-display text-xl font-semibold text-ink mb-1">
        {meta.name}
      </h3>
      <p className="text-xs text-ink-muted leading-relaxed mb-5 line-clamp-2">
        {meta.description}
      </p>

      <div className="flex items-center gap-5 text-sm text-ink-light">
        <span className="flex items-center gap-1.5">
          <IconBook2 size={15} stroke={1.5} className="text-ink-muted" />
          {wordCount.toLocaleString()} words
        </span>
        <span className="flex items-center gap-1.5">
          <IconCategory size={15} stroke={1.5} className="text-ink-muted" />
          {categoryCount} categories
        </span>
      </div>
    </Link>
  )
}
