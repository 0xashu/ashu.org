import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ashu @ SHANGHAI WAIC｜ AIDC 与算电协同";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.22em",
            color: "#71717a",
            textTransform: "uppercase",
          }}
        >
          SHANGHAI WAIC
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
              fontSize: 36,
              color: "#a1a1aa",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            AIDC 与算电协同
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
          <span>Nonce · 全球 5% Bitcoin 算力</span>
          <span>ashu.org/waic</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
