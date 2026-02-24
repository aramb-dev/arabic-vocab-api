import Link from "next/link"
import { IconArrowLeft, IconMoodEmpty } from "@tabler/icons-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <IconMoodEmpty size={48} stroke={1} className="text-warm-border mb-4" />
      <h1 className="font-display text-3xl font-bold text-ink mb-2">Page Not Found</h1>
      <p className="text-ink-muted mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-cream text-sm font-medium hover:bg-ink-light transition-colors"
      >
        <IconArrowLeft size={16} stroke={2} />
        Back to home
      </Link>
    </div>
  )
}
