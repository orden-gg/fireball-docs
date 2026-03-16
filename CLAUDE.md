# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fireball Docs is the official documentation site for Fireball, a gaming automation platform for Gigaverse. It's built with Next.js 16, Fumadocs (a modern documentation framework), and Tailwind CSS 4.

## Essential Commands

### Development
- `bun install` - Install dependencies (requires Bun)
- `bun run dev` - Start development server with Turbopack on localhost:3000
- `bun run build` - Build for production
- `bun start` - Start production server

### Testing & Quality
- `bun run typecheck` - Run TypeScript type checking (required before commits)
- `bun run lint` - Run ESLint

## Architecture

### Documentation Build System

This project uses **Fumadocs**, which automatically processes MDX files at build time:

1. **Content Location**: All documentation lives in `content/docs/` as MDX files
2. **Build Process**: The `postinstall` script runs `fumadocs-mdx`, which:
   - Scans `content/docs/` (configured in `source.config.ts`)
   - Generates type-safe data files in `.source/` directory
   - Creates `docs` and `meta` exports for the documentation structure
3. **Source Loading**: `lib/source.ts` imports from `.source/` and creates a Fumadocs loader
4. **Rendering**: The catch-all route `app/[[...slug]]/page.tsx` uses the loader to render pages

**Important**: The `.source/` directory is auto-generated. Never edit it manually. Changes to MDX files trigger regeneration.

### Data Fetching Pattern

The project integrates with Gigaverse blockchain data using a two-layer pattern:

1. **Server Singleton** (`lib/server.ts`):
   - Maintains a global `JuicedSubgraph` client from `@fireballgg/sdk`
   - Uses global variables to persist across requests
   - Provides `getJuicedSubgraph()` and `clearClients()` utilities

2. **API Routes** (`app/api/`):
   - Server-side endpoints that use the singleton client
   - Example: `/api/items-last-sale` fetches item pricing data

3. **Client Hooks** (`hooks/`):
   - React Query hooks wrap API endpoints
   - Example: `useItemsLastSale()` fetches and caches pricing with infinite stale time

This pattern keeps GraphQL clients server-side while providing reactive data to client components.

### Component Structure

- **Server Components**: Most pages are server-rendered (default in Next.js App Router)
- **Client Components**: Marked with `'use client'` directive
  - `QueryProvider`: Wraps app with React Query configuration
  - Data display components (e.g., `ItemsTable`, `GearTable`)
- **MDX Components**: Extended via `mdx-components.tsx` using Fumadocs defaults

### Styling System

- **Tailwind CSS 4**: Uses the new PostCSS-based architecture
- **Fumadocs Theming**: Pre-configured with dark mode default, system theme support
- **Custom Fonts**: Geist (sans) and Geist Mono (monospace) from `next/font/google`
- **CSS Variables**: Rarity colors and other variables defined in `app/globals.css`

### Path Aliases

TypeScript is configured with `@/*` aliases mapping to the root directory (see `tsconfig.json`).

## Content Guidelines (from CONTRIBUTING.md)

### Adding Documentation

1. Create MDX files in `content/docs/` subdirectories (e.g., `features/`, `guides/`, `games/`)
2. Use lowercase-with-hyphens naming: `my-feature.mdx`
3. Always include frontmatter:
   ```mdx
   ---
   title: Your Page Title
   description: Brief description of the page content
   ---
   ```
4. The development server auto-reloads on changes

### File Organization

Structure mirrors navigation:
- `content/docs/features/` - Feature documentation
- `content/docs/games/` - Game-specific guides
- `content/docs/guides/` - General guides
- `content/docs/gigaverse/` - Gigaverse ecosystem docs
- `content/docs/reference/` - API/technical reference
- `content/docs/changelog/` - Version history

## Working with Components

### Creating Data-Driven Components

When building components that display game data:

1. Create an API route in `app/api/` that uses `getJuicedSubgraph()` from `lib/server.ts`
2. Build a React Query hook in `hooks/` to fetch from that API route
3. Create the UI component in `components/` using the hook
4. Import and use the component in MDX files

Example pattern seen in `ItemsTable`:
- API: `app/api/items-last-sale/route.ts`
- Hook: `hooks/use-items-last-sale.ts`
- Component: `components/items-table.tsx`
- Usage: Import directly in MDX content files

## Important Notes

- **Node Version**: Requires Node.js >=22.0.0 (specified in `package.json`)
- **Package Manager**: Project uses Bun for faster installs and runtime
- **Build Output**: Next.js generates `.next/` directory (excluded from git)
- **Type Safety**: The `.source/` directory provides type-safe access to documentation structure
- **Search**: Built-in search via Fumadocs API at `/api/search`

## Deployment

Configured for Vercel deployment:
- `vercel.json` contains deployment configuration
- Environment variables handled through Vercel dashboard
- Automatic deployments on push to main branch
