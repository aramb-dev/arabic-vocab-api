import { Metadata } from "next"
import { Breadcrumb } from "../_components/Breadcrumb"
import { SearchClient } from "./search-client"

export const metadata: Metadata = {
  title: "Search — Arabic Vocabulary",
  description: "Search Arabic vocabulary across all dialects",
}

export default function SearchPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Search" }]} />
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-8">Search Vocabulary</h1>
      <SearchClient />
    </div>
  )
}
