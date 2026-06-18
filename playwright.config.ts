import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Build, then serve the standalone server (`next start` is unsupported with
  // `output: "standalone"`). The standalone bundle doesn't include public/ or
  // .next/static, so copy them in first. Copies are idempotent for local reuse.
  webServer: {
    command: [
      "npm run build",
      "rm -rf .next/standalone/public .next/standalone/.next/static",
      "cp -r public .next/standalone/public",
      "cp -r .next/static .next/standalone/.next/static",
      "node .next/standalone/server.js",
    ].join(" && "),
    url: baseURL,
    env: { PORT: String(PORT), HOSTNAME: "127.0.0.1" },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
