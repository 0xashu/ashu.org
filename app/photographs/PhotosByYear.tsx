"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { PhotoLightbox } from "../components/PhotoLightbox";
import { PinterestGrid } from "../components/PinterestGrid";
import type { Item } from "../types";

type PhotosByYearProps = {
  photos: Item[];
};

export function PhotosByYear({ photos }: PhotosByYearProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const photosByYear = useMemo(() => {
    const grouped = photos.reduce(
      (acc, photo) => {
        const year = photo.year ?? 0;
        if (!acc[year]) acc[year] = [];
        acc[year].push(photo);
        return acc;
      },
      {} as Record<number, Item[]>,
    );

    return Object.entries(grouped)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, items]) => ({ year: Number(year), photos: items }));
  }, [photos]);

  const flatPhotos = useMemo(() => photosByYear.flatMap((g) => g.photos), [photosByYear]);

  const sectionOffsets = useMemo(() => {
    return photosByYear.reduce<number[]>((offsets, _, idx) => {
      const prevOffset = idx === 0 ? 0 : offsets[idx - 1] + photosByYear[idx - 1].photos.length;
      offsets.push(prevOffset);
      return offsets;
    }, []);
  }, [photosByYear]);

  const photoId = searchParams.get("photo");
  const selectedIndex = photoId ? flatPhotos.findIndex((p) => p.id === photoId) : -1;
  const isLightboxOpen = selectedIndex !== -1;
  const selectedPhoto = isLightboxOpen ? flatPhotos[selectedIndex] : null;

  const openPhoto = useCallback(
    (index: number) => {
      const photo = flatPhotos[index];
      if (photo?.id) {
        router.push(`/photographs?photo=${photo.id}`, { scroll: false });
      }
    },
    [flatPhotos, router],
  );

  const closePhoto = useCallback(() => {
    router.push("/photographs", { scroll: false });
  }, [router]);

  return (
    <>
      {photosByYear.map(({ year, photos: yearPhotos }, idx) => (
        <section key={year} className="mb-16">
          <h2 className="text-xl font-mono text-zinc-400 mb-6">{year}</h2>
          <PinterestGrid
            items={yearPhotos.map((photo) => ({
              title: photo.title,
              image: photo.imageUrl,
              subtitle: photo.location,
              blurDataURL: photo.blurDataURL,
            }))}
            onItemClick={(index) => openPhoto(sectionOffsets[idx] + index)}
          />
        </section>
      ))}

      <PhotoLightbox photo={selectedPhoto} isOpen={isLightboxOpen} onClose={closePhoto} />
    </>
  );
}
