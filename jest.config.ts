module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  transform: {
    // "^.+\\.vue$": "vue-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
};
