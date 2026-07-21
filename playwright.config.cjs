const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  timeout: 60000,
  expect: {
    timeout: 15000,
  },
  webServer: [
    {
      command: 'node ../MedPluse_BackEnd/e2e-test-server.js',
      port: 5000,
      reuseExistingServer: false,
      timeout: 300000,
    },
    {
      command: 'npx vite --port 5173',
      port: 5173,
      reuseExistingServer: false,
      timeout: 30000,
    },
  ],
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
  },
});
