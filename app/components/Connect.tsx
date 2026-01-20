"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LoadingOrb } from "./LoadingOrb";

interface TraceData {
  state: string;
  views: number;
}

// New York time (EDT = UTC-4 in September)
const BIRTHDAY = new Date("2025-09-11T00:00:00-04:00").getTime();
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export function Connect() {
  const pathname = usePathname();
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState(0);
  const rafIdRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    fetch("/api/traces")
      .then((res) => res.json())
      .then((data) => {
        const traceData: TraceData = data.traces?.[pathname];
        setViews(traceData?.views ?? 0);
      })
      .catch(() => setViews(0))
      .finally(() => setLoading(false));
  }, [pathname]);

  useEffect(() => {
    const updateAge = () => {
      setAge((Date.now() - BIRTHDAY) / MS_PER_YEAR);
    };

    const tick = (timestamp: number) => {
      if (document.visibilityState !== "visible") {
        rafIdRef.current = null;
        return;
      }

      if (timestamp - lastUpdateRef.current >= 100) {
        updateAge();
        lastUpdateRef.current = timestamp;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        lastUpdateRef.current = 0;
        updateAge();
        start();
      } else {
        stop();
      }
    };

    updateAge();
    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (loading) {
    return <LoadingOrb style="claude" className="text-zinc-400" />;
  }

  return (
    <div className="text-zinc-400 space-y-2">
      <p className="tabular-nums">{age.toFixed(16)}</p>
      <div className="flex items-center gap-2">
        <LoadingOrb style="claude" />
        <span>{views} connected</span>
      </div>
    </div>
  );
}
