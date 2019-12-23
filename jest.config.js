module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['jest-enzyme', require.resolve('./test/global.ts')],
  testEnvironment: 'enzyme',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
