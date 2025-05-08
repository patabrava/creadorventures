import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Set test environment
  testEnvironment: 'jsdom',
  // Define test patterns
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  // Define which files to transform
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // Define module name mapper if needed
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^contentlayer/generated$': '<rootDir>/.contentlayer/generated',
  },
  // Define coverage configuration
  collectCoverageFrom: [
    'core/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  // Set coverage directory
  coverageDirectory: 'coverage',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig); 