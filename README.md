# Playwright, TypeScript, and Cucumber Testing Framework

This repository provides a starter template for a testing framework using Playwright, TypeScript, and Cucumber. Follow the instructions below to set up and run the tests.

## Prerequisites

- Node.js (v14 or later)
- npm
- playwright

## Getting Started


The repository is also available as a github codespace if you want to spin it up and get running as quickly as possible.

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

```bash
.
├── af-testing.code-workspace # VSCode workspace configuration
├── e2e_tests
│   ├── corelib
│   ├── tests
│   │   ├── features
│   │   │   ├── products
│   │   │   │   └── productpage.feature
│   │   │   └── homepage.feature
│   │   ├── locators
│   │   ├── pages
│   │   └── steps
│   │       └── homepage.spec.ts
├── node_modules
├── reports
├── .vscode
│   └── extensions.json    # VSCode workspace extensions
├── cucumber.json          # Cucumber configuration
├── package-lock.json
├── package.json           # Info, License and dev dependencies
├── README.md
└── tsconfig.json          # TypeScript configuration

```

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