import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Arabic Vocabulary Category"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const dialectColors: Record<string, string> = {
  egyptian: "#2563eb",
  darija: "#059669",
  levantine: "#7c3aed",
  "modern-standard-arabic": "#d97706",
}

const dialectNames: Record<string, string> = {
  egyptian: "Egyptian Arabic",
  darija: "Darija (Moroccan)",
  levantine: "Levantine Arabic",
  "modern-standard-arabic": "Modern Standard Arabic",
}

function formatCategory(category: string): string {
  return category
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default async function Image({ params }: { params: { dialect: string; category: string } }) {
  const color = dialectColors[params.dialect] ?? "#c49a3c"
  const dialectName = dialectNames[params.dialect] ?? "Arabic"
  const categoryName = formatCategory(params.category)

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
            background: color,
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

        {/* Category name as watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "70px",
            transform: "translateY(-50%)",
            fontSize: "160px",
            color: `${color}08`,
            fontFamily: "serif",
            lineHeight: 1,
            fontWeight: 700,
            maxWidth: "500px",
            textAlign: "right",
          }}
        >
          {categoryName}
        </div>

        {/* Dialect badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: color,
            }}
          />
          <span style={{ fontSize: "18px", color: "#78716c", letterSpacing: "0.02em" }}>{dialectName}</span>
        </div>

        {/* Category accent line */}
        <div
          style={{
            width: "60px",
            height: "4px",
            background: color,
            marginBottom: "24px",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#1c1917",
            lineHeight: 1.1,
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          {categoryName}
        </div>

        <div
          style={{
            fontSize: "22px",
            color: "#78716c",
          }}
        >
          Arabic vocabulary with transliteration and audio
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
