# Content System

File-based content management. Filesystem is the source of truth.

## Structure

```
/public/reading/{id}.jpg      + metadata.json
/public/movies/{id}.jpg       + metadata.json
/public/photographs/{year}/{id}.jpg + metadata.json
```

## Rules

1. **Filename = ID** - `inception.jpg` → id is `inception`
2. **Kebab-case** - lowercase, hyphens for spaces
3. **One metadata.json per folder** - contains all entries for that content type
4. **Photos use year subfolders** - id format: `{year}/{filename}`

## LLM Tasks

### "scan [type]" or "update [type] metadata"
1. List images in `/public/{type}/`
2. Read `metadata.json`
3. Find images without metadata entries
4. For each missing: infer title from filename, research details if needed
5. Add entry to `metadata.json`

### "validate content"
1. Check each content type
2. Report: images without metadata, metadata without images, missing required fields

### "add to featured"
1. Update `featured` array in `/app/content/config.ts`
2. Use the item's ID

## Metadata Format

See `/app/content/types.ts` for field definitions.

Reading requires: `title`, `author`
Movies requires: `title`, `director`
Photos: all optional (EXIF auto-extracted)
