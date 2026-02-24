import { notFound } from "next/navigation"
import { IconBook2 } from "@tabler/icons-react"
import { Breadcrumb } from "../../_components/Breadcrumb"
import { WordCard } from "../../_components/WordCard"
import {
  getCategoryWords,
  getCategoryNames,
  DIALECT_META,
  DIALECT_LIST,
  DialectSlug,
  formatCategoryName,
} from "@/lib/vocab"

interface CategoryPageProps {
  params: Promise<{ dialect: string; category: string }>
}

export async function generateStaticParams() {
  const params: Array<{ dialect: string; category: string }> = []
  for (const dialect of DIALECT_LIST) {
    const categories = getCategoryNames(dialect)
    for (const category of categories) {
      params.push({ dialect, category })
    }
  }
  return params
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { dialect, category } = await params
  const meta = DIALECT_META[dialect as DialectSlug]
  if (!meta) return {}

  const categoryName = formatCategoryName(category)
  return {
    title: `${categoryName} — ${meta.name} — Arabic Vocabulary`,
    description: `${meta.name} vocabulary for ${categoryName}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { dialect, category } = await params
  const dialectSlug = dialect as DialectSlug

  const meta = DIALECT_META[dialectSlug]
  if (!meta) notFound()

  const categoryName = formatCategoryName(category)
  const words = getCategoryWords(dialectSlug, category)

  if (words.length === 0) notFound()

  return (
    <div>
      <Breadcrumb
        items={[
          { label: meta.name, href: `/${dialect}` },
          { label: categoryName },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-1">{categoryName}</h1>
        <div className="flex items-center gap-2 text-ink-muted text-sm">
          <span>{meta.name}</span>
          <span className="text-warm-border">·</span>
          <span className="flex items-center gap-1">
            <IconBook2 size={14} stroke={1.5} />
            {words.length} words
          </span>
        </div>
      </div>

      {/* Word Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {words.map((word, idx) => (
          <WordCard
            key={`${word.arabic}-${idx}`}
            word={word}
            dialect={dialectSlug}
          />
        ))}
      </div>
    </div>
  )
}
