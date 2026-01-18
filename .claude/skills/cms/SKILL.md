---
name: cms
description: Manage portfolio content - add books, films, photos, projects, and todos. Use when user wants to add, update, or modify content on the portfolio site.
---

# Content Management

All data lives in `app/data/`. Images live in `public/`.

## Data Structure

```
app/data/
├── index.ts      # Exports everything
├── site.ts       # name, nav, social, projects, todos
├── books.ts      # Book list
├── films.ts      # Film list
├── photos.ts     # Generated at build time
└── featured.ts   # Featured items config
```

## Types

All items use the unified `Item` type from `app/types.ts`:

```ts
interface Item {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;  // Author for books, director for films
  url?: string;
  tags?: string[];
  location?: string;     // Photos only
  year?: number;         // Photos only
  date?: string;         // Photos only
  exif?: Exif;           // Photos only
}
```

## Adding Content

### Add a Book
1. Add image to `public/reading/{id}.jpg`
2. Add entry to `app/data/books.ts`:
```ts
{
  id: "book-id",
  title: "Book Title",
  description: "Author Name",
  imageUrl: "/reading/book-id.jpg",
}
```

### Add a Film
1. Add image to `public/films/{id}.jpg`
2. Add entry to `app/data/films.ts`:
```ts
{
  id: "film-id",
  title: "Film Title",
  description: "Director Name",
  imageUrl: "/films/film-id.jpg",
}
```

### Add a Photo
1. Add image to `public/photographs/{year}/{id}.jpg`
2. Run `bun run generate` to extract EXIF and update `app/data/photos.ts`
3. Optionally add metadata override in `public/photographs/metadata.json`:
```json
{
  "2025/photo-id": {
    "title": "Custom Title",
    "location": "Location Name"
  }
}
```

### Add a Project
Add entry to `app/data/site.ts` in the `projects` array:
```ts
{
  title: "Project Name",
  description: "What it does",
  url: "https://...",
  tags: ["Tag1", "Tag2"],
  category: "work" | "hackathon" | "idea",
  period: "2024 - Now",  // work only
  status: "Active",      // optional
}
```

### Add a Todo
Add entry to `app/data/site.ts` in the `todos` array:
```ts
{ title: "Goal description" }
```

### Update Featured
Edit `app/data/featured.ts`:
```ts
export const featured = {
  reading: ["book-id-1", "book-id-2", "book-id-3"],
  films: ["film-id-1", "film-id-2", "film-id-3"],
  photos: ["2025/photo-id-1", "2025/photo-id-2", "2025/photo-id-3"],
};
```

## File Naming

- **Kebab-case**: lowercase, hyphens for spaces (`dark-knight-rises.jpg`)
- **Filename = ID**: `inception.jpg` → id is `inception`
- **Photos use year folders**: `2025/sunset.jpg` → id is `sunset`, year is `2025`

## Build Commands

```bash
bun run generate  # Regenerate photos.ts from filesystem
bun run build     # Runs generate + next build
bun run dev       # Development server
```
