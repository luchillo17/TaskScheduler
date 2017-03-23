// Karma configuration
// Generated on Mon Jan 30 2017 09:57:01 GMT-0500 (COT)


import webpackConfig from './config/webpack.test'; // the settings that are common to prod and dev
// import karma from 'karma';
// Custom imports
import {
  root,
  isWebpackDevServer,
 } from './config/helpers';

const srcGlob = 'src/**/!(main.electron|*.spec|*.d).ts';
const testGlob = 'src/**/*.spec.ts';
const webpackEnv = { env: 'test' };

export default (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Fix for typescript mime type to send ts files to browser for testing
    mime : {
      'text/x-typescript': [
        'ts',
        'tsx'
      ]
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'source-map-support'],

    // list of files / patterns to load in the browser
    files: [
      // srcGlob,
      // './node_modules/core-js/index.js',
      { pattern: srcGlob,       watched: false, included: true, served: true },
      { pattern: testGlob,       watched: false, included: true, served: true },
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [srcGlob]: [ 'webpack', 'electron', 'sourcemap' ],
      [testGlob]: [ 'webpack', 'electron', 'sourcemap' ],
    },

    webpack: webpackConfig(webpackEnv),
    webpackMiddleware: {noInfo: true},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    reporters: ['spec', 'notification', 'coverage-istanbul'],
    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: false,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: false,  // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },
    coverageIstanbulReporter: {
      /** Reports can be any that are listed here:
       * https://github.com/istanbuljs/istanbul-reports/tree/master/lib
       */
      // tslint:disable-next-line:object-literal-key-quotes
      reports: [
        'json-summary',
        'lcov',
      ],
      'report-config': {
        html: { subdir: 'html' },
        lcov: { subdir: 'lcov' },
      },
      // tslint:disable-next-line:object-literal-key-quotes
      dir: './coverage', // output directory
      // if using webpack and pre-loaders, work around webpack breaking the source path
      // tslint:disable-next-line:object-literal-key-quotes
      fixWebpackSourcePaths: true
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values:
      // config.LOG_DISABLE ||
      // config.LOG_ERROR ||
      // config.LOG_WARN ||
      // config.LOG_INFO ||
      // config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['CustomElectron'],
    // DEV: `useIframe: false` is for launching a new window instead of using an iframe
    //   In Electron, iframes don't get `nodeIntegration` priveleges yet windows do
    client: {
      // __filenameOverride: root()
      useIframe: false,
      // loadScriptsViaRequire: true,
    },

    customLaunchers: {
      CustomElectron: {
        base: 'Electron',
        flags: ['--show'],
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
