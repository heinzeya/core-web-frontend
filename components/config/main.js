(function(){
  'use strict';
  /**
   * Application config.
   * The purpose of this module is to store all app-level configuration,
   * for instance REST endpoints. We assume that application will embed
   * this configuration as a script in the html page that loads the application
   * assigning JSON object to the `window.CONFIG` property, which we read
   * and assign it to the CONFIG constant.
   */
  angular.module('CoreFrontend.Config', []).constant('CONFIG', window.CONFIG);
})();