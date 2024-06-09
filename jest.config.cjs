module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'vue'],
  transformIgnorePatterns: [
    'node_modules/(?!(@babel/preset-env|@vue/test-utils))'
  ]
};
