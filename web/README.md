# Arabic Vocabulary Web

A Next.js web application for browsing and searching Arabic vocabulary across 4 dialects: Egyptian, Darija (Moroccan), Levantine, and Modern Standard Arabic.

## Features

- **Browse by Dialect**: Explore vocabulary organized by dialect
- **Category Organization**: Words grouped by semantic categories (animals, colors, etc.)
- **Full-Text Search**: Search across English, Arabic, and transliteration
- **Audio Playback**: Play pronunciation for Egyptian, Darija, and Levantine words (from Lingualism)
- **RTL Support**: Native RTL rendering for Arabic text using Noto Naskh Arabic font
- **Static Generation**: Fast page loads with 111 pre-generated static pages

## Setup

```bash
# Install dependencies
bun install

# Run dev server (localhost:3001)
bun run dev

# Build for production
bun run build

# Run production server
bun start

# Type check
bun x tsc --noEmit
```

## Project Structure

```
web/
├── app/
│   ├── _components/         # Shared components
│   │   ├── AudioButton.tsx
│   │   ├── WordCard.tsx
│   │   ├── DialectCard.tsx
│   │   └── CategoryGrid.tsx
│   ├── [dialect]/           # Dialect view (SSG)
│   ├── [dialect]/[category] # Category word list (SSG)
│   ├── api/words            # Search API endpoint
│   ├── search/              # Search page
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   └── vocab.ts             # Vocabulary data loading (server-only)
└── package.json
```

## Data Source

Reads JSON files directly from `/csv-v2/` directory:
- Egyptian: `csv-v2/egyptian/json/`
- Darija: `csv-v2/darija/json/`
- Levantine: `csv-v2/levantine/json/`
- MSA: `csv-v2/modern-standard-arabic/json/`

Each dialect has:
- `all.json` - All words for that dialect
- Category-specific JSON files (e.g., `animals.json`, `colors.json`)

## Data Schema

```typescript
type VocabWord = {
  english: string          // English translation
  transliteration: string  // Romanized version
  arabic: string          // Arabic script
  audioUrl?: string       // CDN URL for pronunciation (if available)
  source?: string         // Category name
}
```

## Key Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Noto Naskh Arabic (Google Fonts)
- **Data**: JSON files from filesystem (server components only)
- **Package Manager**: Bun

## Pages

| Page | Route | Type |
|------|-------|------|
| Home | `/` | Static |
| Dialect View | `/[dialect]` | SSG (4 variants) |
| Category View | `/[dialect]/[category]` | SSG (111 variants) |
| Search | `/search` | Client-side search |
| Search API | `/api/words?dialect=` | Dynamic API |

## Color Coding

Dialects are color-coded for quick visual identification:
- Egyptian: Blue (#3b82f6)
- Darija: Green (#10b981)
- Levantine: Purple (#8b5cf6)
- MSA: Amber (#f59e0b)

## Notes

- Audio URLs are from Lingualism CDN and only available for Egyptian, Darija, and Levantine
- MSA words do not have audio files
- The search API loads all words for selected dialect(s) on demand
- Static pages are pre-rendered at build time for optimal performance
