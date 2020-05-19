const { jestConfig } = require('@orxe-devkit/angular-jest-config');
const config = jestConfig();

config.moduleNameMapper = {
  "@app/(.*)": "<rootDir>/src/app/$1",
  "@orxe-core/(.*)": "<rootDir>/src/app/core/$1",
  "@orxe-shared/(.*)": "<rootDir>/src/app/shared/$1",
  "@orxe-shared-components/(.*)": "<rootDir>/src/app/shared/components/$1",
  "@orxe-shared-directives/(.*)": "<rootDir>/src/app/shared/directives/$1",
  "@orxe-shared-pipes/(.*)": "<rootDir>/src/app/shared/pipes/$1",
  "@env/(.*)": "<rootDir>/src/environments/$1",
  "^shell-sdk": "<rootDir>/dist/shell-sdk",
  "^shell-sdk/(.*)": "<rootDir>/dist/shell-sdk/$1"
}

const jestShellConfig = function() { return config; }
module.exports = jestShellConfig();
