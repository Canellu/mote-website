# Mote Website

React website for Mote Desktop, built with TypeScript, Vite+, Bun, TanStack
Router, and Tailwind CSS. Vite+ provides the Vite dev server and production
build, Vitest, Oxlint, Oxfmt, and type-aware TypeScript checks.

## Development

```bash
bun install
bun dev
```

## Quality checks

```bash
bun run check
bun run test
```

Use `bun run check:fix` to apply formatting and safe lint fixes.

## Production build

```bash
bun run build
```

The production script runs checks and tests before creating the build.

The same Vite+ checks run automatically in GitHub Actions for pushes and pull
requests.
