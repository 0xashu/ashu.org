"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../lib/utils";
import type { Item } from "../types";

type FeaturedSectionProps = {
  books: Item[];
  films: Item[];
  photos: Item[];
};

type FeaturedItemProps = {
  image: string;
  title: string;
  subtitle: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function FeaturedItem({
  image,
  title,
  subtitle,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: FeaturedItemProps) {
  return (
    <div
      className={cn(
        "relative aspect-2/3 rounded-xs overflow-hidden transition-[filter,box-shadow] duration-500 ease-out cursor-pointer shadow-sm hover:shadow-xl border-6"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 33vw, 200px"
      />
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <h3 className="text-white text-sm font-medium leading-tight">
          {title}
        </h3>
        <p className="text-white/70 text-xs mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export function FeaturedSection({
  books,
  films,
  photos,
}: FeaturedSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <section id="featured" className="mb-20">
      <h2 className="text-sm text-zinc-400 uppercase tracking-wide mb-6">
        Featured
      </h2>

      <div className="space-y-10">
        {books.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs text-zinc-400 uppercase tracking-wide">
                Reading
              </h3>
              <Link
                href="/reading"
                className="text-xs text-zinc-400 hover:text-black transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {books.map((item) => (
                <FeaturedItem
                  key={item.id}
                  image={item.imageUrl}
                  title={item.title}
                  subtitle={item.description || ""}
                  isHovered={hoveredIndex === `book-${item.id}`}
                  onMouseEnter={() => setHoveredIndex(`book-${item.id}`)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>
        )}

        {films.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs text-zinc-400 uppercase tracking-wide">
                Films
              </h3>
              <Link
                href="/films"
                className="text-xs text-zinc-400 hover:text-black transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {films.map((item) => (
                <FeaturedItem
                  key={item.id}
                  image={item.imageUrl}
                  title={item.title}
                  subtitle={item.description || ""}
                  isHovered={hoveredIndex === `film-${item.id}`}
                  onMouseEnter={() => setHoveredIndex(`film-${item.id}`)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>
        )}

        {photos.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs text-zinc-400 uppercase tracking-wide">
                Photos
              </h3>
              <Link
                href="/photographs"
                className="text-xs text-zinc-400 hover:text-black transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {photos.map((item) => (
                <FeaturedItem
                  key={item.id}
                  image={item.imageUrl}
                  title={item.title}
                  subtitle={item.location || String(item.year)}
                  isHovered={hoveredIndex === `photos-${item.id}`}
                  onMouseEnter={() => setHoveredIndex(`photos-${item.id}`)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
