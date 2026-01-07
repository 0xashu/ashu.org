"use client";

import { siteContent } from "../content";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function Reading() {
  const { reading } = siteContent;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <header className="mb-12">
          <Link
            href="/"
            className="text-zinc-400 hover:text-black transition-colors font-mono text-sm mb-6 inline-block"
          >
            Back
          </Link>
          <p className="text-sm leading-relaxed max-w-lg">
            Reading sharpens my craft and broadens my understanding of the
            world. Many of my best ideas come from applying tangential topics,
            such as typography or philosophy, to software design.
          </p>
        </header>

        <div className="flex gap-12 lg:gap-16">
          <div className="shrink-0 w-64 lg:w-80">
            <nav>
              <ul className="space-y-1 font-mono text-sm uppercase tracking-wide">
                {reading.map((book, index) => {
                  const isHovered = hoveredIndex === index;
                  const hasHover = hoveredIndex !== null;

                  return (
                    <li key={book.title}>
                      <span
                        className={cn(
                          "block uppercase py-0.5 transition-colors duration-500 ease-out cursor-default will-change-[color]",
                          hasHover
                            ? isHovered
                              ? "text-zinc-900"
                              : "text-zinc-300"
                            : "text-zinc-500"
                        )}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {book.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {reading.map((book, index) => {
                const isHovered = hoveredIndex === index;
                const hasHover = hoveredIndex !== null;

                return (
                  <div
                    key={book.title}
                    className={cn(
                      "relative aspect-2/3 rounded overflow-hidden transition-[filter,box-shadow] duration-500 ease-out cursor-default border-6 shadow-sm hover:shadow-lg will-change-[filter]",
                      hasHover
                        ? isHovered
                          ? "grayscale-0 brightness-100"
                          : "grayscale brightness-75"
                        : "grayscale-0 brightness-100"
                    )}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {book.cover ? (
                      <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-200 flex items-center justify-center p-2">
                        <span className="text-xs text-zinc-500 text-center font-mono leading-tight">
                          {book.title}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
