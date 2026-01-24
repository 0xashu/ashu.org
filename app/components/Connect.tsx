"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { LoadingOrb } from "./LoadingOrb";

// New York time (EDT = UTC-4 in September)
const BIRTHDAY = new Date(site.birthday).getTime();
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export function Connect() {
  const [age, setAge] = useState(0);
  const rafIdRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

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

  return (
    <div className="text-zinc-400">
      <div className="flex items-center gap-2">
        <LoadingOrb style="claude" />
        <p className="tabular-nums">{age.toFixed(16)}</p>
      </div>
    </div>
  );
}
