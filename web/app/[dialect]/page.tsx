import { notFound } from "next/navigation"
import { Breadcrumb } from "../_components/Breadcrumb"
import { CategoryGrid } from "../_components/CategoryGrid"
import { IconBook2, IconCategory } from "@tabler/icons-react"
import {
  getCategoryNames,
  getDialectStats,
  DIALECT_META,
  DIALECT_LIST,
  DialectSlug,
} from "@/lib/vocab"

interface DialectPageProps {
  params: Promise<{ dialect: string }>
}

export async function generateStaticParams() {
  return DIALECT_LIST.map((dialect) => ({ dialect }))
}

export async function generateMetadata({ params }: DialectPageProps) {
  const { dialect } = await params
  const meta = DIALECT_META[dialect as DialectSlug]
  if (!meta) return {}

  return {
    title: `${meta.name} — Arabic Vocabulary`,
    description: meta.description,
  }
}

function getAccentColor(dialect: DialectSlug) {
  const color = DIALECT_META[dialect]?.color
  switch (color) {
    case "egyptian": return "text-egyptian"
    case "darija": return "text-darija"
    case "levantine": return "text-levantine"
    case "msa": return "text-msa"
    default: return "text-gold"
  }
}

function getStatBg(dialect: DialectSlug) {
  const color = DIALECT_META[dialect]?.color
  switch (color) {
    case "egyptian": return "bg-egyptian-light"
    case "darija": return "bg-darija-light"
    case "levantine": return "bg-levantine-light"
    case "msa": return "bg-msa-light"
    default: return "bg-sand"
  }
}

export default async function DialectPage({ params }: DialectPageProps) {
  const { dialect } = await params
  const dialectSlug = dialect as DialectSlug

  const meta = DIALECT_META[dialectSlug]
  if (!meta) notFound()

  const categories = getCategoryNames(dialectSlug)
  const { wordCount, categoryCount } = getDialectStats(dialectSlug)

  return (
    <div>
      <Breadcrumb items={[{ label: meta.name }]} />

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className={`font-arabic text-4xl leading-none ${getAccentColor(dialectSlug)}`} dir="rtl">
            {meta.arabicName}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-2">{meta.name}</h1>
        <p className="text-ink-muted max-w-xl">{meta.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-6">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${getStatBg(dialectSlug)}`}>
            <IconBook2 size={15} stroke={1.5} />
            {wordCount.toLocaleString()} words
          </span>
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${getStatBg(dialectSlug)}`}>
            <IconCategory size={15} stroke={1.5} />
            {categoryCount} categories
          </span>
        </div>
      </div>

      {/* Categories */}
      <section>
        <h2 className="font-display text-xl font-semibold text-ink mb-5">Categories</h2>
        <CategoryGrid dialect={dialectSlug} categories={categories} />
      </section>
    </div>
  )
}
