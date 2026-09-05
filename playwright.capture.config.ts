import { defineConfig } from "file:///C:/Users/Anton/AppData/Local/Temp/bunx-1504773743-@playwright/test@latest/node_modules/@playwright/test/index.mjs";

export default defineConfig({
  testDir: "./scripts",
  testMatch: "capture-current-product.spec.ts",
  timeout: 30_000,
  workers: 1,
  use: {
    browserName: "chromium",
    viewport: { width: 1536, height: 1025 },
    launchOptions: {
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    },
  },
});
