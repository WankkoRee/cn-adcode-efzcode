import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  "verbose": true,
  "collectCoverage": true,
  "collectCoverageFrom": [
    '<rootDir>/src/**/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts}',
    '!<rootDir>/src/raw/**',
  ],
  "transform": {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  "testMatch": [
    "<rootDir>/src/__tests__/**/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts}",
  ],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}

export default jestConfig;
