# Mote Website

Statically prerendered React website for Mote Desktop, built with TypeScript,
Vite+, Bun, TanStack Start, and Tailwind CSS. Vite+ provides the development
server and production build, Vitest, Oxlint, Oxfmt, and type-aware TypeScript
checks. TanStack Start generates complete HTML for every public route at build
time; v1 does not require a production server.

## Development

```bash
bun install
bun dev
```

### Temporary TanStack Start patch

`bun install` applies
`patches/@tanstack%2Fstart-plugin-core@1.171.39.patch` to work around
[TanStack Router issue #7614](https://github.com/TanStack/router/issues/7614).
Vite+ provides an import-capable SSR runner that fails TanStack Start's Vite
class check, so the patch detects the `runner.import` capability directly.

When TanStack releases the upstream fix, upgrade the Start dependencies, remove
the matching `patchedDependencies` entry and patch file, run `bun install`, and
verify `vp dev` before committing the upgrade.

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

The production script runs checks and tests, prerenders every public route, and
verifies that each route contains independently accessible HTML and metadata.
The static Cloudflare Pages output directory is `dist/client`.

The same Vite+ checks run automatically in GitHub Actions for pushes and pull
requests.
