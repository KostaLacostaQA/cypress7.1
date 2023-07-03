const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "pqj9vd",
    baseUrl: 'http://qamid.tmweb.ru/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
