module.exports = {
  projectId: 'km88cg',
  e2e: {
    setupNodeEvents(on, config) {
      if (config.testingType === 'e2e') {
        on('before:browser:launch', (browser, launchOptions) => {
          if (browser.name === 'chrome') {
            return launchOptions;
          }
        });
      }
    },
  },
};