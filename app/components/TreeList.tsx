import Link from "next/link";

type TreeItem = {
  title: React.ReactNode;
  description?: string;
  status?: string;
  period?: string;
  url: string;
};

export function TreeList({ items }: { items: TreeItem[] }) {
  return (
    <ul className="font-mono text-base">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;

        return (
          <li key={i} className="flex">
            <div className="w-4 shrink-0 relative mr-1">
              {!isLast && (
                <div className="absolute left-0 top-0 -bottom-4 w-px bg-zinc-300" />
              )}
              <div className="absolute left-0 top-3 w-3 h-px bg-zinc-300" />
              {isLast && (
                <div className="absolute left-0 top-0 h-3 w-px bg-zinc-300" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-6 flex items-baseline gap-2 group cursor-pointer"
              >
                <span className="group-hover:underline cursor-pointer">
                  {item.title}
                </span>

                {item.status && (
                  <span className="text-zinc-400">{item.status}</span>
                )}
              </Link>
              {item.description && (
                <p className="text-zinc-400 mt-2">{item.description}</p>
              )}
              {item.period && (
                <p className="text-zinc-400 text-sm mt-2">{item.period}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
