export type VocabWord = {
  english: string
  transliteration: string
  arabic: string
  audioUrl?: string
  source?: string
}

export type DialectSlug = "egyptian" | "darija" | "levantine" | "modern-standard-arabic"

export type DialectMeta = {
  name: string
  arabicName: string
  color: string
  description: string
}

export const DIALECT_LIST: DialectSlug[] = [
  "egyptian",
  "darija",
  "levantine",
  "modern-standard-arabic",
]

export const DIALECT_META: Record<DialectSlug, DialectMeta> = {
  egyptian: {
    name: "Egyptian Arabic",
    arabicName: "مصري",
    color: "egyptian",
    description: "The most widely understood Arabic dialect, spoken by over 100 million people",
  },
  darija: {
    name: "Darija (Moroccan)",
    arabicName: "دارجة",
    color: "darija",
    description: "North African Arabic with Berber, French, and Spanish influences",
  },
  levantine: {
    name: "Levantine Arabic",
    arabicName: "شامي",
    color: "levantine",
    description: "Spoken across Syria, Lebanon, Jordan, and Palestine",
  },
  "modern-standard-arabic": {
    name: "Modern Standard Arabic",
    arabicName: "فصحى",
    color: "msa",
    description: "The formal written language used in media, literature, and education",
  },
}

export const DIALECTS: Record<DialectSlug, string> = Object.fromEntries(
  DIALECT_LIST.map((d) => [d, DIALECT_META[d].name])
) as Record<DialectSlug, string>

export function formatCategoryName(category: string): string {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
