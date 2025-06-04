import { PlaywrightTestConfig } from '@playwright/test';
import { testConfig } from './testConfig';

const ENV = process.env.npm_config_ENV;

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}

// ReportPortal Configuration
const RPconfig = {
  apiKey: process.env.RP_API_KEY || 'YOUR_RP_API_KEY_PLACEHOLDER',
  endpoint: process.env.RP_ENDPOINT || 'YOUR_RP_ENDPOINT_PLACEHOLDER',
  project: process.env.RP_PROJECT_NAME || 'YOUR_RP_PROJECT_NAME_PLACEHOLDER',
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
  // includeTestSteps: true, // Set to true if you use test.step() and want them reported as nested steps
  // uploadVideo: true, // Already handled by Playwright's trace/video settings
  // uploadTrace: true, // Already handled by Playwright's trace/video settings
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
    ['@reportportal/agent-js-playwright', RPconfig]
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