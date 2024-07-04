import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  paths: ["e2e_tests/tests/features/**/*.feature"],
  require: ["e2e_tests/tests/steps/**/*.ts"],
});

export default defineConfig({
  testDir,
});