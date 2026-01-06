type TreeItem = {
  title: React.ReactNode;
  description?: string;
  status?: string;
  period?: string;
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
              <div className="h-6 flex items-baseline gap-2">
                <span>{item.title}</span>
                {item.status && (
                  <span className="text-zinc-400">{item.status}</span>
                )}
              </div>
              {item.description && (
                <p className="text-zinc-400">{item.description}</p>
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
