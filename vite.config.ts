import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

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
  ]),
});
