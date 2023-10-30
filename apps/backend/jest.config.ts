module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
    },]
  },
  testMatch: ['**/test/**/*.test.(ts|js)', '**/*.test.(ts|js)', '**/__tests__/*.+(ts|tsx|js)'],
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'lcov', 'cobertura'],
};