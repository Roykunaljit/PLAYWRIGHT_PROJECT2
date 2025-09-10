// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout:60000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
    // 'list' reporter for detailed terminal output.
    ['list'],

    // HTML reporter to generate a self-contained report.
    ['html', {
      outputFolder: 'playwright-report',
      open: 'on-failure'
    }],
    // JSON reporter for programmatic processing.
    ['json', {
      outputFile: 'test-results/json-report.json'
    }],
    // JUnit reporter for CI systems like Jenkins.
    ['junit', {
      outputFile: 'test-results/junit-report.xml'
    }],
    // Allure reporter for rich, interactive reports.
    ['allure-playwright', {
      outputFolder: 'allure-results'
    }]
  ],
 
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
        headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    baseURL: 'https://www.saucedemo.com/'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        // This can help if a self-signed certificate or proxy is causing SSL issues.
        ignoreHTTPSErrors: true,
        // Add browser-specific launch options for Firefox.
        launchOptions: {
          firefoxUserPrefs: {
            // Force a direct network connection to bypass potential proxy detection issues.
            'network.proxy.type': 0,
          },
        },
      },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
