import { Suspense } from "react";
import Link from "next/link";
import { PhotosByYear } from "./PhotosByYear";
import { photos } from "../data";

export default function Photographs() {
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

        <Suspense fallback={null}>
          <PhotosByYear photos={photos} />
        </Suspense>
      </div>
    </div>
  );
}
