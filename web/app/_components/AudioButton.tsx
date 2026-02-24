"use client"

import { useState, useRef, useCallback } from "react"
import { IconVolume, IconPlayerStop } from "@tabler/icons-react"

interface AudioButtonProps {
  audioUrl?: string
}

export function AudioButton({ audioUrl }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleToggle = useCallback(async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      return
    }

    try {
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      setIsPlaying(true)
      audio.onended = () => {
        setIsPlaying(false)
        audioRef.current = null
      }
      audio.onerror = () => {
        setIsPlaying(false)
        audioRef.current = null
      }
      await audio.play()
    } catch {
      setIsPlaying(false)
      audioRef.current = null
    }
  }, [audioUrl, isPlaying])

  if (!audioUrl) {
    return null
  }

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
        isPlaying
          ? "bg-gold/15 text-gold"
          : "text-ink-muted hover:text-ink hover:bg-sand"
      }`}
      title={isPlaying ? "Stop audio" : "Play pronunciation"}
    >
      {isPlaying ? (
        <IconPlayerStop size={16} stroke={2} />
      ) : (
        <IconVolume size={16} stroke={1.5} />
      )}
    </button>
  )
}
