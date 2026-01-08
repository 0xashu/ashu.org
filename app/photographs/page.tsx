"use client";

import { siteContent } from "../content";
import Link from "next/link";
import { PinterestGrid } from "../components/PinterestGrid";

export default function Photographs() {
  const { photographs } = siteContent;

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

        <PinterestGrid
          items={photographs.map((photo) => ({
            title: photo.title,
            image: photo.image,
            subtitle: photo.description,
          }))}
        />
      </div>
    </div>
  );
}
