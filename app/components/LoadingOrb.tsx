"use client";

import { useEffect, useState } from "react";

export type OrbStyle = "claude" | "diamond" | "cross" | "star" | "snowflake";

export const ORB_STYLES: OrbStyle[] = [
  "claude",
  "diamond",
  "cross",
  "star",
  "snowflake",
];

const ORB_CHARS: Record<OrbStyle, string[]> = {
  claude: ["✽", "✻", "✶", "✢", "·"],
  diamond: ["·", "◇", "◆", "◈", "❖"],
  cross: ["·", "+", "✚", "✛", "✜"],
  star: ["✦", "✧", "✩", "✪", "✫"],
  snowflake: ["·", "❄", "❅", "❆", "❉"],
};

interface LoadingOrbProps {
  style?: OrbStyle;
  interval?: number;
  className?: string;
  color?: string;
}

export function LoadingOrb({
  style = "claude",
  interval = 200,
  className = "",
  color,
}: LoadingOrbProps) {
  const [index, setIndex] = useState(0);
  const chars = ORB_CHARS[style];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % chars.length);
    }, interval);
    return () => clearInterval(timer);
  }, [chars.length, interval]);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        width: "1em",
        textAlign: "center",
        color,
      }}
    >
      {chars[index]}
    </span>
  );
}

interface LoadingProps {
  text?: string;
  style?: OrbStyle;
  className?: string;
}

export function Loading({
  text = "Loading",
  style = "claude",
  className = "",
}: LoadingProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LoadingOrb style={style} />
      <span>{text}</span>
    </span>
  );
}
