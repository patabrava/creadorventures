// Jest setup file
// Add any global setup code for Jest tests here
import { beforeAll, afterAll } from '@jest/globals';

// This will be run before each test file
beforeAll(() => {
  // Set up environment variables for testing
  process.env = {
    ...process.env,
    NODE_ENV: 'test'
  };
});

// This will be run after each test file
afterAll(() => {
  // Clean up any resources
}); 