import { cn } from "../lib/utils";

export type TodoItem = {
  title: React.ReactNode;
  description?: string;
  completed?: boolean;
};

export function TodoList({ items }: { items: TodoItem[] }) {
  return (
    <ul className="mt-4 space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2">
          <div
            className={cn(
              "size-6 rounded-full border shrink-0 transition-colors",
              item.completed ? "bg-zinc-500 border-zinc-500" : "border-zinc-300 bg-transparent",
            )}
          />
          <div className="flex-1">
            <span
              className={cn(
                "text-base",
                item.completed ? "text-zinc-400 line-through" : "text-zinc-600",
              )}
            >
              {item.title}
            </span>
            {item.description && <p className="text-zinc-400 text-xs mt-0.5">{item.description}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
