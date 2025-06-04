import { PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from './testConfig';
import 'dotenv/config'; // Make sure dotenv is at the top if you use it

const ENV = process.env.TEST_ENV;

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}

// ReportPortal Configuration
const RPconfig = {
  apiKey: 'admin-key',
  endpoint: 'http://localhost:8080/api/v1',
  project: 'superadmin_personal', // Or the specific project name you want to use
  launch: process.env.RP_LAUNCH_NAME || 'Playwright Test Launch',
  attributes: [
    {
      key: 'agent',
      value: 'playwright-typescript',
    },
    {
      key: 'environment',
      value: ENV, // Optional: Pass your test environment as an attribute
    },
  ],
  description: 'Test execution from Playwright TypeScript framework',
  // includeTestSteps: true,
  // uploadVideo: true,
  // uploadTrace: true,
};

const config: PlaywrightTestConfig = {

  //Global Setup to run before all tests
  globalSetup: `./global-setup`,

  //sets timeout for each test case
  timeout: 120000,

  //number of retries if test case fails
  retries: 0,

  //Reporters
  reporter: [
    ['html', { outputFolder: 'html-report', open: 'never' }],
    ['./lib/MetadataReporter.ts'],
    // ['@reportportal/agent-js-playwright', RPconfig]
  ],

  projects: [
    {
      name: `Chrome`,
      use: {
        // Configure the browser to use.
        browserName: `chromium`,

        //Chrome Browser Config
        channel: `chrome`,

        //Picks Base Url based on User input
        baseURL: testConfig[ENV],

        //Browser Mode
        headless: true,

        //Browser height and width
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,

        //Enable File Downloads in Chrome
        acceptDownloads: true,

        //Artifacts
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,

        //Slows down execution by ms
        launchOptions: {
          slowMo: 0,
          args: ['--headless=new']
        }
      },
    },
    {
      name: `Chromium`,
      use: {
        browserName: `chromium`,
        baseURL: testConfig[ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },

    {
      name: `Firefox`,
      use: {
        browserName: `firefox`,
        baseURL: testConfig[ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },

    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        baseURL: testConfig[ENV],
        headless: false,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `WebKit`,
      use: {
        browserName: `webkit`,
        baseURL: testConfig[ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `API`,
      use: {
        baseURL: testConfig[ENV]
      }
    }
  ],
};
export default config;