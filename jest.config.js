module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/(__tests__|src)/**/?*\.spec\.[jt]s?(x)'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
};
