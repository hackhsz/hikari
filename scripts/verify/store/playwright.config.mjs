// Step 4: Playwright against the real store. Reads its target from the environment;
// see ../README.md. One worker, because every test shares one store.
import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

const store = (process.env.HIKARI_STORE || '').replace(/^https?:\/\//, '').replace(/\/+$/, '');
const exe = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

export default defineConfig({
  testDir: '.',
  outputDir: '../out/store-results',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: store ? `https://${store}` : undefined,
    launchOptions: exe ? { executablePath: exe } : {},
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { browserName: 'chromium', viewport: { width: 1280, height: 900 } } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
});
