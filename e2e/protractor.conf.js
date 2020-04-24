// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

process.env.CHROME_BIN = require('puppeteer').executablePath();
const puppeteer = require('puppeteer');
const {SpecReporter} = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: ["--headless", "--disable-gpu", "--window-size=800x600", "--no-sandbox"],
      binary: puppeteer.executablePath()
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },

  // Enable TypeScript for the tests
  onPrepare() {
    require('ts-node').register({
      project: __dirname + '/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
  }
};
