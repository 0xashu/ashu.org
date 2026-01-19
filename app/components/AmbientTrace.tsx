"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

type TraceState = "none" | "light" | "medium" | "strong";

interface TraceData {
  state: TraceState;
  views: number;
}

interface TraceMap {
  [pathname: string]: TraceData;
}

const TRACE_STATES: TraceState[] = ["none", "light", "medium", "strong"];

const traceStyles: Record<TraceState, React.CSSProperties> = {
  none: {},
  light: {
    background:
      "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(250, 204, 21, 0.06) 0%, transparent 70%)",
  },
  medium: {
    background:
      "radial-gradient(ellipse 140% 70% at 50% 0%, rgba(250, 204, 21, 0.10) 0%, transparent 75%)",
  },
  strong: {
    background:
      "radial-gradient(ellipse 160% 80% at 50% 0%, rgba(250, 204, 21, 0.15) 0%, transparent 80%)",
  },
};

export function AmbientTrace() {
  const pathname = usePathname();
  const [traces, setTraces] = useState<TraceMap>({});
  const [devMode, setDevMode] = useState(false);
  const [override, setOverride] = useState<TraceState | null>(null);
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/traces")
      .then((res) => res.json())
      .then((data) => setTraces(data.traces || {}))
      .catch(() => {});
  }, []);

  const handleCornerClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 1000);

    if (clickCount.current >= 5) {
      setDevMode((prev) => !prev);
      clickCount.current = 0;
    }
  };

  const traceData = traces[pathname];
  const realState = traceData?.state || "none";
  const state = override ?? realState;
  const style = traceStyles[state];

  return (
    <>
      {state !== "none" && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            transition: "all 0.5s ease-in-out",
            ...style,
          }}
        />
      )}

      <div
        onClick={handleCornerClick}
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: 40,
          height: 40,
          zIndex: 9999,
          cursor: "default",
        }}
      />

      {devMode && (
        <div
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            background: "rgba(0,0,0,0.9)",
            borderRadius: 8,
            padding: 12,
            zIndex: 10000,
            fontFamily: "monospace",
            fontSize: 12,
          }}
        >
          <div style={{ color: "#888", marginBottom: 8 }}>
            Current: {pathname}
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
            {TRACE_STATES.map((s) => (
              <button
                key={s}
                onClick={() => setOverride(s === override ? null : s)}
                style={{
                  padding: "4px 8px",
                  background: s === (override ?? realState) ? "#facc15" : "#333",
                  color: s === (override ?? realState) ? "#000" : "#fff",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div style={{ color: "#888", marginBottom: 4 }}>All Traces</div>
          <div style={{ color: "#fff", fontSize: 11 }}>
            {Object.keys(traces).length === 0 ? (
              <div style={{ color: "#666" }}>No data (token not set?)</div>
            ) : (
              Object.entries(traces).map(([path, data]) => (
                <div
                  key={path}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    opacity: path === pathname ? 1 : 0.5,
                  }}
                >
                  <span>{path}</span>
                  <span>
                    <span style={{ color: "#888", marginRight: 8 }}>{data.views}</span>
                    <span style={{ color: data.state === "none" ? "#666" : "#facc15" }}>
                      {data.state}
                    </span>
                  </span>
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setDevMode(false)}
            style={{
              marginTop: 12,
              padding: "2px 6px",
              background: "transparent",
              color: "#666",
              border: "none",
              cursor: "pointer",
              fontSize: 10,
            }}
          >
            close
          </button>
        </div>
      )}
    </>
  );
}
