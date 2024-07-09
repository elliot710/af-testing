
var reporter = require('cucumber-html-reporter');
import dotenv from "dotenv";

var options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: 'reports/cucumber_report_bootstrap.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: false,
    launchReport: false,
    columnLayout: 1,
    screenshotsDirectory: 'reports/',
    metadata: {
        browser: '',
        app_url: ''
    },
    failedSummaryReport: true,
};

function generateHtml() {
    dotenv.config({
        path: `${process.cwd()}/config/.env.${process.env.environment}`
    });
    let browserType = process.env.browser;
    options.metadata.browser = browserType!;
    options.metadata.app_url = process.env.app_url!;
    reporter.generate(options);
}

generateHtml();
