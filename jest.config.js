module.exports = {
  rootDir: "./",
  coverageDirectory: "<rootDir>/tests/__coverage__/",
  setupFiles: [
    "<rootDir>/tests/__mocks__/shim.js"
  ],
  roots: [
    "<rootDir>/client/",
    "<rootDir>/tests/"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/__mocks__/fileMock.js",
    "\\.(css|scss|less)$": "<rootDir>/tests/__mocks__/styleMock.js"
  },
  moduleFileExtensions: ["js", "jsx"],
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
  ],
  testRegex: "/tests/.*\\.test\\.(js|jsx)$",
  moduleDirectories: [
    "node_modules"
  ],
  globals: {
    "DEVELOPMENT": false,
    "FAKE_SERVER": false
  }
};
