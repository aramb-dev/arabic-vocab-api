import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Arabic Vocabulary — 15,000+ words across 4 dialects"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
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
        {/* Gold left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            background: "linear-gradient(to bottom, #c49a3c, #d4b062, #c49a3c)",
          }}
        />

        {/* Subtle geometric diamond pattern overlay */}
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

        {/* Arabic watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "60px",
            transform: "translateY(-50%)",
            fontSize: "320px",
            color: "rgba(196, 154, 60, 0.07)",
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          ع
        </div>

        {/* Gold accent line */}
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#c49a3c",
            marginBottom: "28px",
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
          Arabic Vocabulary
        </div>

        <div
          style={{
            fontSize: "26px",
            color: "#78716c",
            lineHeight: 1.4,
            marginBottom: "40px",
            maxWidth: "700px",
          }}
        >
          15,099 words across Egyptian, Darija, Levantine, and Modern Standard Arabic
        </div>

        {/* Dialect color dots */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {[
            { color: "#2563eb", label: "Egyptian" },
            { color: "#059669", label: "Darija" },
            { color: "#7c3aed", label: "Levantine" },
            { color: "#d97706", label: "MSA" },
          ].map((d) => (
            <div key={d.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: d.color }} />
              <span style={{ fontSize: "16px", color: "#44403c", letterSpacing: "0.02em" }}>{d.label}</span>
            </div>
          ))}
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
              arabic-dict.aramb.dev
            </span>
          </div>
          <span style={{ fontSize: "12px", color: "#a8a29e" }}>Data from Lingualism</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
