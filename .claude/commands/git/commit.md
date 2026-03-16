---
description: "Create a conventional commit"
---

# Create Git Commit

Create a commit with message: `$ARGUMENTS`

## Workflow

### 1. Check Staged Changes

```bash
git status
git diff --cached --stat
```

If nothing staged, warn user and suggest `git add`.

### 2. Format Commit Message

**Conventional commit format:**

```
<type>: <description>

[optional body]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

### 3. Create Commit

```bash
git commit -m "<formatted message>"
```

### 4. Push to Remote

```bash
git push origin <branch-name>
```

### 5. Confirm Success

Show commit hash and pushed status.

## Examples

```bash
/commit add search to docs nav
# → feat: add search to docs nav

/commit fix typo in getting started guide
# → fix: fix typo in getting started guide

/commit "docs: improve installation section

Added bun-specific instructions"
```

## Commit Guidelines

- Use imperative mood: "add" not "added"
- Keep subject under 50 characters
- Lowercase for consistency
- One logical change per commit
