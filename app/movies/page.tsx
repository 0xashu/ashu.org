"use client";

import { siteContent } from "../content";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function Movies() {
  const { movies } = siteContent;
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
        </header>

        <div className="flex gap-12 lg:gap-16">
          <div className="shrink-0 w-64 lg:w-80 sticky top-16 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
            <p className="text-sm leading-relaxed mb-6">
              Films that have shaped my perspective on storytelling, aesthetics,
              and the human experience.
            </p>
            <nav>
              <ul className="space-y-1 font-mono text-sm uppercase tracking-wide">
                {movies.map((movie, index) => {
                  const isHovered = hoveredIndex === index;
                  const hasHover = hoveredIndex !== null;

                  return (
                    <li key={movie.title}>
                      <span
                        className={cn(
                          "block py-0.5 transition-colors duration-500 ease-out cursor-default will-change-[color]",
                          hasHover
                            ? isHovered
                              ? "text-zinc-900"
                              : "text-zinc-300"
                            : "text-zinc-500"
                        )}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {movie.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex-1">
            <div className="columns-1 sm:columns-2 gap-4">
              {movies.map((movie, index) => {
                const isHovered = hoveredIndex === index;
                const hasHover = hoveredIndex !== null;

                return (
                  <div key={movie.title} className="break-inside-avoid mb-4">
                    <div
                      className={cn(
                        "relative rounded-xs overflow-hidden transition-[filter,box-shadow] duration-500 ease-out cursor-default border-6 shadow-sm hover:shadow-lg will-change-[filter]",
                        hasHover
                          ? isHovered
                            ? "grayscale-0 brightness-100"
                            : "grayscale brightness-75"
                          : "grayscale-0 brightness-100"
                      )}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {movie.cover ? (
                        <Image
                          src={movie.cover}
                          alt={movie.title}
                          width={600}
                          height={900}
                          unoptimized
                          className="w-full h-auto object-cover"
                        />
                      ) : (
                        <div className="w-full aspect-2/3 bg-zinc-200 flex items-center justify-center p-2">
                          <span className="text-xs text-zinc-500 text-center font-mono leading-tight">
                            {movie.title}
                          </span>
                        </div>
                      )}
                    </div>
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
