import Link from "next/link";
import { TodoList, type TodoItem } from "./TodoList";

type TreeItem = {
  title: React.ReactNode;
  description?: string;
  status?: string;
  period?: string;
  url?: string;
  tags?: string[];
  todos?: TodoItem[];
};

export function TreeList({ items }: { items: TreeItem[] }) {
  return (
    <ul className="text-sm md:text-base">
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
            <div className="flex-1 pb-8">
              <Link
                href={item.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="h-6 group cursor-pointer"
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base md:text-lg">{item.title}</span>
                  <span className="text-zinc-400 text-xs font-mono leading-none">
                    {item.status}
                  </span>
                  <sup className="font-sans text-xs font-semibold text-zinc-600 leading-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    ↗
                  </sup>
                </div>
                <p className="text-zinc-600 text-sm md:text-base">{item.description}</p>
              </Link>

              {item.todos && item.todos.length > 0 && (
                <TodoList items={item.todos} />
              )}

              {item.tags && item.tags.length > 0 && (
                <p className="text-zinc-400 text-sm mt-2 space-x-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="inline-block">
                      #{tag}
                    </span>
                  ))}
                </p>
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
