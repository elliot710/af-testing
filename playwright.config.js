import { defineConfig } from '@playwright/test';

const testDir = defineBddConfig({
  paths: ["e2e_tests/tests/features/**/*.feature"],
  require: ["e2e_tests/tests/steps/**/*.ts"],
});

export default defineConfig({
  testDir,
});