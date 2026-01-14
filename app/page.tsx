import { siteContent } from "./content";
import Link from "next/link";
import { TreeList } from "./components/TreeList";
import { FeaturedSection } from "./components/FeaturedSection";
import { featuredConfig } from "./featured";
import { readingList } from "./reading/data";
import { movieList } from "./movies/data";
import { getPhotos } from "./photographs/getPhotos";
import type { ReadingItem, MovieItem, PhotographItem } from "./types";

export default function Home() {
  const { title, intro, nav, working, ideas, social } = siteContent;

  const photos = getPhotos();

  const featuredReading = featuredConfig.reading
    .map((id) => readingList.find((item) => item.id === id))
    .filter((item): item is ReadingItem => item !== undefined);

  const featuredMovies = featuredConfig.movies
    .map((id) => movieList.find((item) => item.id === id))
    .filter((item): item is MovieItem => item !== undefined);

  const featuredPhotos = featuredConfig.photos
    .map((id) => photos.find((item) => `${item.year}/${item.id}` === id))
    .filter((item): item is PhotographItem => item !== undefined);

  return (
    <div className="min-h-screen">
      <div className="flex max-w-6xl mx-auto">
        <div className="flex-1 px-6 md:px-12 lg:px-16">
          <header className="min-h-[75vh] flex items-center">
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
                {title}
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed">{intro}</p>
              <ul className="flex gap-6 mt-6 font-mono">
                {social.map((link) => {
                  const href =
                    link.label === "Email" ? `mailto:${link.url}` : link.url;
                  return (
                    <li key={link.label}>
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-black transition-colors"
                      >
                        [{link.label}]
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </header>

          <main>
            <section id="working" className="mb-20">
              <h2 className="text-sm text-zinc-400 uppercase tracking-wide mb-4">
                Working
              </h2>
              <TreeList
                items={working.map((job) => ({
                  title: job.company,
                  status: job.status,
                  description: job.description,
                  period: job.period,
                  url: job.url,
                  tags: job.tags,
                }))}
              />
            </section>

            <section id="ideas" className="mb-20">
              <h2 className="text-sm text-zinc-400 uppercase tracking-wide mb-4">
                Ideas
              </h2>
              <TreeList
                items={[
                  ...ideas
                    .filter((idea) => idea.type === "hackathon")
                    .map((idea) => ({
                      title: idea.name,
                      description: idea.description,
                      url: idea.url ?? "",
                      tags: idea.tags,
                    })),
                  {
                    title: "TODO",
                    description: "Things I want to do",
                    todos: ideas
                      .filter((idea) => idea.type === "todo")
                      .map((idea) => ({
                        title: idea.name,
                        description: idea.description,
                        completed: idea.completed ?? false,
                      })),
                  },
                ]}
              />
            </section>

            <FeaturedSection
              reading={featuredReading}
              movies={featuredMovies}
              photos={featuredPhotos}
            />
          </main>
        </div>

        <nav className="hidden md:flex w-96 px-6 md:px-8 lg:px-12 pt-[calc(37.5vh-4rem)]">
          <ul className="flex flex-col gap-3 items-start sticky top-16 self-start">
            <li>
              <div className="size-6 rounded-full bg-yellow-400" />
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-2xl uppercase font-semibold text-zinc-400 hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
