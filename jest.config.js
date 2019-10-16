module.exports = {
  preset: 'ts-jest',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  coverageDirectory: './coverage',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/dist/', '/node_modules/'],
};
