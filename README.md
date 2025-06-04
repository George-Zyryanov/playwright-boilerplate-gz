# Playwright Test Automation Framework

A robust test automation framework built with Playwright and TypeScript, designed for end-to-end testing of web applications.

## Features

- Cross-browser testing (Chrome, Firefox, WebKit, Edge)
- API testing support
- Database testing with PostgreSQL
- Visual comparison testing
- HTML/Allure/Ortoni reporting
- GitHub Actions CI/CD integration
- Slack notifications
- PDF text extraction
- Excel file operations
- Network request replay (HAR)

## Prerequisites

- Node.js
- Java 8+ (for Allure reports)
- npm

## Installation

1. Clone the repository:
```sh
git clone https://github.com/George-Zyryanov/playwright-gym
```

2. Install dependencies:
```sh
npm install
```

3. Install browsers:
```sh
npx playwright install
```

4. Set environment (Mac/Ubuntu):
```sh
export npm_config_ENV="qa"
```

## Usage

### Basic Test Execution

Run all tests:
```sh
npm run test --ENV="qa"
```

Run single test:
```sh
npm run test:single --ENV="qa"
```

Run tests in parallel:
```sh
npm run test:parallel --ENV="qa"
```

Run tests in sequence:
```sh
npm run test:serial --ENV="qa"
```

### API Testing

```sh
npm run test:api --ENV="qaApi"
```

### Visual Testing

```sh
npm run test:visual --ENV="qa"
```

### Reports

Generate Allure report:
```sh
npm run allureReport
```

## Configuration

- Browser settings: `playwright.config.ts`
- Test data: `testConfig.ts`
- Environment variables: Set `npm_config_ENV` to "qa" or "dev"

## Project Structure

```
├── tests/              # Test files
├── pageFactory/        # Page Object Models
├── lib/               # Core utilities
├── utils/             # Helper functions
└── docs/              # Documentation
```

## License

MIT
