"use client";

import { films } from "../data";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../lib/utils";
import { PinterestGrid } from "../components/PinterestGrid";

export default function Films() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hasHover = hoveredIndex !== null;

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

        <p className="text-xs md:text-sm leading-relaxed mb-8 max-w-md">
          Films that have shaped my perspective on storytelling, aesthetics,
          and the human experience.
        </p>

        <div className="flex gap-12 lg:gap-16">
          <div className="hidden md:block shrink-0 w-64 lg:w-80 sticky top-16 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
            <nav>
              <ul className="space-y-1 font-mono text-sm uppercase tracking-wide">
                {films.map((film, index) => {
                  const isHovered = hoveredIndex === index;

                  return (
                    <li key={film.title}>
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
                        {film.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex-1">
            <PinterestGrid
              items={films.map((film) => ({
                title: film.title,
                image: film.imageUrl,
              }))}
              columns={2}
              dimOnHover
              hoveredIndex={hoveredIndex}
              onHoverChange={setHoveredIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
