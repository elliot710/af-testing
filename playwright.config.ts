import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './e2e_tests/tests',
  testMatch: /.*\.spec\.ts/,
  timeout: 30000,
  retries: 1,
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
      },
    },
  ],
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  use: {
    // Emulates `'prefers-colors-scheme'` media feature.
    colorScheme: 'dark',

    // Context geolocation.
    //geolocation: { longitude: 12.492507, latitude: 41.889938 },

    // Emulates the user locale.
    locale: 'en-US',

    // Grants specified permissions to the browser context.
    //permissions: ['geolocation'],

    // Emulates the user timezone.
    //timezoneId: 'Europe/Paris',

    // Viewport used for all pages in the context.
    viewport: { width: 1980, height: 960 },
  },
});