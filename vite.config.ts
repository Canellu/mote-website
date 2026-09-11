import { rm } from "node:fs/promises";
import path from "node:path";
import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

/**
 * The visual-QA harness has to live in public/ to be served during development,
 * and everything in public/ is copied verbatim into the build — so a local
 * `bun run build` was shipping a crawlable dev tool to production. Being
 * gitignored kept it out of the repository, not out of dist. Deleting it after
 * the client output is written is the one place that catches both routes.
 */
const DEV_ONLY_PUBLIC_ASSETS = ["visual-check.html", "visual-check.js"];

function stripDevOnlyPublicAssets() {
  return {
    name: "mote-strip-dev-only-public-assets",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      const clientDirectory = path.resolve("dist/client");
      await Promise.all(
        DEV_ONLY_PUBLIC_ASSETS.map((asset) =>
          rm(path.join(clientDirectory, asset), { force: true }),
        ),
      );
    },
  } as const;
}

export default defineConfig({
  test: {
    environment: "node",
    // Browser capture scripts run with Playwright, not the website's unit tests.
    exclude: ["**/node_modules/**", "**/.git/**", "scripts/capture-*.spec.ts"],
  },
  staged: {
    "*.{css,html,js,json,jsonc,jsx,md,ts,tsx,yaml,yml}": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["src/routeTree.gen.ts"],
    printWidth: 100,
    semi: true,
    singleQuote: false,
  },
  lint: {
    ignorePatterns: [
      "src/routeTree.gen.ts",
      "scripts/capture-*.spec.ts",
      "playwright.capture.config.ts",
    ],
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
    },
  },
  plugins: lazyPlugins(() => [
    tanstackStart({
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    react(),
    tailwindcss(),
    stripDevOnlyPublicAssets(),
  ]),
});
