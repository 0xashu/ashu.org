"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "../lib/utils";

type PinterestItem = {
  title: string;
  image: string;
  subtitle?: string;
};

type PinterestGridProps = {
  items: PinterestItem[];
};

export function PinterestGrid({ items }: PinterestGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;

        return (
          <div key={item.title} className="break-inside-avoid mb-4">
            <div
              className="border-6 relative rounded-xs overflow-hidden transition-[filter,box-shadow] duration-500 ease-out cursor-pointer shadow-sm hover:shadow-xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={900}
                unoptimized
                className="w-full h-auto object-cover"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              >
                <h3 className="text-white text-sm font-medium leading-tight">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-white/70 text-xs mt-1">{item.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
