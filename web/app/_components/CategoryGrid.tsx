import Link from "next/link"
import { IconArrowRight, IconBook2 } from "@tabler/icons-react"
import { DialectSlug, formatCategoryName, getCategoryWordCount, DIALECT_META } from "@/lib/vocab"

interface CategoryGridProps {
  dialect: DialectSlug
  categories: string[]
}

function getHoverBorder(dialect: DialectSlug) {
  const color = DIALECT_META[dialect].color
  switch (color) {
    case "egyptian": return "hover:border-egyptian/40"
    case "darija": return "hover:border-darija/40"
    case "levantine": return "hover:border-levantine/40"
    case "msa": return "hover:border-msa/40"
    default: return "hover:border-warm-border-hover"
  }
}

export function CategoryGrid({ dialect, categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {categories.map((category, i) => {
        const wordCount = getCategoryWordCount(dialect, category)
        return (
          <Link
            key={category}
            href={`/${dialect}/${category}`}
            className={`group flex items-center justify-between bg-white rounded-lg border border-warm-border ${getHoverBorder(dialect)} hover:shadow-md p-4 transition-all animate-fade-up`}
            style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
          >
            <div>
              <h3 className="font-medium text-ink group-hover:text-ink-light transition-colors">
                {formatCategoryName(category)}
              </h3>
              <span className="flex items-center gap-1 text-xs text-ink-muted mt-1">
                <IconBook2 size={12} stroke={1.5} />
                {wordCount} words
              </span>
            </div>
            <IconArrowRight
              size={16}
              stroke={1.5}
              className="text-warm-border group-hover:text-ink-muted group-hover:translate-x-0.5 transition-all flex-shrink-0"
            />
          </Link>
        )
      })}
    </div>
  )
}
