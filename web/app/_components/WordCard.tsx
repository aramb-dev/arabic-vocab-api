import { VocabWord, DialectSlug, DIALECT_META } from "@/lib/types"
import { AudioButton } from "./AudioButton"
import { CopyButton } from "./CopyButton"

interface WordCardProps {
  word: VocabWord
  dialect?: DialectSlug
  showDialect?: boolean
}

function getAccentClass(dialect?: DialectSlug): string {
  if (!dialect) return "border-l-warm-border"
  const color = DIALECT_META[dialect]?.color
  switch (color) {
    case "egyptian": return "accent-bar-egyptian"
    case "darija": return "accent-bar-darija"
    case "levantine": return "accent-bar-levantine"
    case "msa": return "accent-bar-msa"
    default: return "border-l-warm-border"
  }
}

function getDialectBadgeClass(dialect: DialectSlug): string {
  const color = DIALECT_META[dialect]?.color
  switch (color) {
    case "egyptian": return "bg-egyptian-light text-egyptian-dark"
    case "darija": return "bg-darija-light text-darija-dark"
    case "levantine": return "bg-levantine-light text-levantine-dark"
    case "msa": return "bg-msa-light text-msa-dark"
    default: return "bg-sand text-ink-muted"
  }
}

export function WordCard({ word, dialect, showDialect }: WordCardProps) {
  const copyText = `${word.arabic} — ${word.english}${word.transliteration ? ` (${word.transliteration})` : ""}`

  return (
    <div
      className={`bg-white rounded-lg border border-warm-border border-l-[3px] ${getAccentClass(dialect)} hover:shadow-md hover:border-warm-border-hover transition-all px-5 py-4`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Arabic — the hero */}
          <div className="font-arabic text-[1.75rem] leading-snug text-ink mb-1.5" dir="rtl">
            {word.arabic}
          </div>

          {/* English */}
          <div className="text-sm font-medium text-ink-light">{word.english}</div>

          {/* Transliteration */}
          {word.transliteration && (
            <div className="text-xs text-ink-muted mt-0.5 italic">{word.transliteration}</div>
          )}

          {/* Dialect badge */}
          {showDialect && dialect && (
            <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${getDialectBadgeClass(dialect)}`}>
              {DIALECT_META[dialect].name}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 flex-shrink-0 pt-1">
          <AudioButton audioUrl={word.audioUrl} />
          <CopyButton text={copyText} />
        </div>
      </div>
    </div>
  )
}
