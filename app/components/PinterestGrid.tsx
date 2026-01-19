"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "../lib/utils";

type PinterestItem = {
  title: string;
  image?: string;
  subtitle?: string;
  blurDataURL?: string;
};

type PinterestGridProps = {
  items: PinterestItem[];
  columns?: 2 | 3 | 4;
  dimOnHover?: boolean;
  hoveredIndex?: number | null;
  onHoverChange?: (index: number | null) => void;
  onItemClick?: (index: number) => void;
};

const columnClasses = {
  2: "columns-2",
  3: "columns-2 md:columns-3",
  4: "columns-2 sm:columns-3 md:columns-4",
};

export function PinterestGrid({
  items,
  columns = 3,
  dimOnHover = false,
  hoveredIndex: controlledHoveredIndex,
  onHoverChange,
  onItemClick,
}: PinterestGridProps) {
  const [internalHoveredIndex, setInternalHoveredIndex] = useState<
    number | null
  >(null);

  const isControlled = controlledHoveredIndex !== undefined;
  const hoveredIndex = isControlled
    ? controlledHoveredIndex
    : internalHoveredIndex;
  const setHoveredIndex = isControlled
    ? onHoverChange
    : setInternalHoveredIndex;

  const hasHover = hoveredIndex !== null;

  return (
    <div className={cn("gap-4", columnClasses[columns])}>
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;

        return (
          <div key={item.title} className="mb-4 break-inside-avoid">
            <div
              className={cn(
                "border-6 relative rounded-xs overflow-hidden transition-[filter,box-shadow] duration-500 ease-out cursor-pointer shadow-sm hover:shadow-xl will-change-[filter]",
                dimOnHover && hasHover
                  ? isHovered
                    ? "grayscale-0 brightness-100"
                    : "grayscale brightness-75"
                  : "grayscale-0 brightness-100"
              )}
              onMouseEnter={() => setHoveredIndex?.(index)}
              onMouseLeave={() => setHoveredIndex?.(null)}
              onClick={() => onItemClick?.(index)}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={900}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="w-full h-auto object-cover"
                  placeholder={item.blurDataURL ? "blur" : "empty"}
                  blurDataURL={item.blurDataURL}
                  priority={index < 6}
                />
              ) : (
                <div className="w-full aspect-2/3 bg-zinc-200 flex items-center justify-center p-2">
                  <span className="text-xs text-zinc-500 text-center font-mono leading-tight">
                    {item.title}
                  </span>
                </div>
              )}
              {!dimOnHover && (
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                >
                  <h3 className="text-white text-sm font-medium leading-tight">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-white/70 text-xs mt-1">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
