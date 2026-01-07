import { siteContent } from "./content";
import Link from "next/link";
import { TreeList } from "./components/TreeList";

export default function Home() {
  const { name, title, intro, nav, working, ideas, social } = siteContent;

  return (
    <div className="min-h-screen">
      <header className="flex min-h-[75vh] max-w-6xl mx-auto">
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-16">
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
        </div>

        <nav className="flex items-center px-6 md:px-8 lg:px-12 w-92">
          <ul className="flex flex-col gap-3 items-start">
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
      </header>

      <main className="px-6 md:px-12 lg:px-16 max-w-4xl mx-auto">
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
            items={ideas.map((idea) => ({
              title: idea.name,
              description: idea.description,
              url: idea.url,
              status: idea.type,
            }))}
          />
        </section>
      </main>
    </div>
  );
}
