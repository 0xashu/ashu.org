"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

type TraceState = "none" | "light" | "medium" | "strong";

interface TraceMap {
  [pathname: string]: TraceState;
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
  const [mounted, setMounted] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [override, setOverride] = useState<TraceState | null>(null);
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) return null;

  const realState = traces[pathname] || "none";
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
            Trace: {realState} {override && `→ ${override}`}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
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
