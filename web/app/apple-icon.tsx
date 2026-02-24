import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
          borderRadius: "36px",
        }}
      >
        <span
          style={{
            fontSize: "120px",
            color: "#c49a3c",
            fontFamily: "serif",
            lineHeight: 1,
            marginTop: "-6px",
          }}
        >
          ع
        </span>
      </div>
    ),
    { ...size }
  )
}
