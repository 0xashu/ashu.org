---
name: commit
description: Commit changes organized by category. Use when user wants to commit, save changes, or says "commit by category". Groups related changes into separate commits with conventional commit messages.
---

# Smart Commit

Organize and commit changes by category with conventional commit messages.

## Process

1. **Run `git status`** to see all changes
2. **Categorize changes** by type:
   - `feat`: New features, new files, new functionality
   - `fix`: Bug fixes, error corrections
   - `refactor`: Code restructuring without changing behavior
   - `style`: Formatting, styling, UI changes
   - `docs`: Documentation, comments, README
   - `chore`: Build, config, dependencies, scripts
   - `perf`: Performance improvements
   - `test`: Tests

3. **Group related files** into logical commits:
   - Files that work together should be in the same commit
   - One category can have multiple commits if changes are unrelated

4. **Create commits** with format:
   ```
   <type>: <short description>

   <optional body explaining what and why>

   Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
   ```

## Examples

### Single category
```bash
git add app/components/Button.tsx app/components/Input.tsx
git commit -m "style: Update form component styles

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

### Multiple categories
```bash
# First commit - feature
git add app/data/photos.ts scripts/generate-photos.ts
git commit -m "feat: Add build-time photo generation

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# Second commit - refactor
git add app/page.tsx app/reading/page.tsx
git commit -m "refactor: Simplify page imports

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

## Rules

- Never commit secrets, .env files, or credentials
- Keep commits atomic (one logical change per commit)
- Write clear, descriptive messages
- Always include Co-Authored-By line
- Use present tense ("Add feature" not "Added feature")
- Keep first line under 72 characters

## Quick Reference

| Type | When to use |
|------|-------------|
| feat | Adding new functionality |
| fix | Fixing a bug |
| refactor | Changing code structure |
| style | UI/CSS/formatting changes |
| docs | Documentation only |
| chore | Build/config/tooling |
| perf | Performance improvements |
| test | Adding/updating tests |
