import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // Add these lines for Mochawesome configuration
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results/mochawesome', // Folder to store JSON reports
      overwrite: false, // Don't overwrite existing reports (useful for merging later)
      html: false, // Don't generate HTML directly (we'll merge and generate later)
      json: true, // Generate JSON reports
      timestamp: 'mmddyyyy_HHMMss' // Add timestamp to filenames
    },
    // Optional: Keep testIsolation true if you want each test to be independent
    // testIsolation: true,
  },
});
