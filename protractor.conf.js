// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  sauceUser: 'OBL_ContentDevTest',
  sauceKey: 'e817a07c-eb9b-4777-8c9b-a54d6e539fa9',
  allScriptsTimeout: 300000,
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './testing/e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'version': '73.0',
    'platform': 'Windows 10',
    'passed': 'true',
    'name': 'branches app win 10'
  },
  /*multiCapabilities: [{
    'browserName': 'chrome',
    'version': '73.0',
    'platform': 'Windows 10',
    'passed': 'true',
    'name': 'branches app win 10 chrome'
  }, {
    'browserName': 'chrome',
    'version': '73.0',
    'platform': 'macOS 10.14',
    'passed': 'true',
    'name': 'branches app Mac chrome'
  }],*/
  // directConnect: true,
  baseUrl: 'https://nest-staging.eastus2.cloudapp.azure.com/tool/view/',// 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'testing/e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './dist/test_reports/e2e/'
      })
    );
  }


};
