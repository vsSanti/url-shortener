import config from '../jest.config';

config.collectCoverage = true;
config.rootDir = '../';
config.coverageThreshold = {
  global: {
    branches: 100,
    functions: 100,
    lines: 100,
    statements: 100,
  },
};

export default config;
