"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { Item } from "../types";

type PhotoLightboxProps = {
  photo: Item | null;
  isOpen: boolean;
  onClose: () => void;
};

export function PhotoLightbox({ photo, isOpen, onClose }: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("img") && !target.closest(".metadata-bar")) {
        onClose();
      }
    },
    [onClose]
  );

  if (!photo) return null;

  const exif = photo.exif;
  const exifParts = [
    exif?.focalLength,
    exif?.aperture,
    exif?.shutter,
    exif?.iso ? `ISO ${exif.iso}` : null,
  ].filter(Boolean);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto backdrop:bg-black/90 bg-transparent p-0 w-screen h-screen max-w-none max-h-none flex items-center justify-center outline-none"
      onClick={handleClick}
      onClose={onClose}
    >
      <div className="flex items-center justify-center w-full h-full pb-28 cursor-pointer">
        <Image
          ref={imageRef}
          src={photo.imageUrl}
          alt={photo.title}
          width={1600}
          height={1200}
          className="max-w-[92vw] max-h-[80vh] w-auto h-auto object-contain cursor-default"
          priority
        />
      </div>

      <div className="metadata-bar fixed bottom-0 left-0 right-0 pb-8 pt-6 text-center text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="space-y-1">
          <p className="font-medium">{photo.title}</p>
          {(photo.date || photo.location) && (
            <p className="text-sm text-white/60">
              {[photo.date, photo.location].filter(Boolean).join(" · ")}
            </p>
          )}
          {(exif?.camera || exif?.lens) && (
            <p className="text-xs text-white/40">
              {[exif.camera, exif.lens].filter(Boolean).join(" · ")}
            </p>
          )}
          {exifParts.length > 0 && (
            <p className="text-xs text-white/40 font-mono">
              {exifParts.join(" · ")}
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
