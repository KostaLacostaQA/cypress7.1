const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "gx9xg5",
    baseUrl: "http://qamid.tmweb.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});