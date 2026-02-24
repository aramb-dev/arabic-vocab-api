"use client"

import { useState } from "react"
import { IconCopy, IconCheck } from "@tabler/icons-react"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-ink-muted hover:text-ink hover:bg-sand transition-all"
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <IconCheck size={16} stroke={2} className="text-darija" />
      ) : (
        <IconCopy size={16} stroke={1.5} />
      )}
    </button>
  )
}
