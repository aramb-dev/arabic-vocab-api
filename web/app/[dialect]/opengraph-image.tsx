import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Arabic Vocabulary Dialect"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type DialectInfo = { name: string; arabicName: string; color: string; wordCount: string }

const dialectInfo: Record<string, DialectInfo> = {
  egyptian: { name: "Egyptian Arabic", arabicName: "مصري", color: "#2563eb", wordCount: "6,314" },
  darija: { name: "Darija (Moroccan)", arabicName: "دارجة", color: "#059669", wordCount: "2,376" },
  levantine: { name: "Levantine Arabic", arabicName: "شامي", color: "#7c3aed", wordCount: "2,511" },
  "modern-standard-arabic": { name: "Modern Standard Arabic", arabicName: "فصحى", color: "#d97706", wordCount: "3,898" },
}

const fallback: DialectInfo = { name: "Arabic", arabicName: "عربي", color: "#c49a3c", wordCount: "15,099" }

export default async function Image({ params }: { params: { dialect: string } }) {
  const info = dialectInfo[params.dialect] ?? fallback

  return new ImageResponse(
    (
      <div
        style={{
          background: "#faf7f2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dialect-colored left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            background: info.color,
          }}
        />

        {/* Geometric pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' stroke='%231c1917' stroke-width='0.5' fill='none'/%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Arabic name watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "70px",
            transform: "translateY(-50%)",
            fontSize: "240px",
            color: `${info.color}10`,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          {info.arabicName}
        </div>

        {/* Dialect color accent line */}
        <div
          style={{
            width: "60px",
            height: "4px",
            background: info.color,
            marginBottom: "24px",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#1c1917",
            lineHeight: 1.1,
            marginBottom: "12px",
            letterSpacing: "-0.02em",
          }}
        >
          {info.name}
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#78716c",
            marginBottom: "28px",
          }}
        >
          {info.wordCount} vocabulary words with audio pronunciations
        </div>

        {/* Word count badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: info.color,
            }}
          />
          <span style={{ fontSize: "16px", color: "#44403c" }}>Browse by category</span>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "80px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e7e0d8",
            paddingTop: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "22px", color: "#c49a3c", fontFamily: "serif" }}>ع</span>
            <span style={{ fontSize: "14px", color: "#78716c", letterSpacing: "0.03em" }}>
              Arabic Vocabulary — arabic-dict.aramb.dev
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
