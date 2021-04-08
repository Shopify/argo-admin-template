module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['**/tests/**/*.test.+(ts|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
    },
  },
};
