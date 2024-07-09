# Playwright, TypeScript, and Cucumber Testing Framework

This repository provides a starter template for a testing framework using Playwright, TypeScript, and Cucumber. Follow the instructions below to set up and run the tests.

## Prerequisites

- Node.js (v14 or later)
- npm
- playwright

## Getting Started


The repository is also available as a github codespace if you want to spin it up and get running as quickly as possible.
> **_NOTE:_**  Unfortunately UI tests won't run in codespace (headed mode)

### 1. Clone the Repository

```bash
git clone https://github.com/elliot710/af-testing.git
cd af-testing
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Project Structure

```
.
├── af-testing.code-workspace           # VSCode workspace configuration
├── config
│   ├── .env.dev                        # Development environment configuration
│   ├── .env.live                       # Live environment configuration
│   ├── .env.stage                      # Staging environment configuration
├── e2e_tests
│   ├── corelib
│   │   └── corelib.spec.ts
│   ├── tests
│   │   ├── features                    # Cucumber Feature files
│   │   │   └── homepage.feature
│   │   ├── locators                    # Web Elements Locators
│   │   │   └── homepageloc.json
│   │   ├── pages                       # Page Object Models
│   │   │   ├── basePage.ts
│   │   │   └── homePage.ts
│   │   └── steps                       # Tests
│   │       └── homePage.spec.ts
├── node_modules
├── reports
│   ├── cucumber_report.html
│   ├── cucumber_report.json
│   └── cucumber_report.xml
├── .vscode
│   └── extensions.json                 # VSCode workspace extensions
├── .gitignore
├── cucumber.json                       # Cucumber configuration
├── index.ts                            # Reporting page generation
├── package-lock.json
├── package.json                        # Info, License and dev dependencies
├── README.md
└── tsconfig.json                       # TypeScript configuration


### 4. Configuration

Playwright Configuration
Ensure Playwright is properly configured in`package.json`.

Install Chrome

```bash
npx playwright install chrome
```

Cucumber Configuration
The `cucumber.json` file contains configurations for Cucumber. Modify this file as needed.


### 5. Running Tests
To run the tests, use the following command:

Using npm:

```bash
npm test
```