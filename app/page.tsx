import { site, projects, todos, books, films, photos, featured } from "./data";
import Link from "next/link";
import { TreeList } from "./components/TreeList";
import { FeaturedSection } from "./components/FeaturedSection";
import type { Item } from "./types";

export default function Home() {
  const { title, intro, nav, social } = site;

  const featuredBooks = featured.reading
    .map((id) => books.find((item) => item.id === id))
    .filter((item): item is Item => item !== undefined);

  const featuredFilms = featured.films
    .map((id) => films.find((item) => item.id === id))
    .filter((item): item is Item => item !== undefined);

  const featuredPhotos = featured.photos
    .map((id) => photos.find((item) => `${item.year}/${item.id}` === id))
    .filter((item): item is Item => item !== undefined);

  return (
    <div className="min-h-screen">
      <div className="flex max-w-6xl mx-auto">
        <div className="flex-1 px-6 md:px-12 lg:px-16">
          <header className="min-h-[75vh] flex items-center">
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
                {title}
              </h1>
              <p className="text-base md:text-lg text-zinc-400 leading-relaxed">{intro}</p>
              <ul className="flex flex-wrap gap-4 md:gap-6 mt-6 font-mono text-sm md:text-base">
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
                items={projects
                  .filter((p) => p.category === "work")
                  .map((p) => ({
                    title: p.title,
                    status: p.status,
                    description: p.description,
                    period: p.period,
                    url: p.url,
                    tags: p.tags,
                  }))}
              />
            </section>

            <section id="ideas" className="mb-20">
              <h2 className="text-sm text-zinc-400 uppercase tracking-wide mb-4">
                Ideas
              </h2>
              <TreeList
                items={[
                  ...projects
                    .filter((p) => p.category === "hackathon" || p.category === "idea")
                    .map((p) => ({
                      title: p.title,
                      description: p.description,
                      url: p.url,
                      tags: p.tags,
                    })),
                  {
                    title: "TODO",
                    description: "Things I want to do",
                    todos: todos.map((t) => ({
                      title: t.title,
                      completed: t.completed ?? false,
                    })),
                  },
                ]}
              />
            </section>

            <FeaturedSection
              books={featuredBooks}
              films={featuredFilms}
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
                  className="text-xl lg:text-2xl uppercase font-semibold text-zinc-400 hover:text-black transition-colors"
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
