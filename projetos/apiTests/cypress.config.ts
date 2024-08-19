const { defineConfig } = require("cypress");


module.exports = defineConfig({
  viewportWidth: 1433,
  viewportHeight: 1366,
  chromeWebSecurity: false,
  waitForAnimations: true,
  reporter: "junit",
  requestTimeout: 60000,
  responsetimeout: 60000,

  reporterOptions: {
    mochaFile: "results/results-[hash].xml",
    toConsole: true,
  },
  video: false,

  e2e: {
    setupNodeEvents(on, config) {

    }
  }
})

