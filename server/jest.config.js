module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalTeardown: '<rootDir>/test-teardown-globals.js',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!__tests__/__mocks__/*/ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      statments: 90,
      lines: 100,
    },
    './utils': {
      branches: 100,
      functions: 100,
      statments: 100,
      lines: 100,
    },
  },
};
