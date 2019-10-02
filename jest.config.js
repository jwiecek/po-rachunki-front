const {defaults} = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // ...
  globals: {
    'ts-jest': {
      // ...
      diagnostics: {
        ignoreCodes: [151001]
      }
    }
  }
};
