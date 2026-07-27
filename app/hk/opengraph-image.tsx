import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ashu / HK Money Frontier 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#09090b",
        color: "#fafafa",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: "0.18em",
          color: "#71717a",
          textTransform: "uppercase",
        }}
      >
        HK Money Frontier 2026
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#fafafa",
          }}
        >
          Ashu.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#a1a1aa",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Mining → AIDC
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 24,
          color: "#71717a",
          borderTop: "1px solid #27272a",
          paddingTop: 28,
        }}
      >
        <span>Nonce · 5% global Bitcoin hashrate</span>
        <span>ashu.org/hk</span>
      </div>
    </div>,
    { ...size },
  );
}
