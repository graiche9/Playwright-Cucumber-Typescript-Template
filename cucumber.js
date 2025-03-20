module.exports = {
    default: {
      require: [
        "step-definitions/**/*.ts",   // Path to step definitions
        "hooks/**/*.ts"               // Path to hooks
      ],
      format: [
        "allure-cucumberjs/reporter",
        "progress",
        "json:reports/cucumber-report.json", // JSON report for analysis
        "html:reports/cucumber-report.html",  // HTML report for human-readable output

      ],
     // tags: "@valid or @invalid",  // Run specific tests with tags
      worldParameters: {           // Custom parameters for tests
        baseUrl: "http://192.168.1.95:9091/admin/login/?next=/admin/"
      },
      requireModule: ["ts-node/register"], // Enable TypeScript
      timeout: 30000, // Set test timeout (10s)
    },
  };
  