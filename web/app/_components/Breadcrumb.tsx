import Link from "next/link"
import { IconChevronRight, IconHome } from "@tabler/icons-react"

type BreadcrumbItem = {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm mb-8" aria-label="Breadcrumb">
      <Link
        href="/"
        className="text-ink-muted hover:text-ink transition-colors"
        aria-label="Home"
      >
        <IconHome size={16} stroke={1.5} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <IconChevronRight size={14} className="text-warm-border" />
          {item.href ? (
            <Link href={item.href} className="text-ink-muted hover:text-ink transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
