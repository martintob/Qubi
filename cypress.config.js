const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://api.club-administration.qa.qubika.com', // Set the base URL for the API endpoints
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
