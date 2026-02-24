import fs from "fs"
import path from "path"

// Re-export all shared types and constants
export {
  type VocabWord,
  type DialectSlug,
  type DialectMeta,
  DIALECT_LIST,
  DIALECT_META,
  DIALECTS,
  formatCategoryName,
} from "./types"

import type { VocabWord, DialectSlug } from "./types"
import { DIALECT_LIST } from "./types"

function getVocabDir(): string {
  return path.join(process.cwd(), "..", "csv-v2")
}

function getDialectDir(dialect: DialectSlug): string {
  return path.join(getVocabDir(), dialect, "json")
}

export function getAllWords(dialect: DialectSlug): VocabWord[] {
  const filePath = path.join(getDialectDir(dialect), "all.json")
  const content = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(content)
}

export function getCategoryNames(dialect: DialectSlug): string[] {
  const dirPath = getDialectDir(dialect)
  const files = fs.readdirSync(dirPath)
  return files
    .filter((file) => file.endsWith(".json") && file !== "all.json")
    .map((file) => file.replace(".json", ""))
    .sort()
}

export function getCategoryWords(dialect: DialectSlug, category: string): VocabWord[] {
  const filePath = path.join(getDialectDir(dialect), `${category}.json`)
  if (!fs.existsSync(filePath)) {
    return []
  }
  const content = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(content)
}

export function getDialectStats(dialect: DialectSlug): { wordCount: number; categoryCount: number } {
  const words = getAllWords(dialect)
  const categories = getCategoryNames(dialect)
  return {
    wordCount: words.length,
    categoryCount: categories.length,
  }
}

export function getAllDialectStats(): Record<DialectSlug, { wordCount: number; categoryCount: number }> {
  const stats = {} as Record<DialectSlug, { wordCount: number; categoryCount: number }>

  DIALECT_LIST.forEach((dialect) => {
    stats[dialect] = getDialectStats(dialect)
  })

  return stats
}

export function getCategoryWordCount(dialect: DialectSlug, category: string): number {
  const words = getCategoryWords(dialect, category)
  return words.length
}
