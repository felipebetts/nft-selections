module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        'ts-jest': {
          tsconfig: 'tsconfig.json',
        },
      },
    ],
  },
  testMatch: ['**/*.test.ts'],
}
