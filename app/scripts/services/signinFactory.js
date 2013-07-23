'use strict';

angular.module('mwcCoreWebFrontendApp')
  .factory('signinFactory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
