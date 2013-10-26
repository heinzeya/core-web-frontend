// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'public/bower_components/jquery/jquery.js',
      'public/bower_components/jquery-ui/ui/jquery-ui.js',
      'public/bower_components/lodash/dist/lodash.js',
      'public/bower_components/select2/select2.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-resource/angular-resource.js',
      'public/bower_components/angular-cookies/angular-cookies.js',
      'public/bower_components/angular-sanitize/angular-sanitize.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'public/bower_components/angular-ui-utils/modules/utils.js',
      'public/bower_components/angular-ui-select2/src/select2.js',
      'public/bower_components/angular-grid/ng-grid-2.0.7.debug.js',
      'public/bower_components/fullcalendar/fullcalendar.js',
      'public/bower_components/angular-ui-calendar/src/calendar.js',
      'public/bower_components/restangular/dist/restangular.js',
//      'test/mock/**/*.js',
//      'test/spec/**/*.js',

      // Config component
      'public/components/config/main.js',

      // Auth component
      'public/components/auth/main.js',
      'public/components/auth/services/*.js',
      'public/components/auth/test/spec/services/*.js',

      // flash component
      'public/components/flash/main.js',

      // sessionStorage component
      'public/components/storage/sessionStorage.js',
      'public/components/storage/test/spec/*.js'

    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 5000,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
