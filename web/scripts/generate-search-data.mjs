import fs from "fs"
import path from "path"

const vocabDir = path.join(process.cwd(), "..", "csv-v2")
const dialects = ["egyptian", "darija", "levantine", "modern-standard-arabic"]

const allWords = []

for (const dialect of dialects) {
  const filePath = path.join(vocabDir, dialect, "json", "all.json")
  const words = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  allWords.push(...words.map((w) => ({ ...w, dialect })))
}

const outDir = path.join(process.cwd(), "public", "data")
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, "all-words.json"), JSON.stringify(allWords))

console.log(`Generated all-words.json: ${allWords.length} words`)
