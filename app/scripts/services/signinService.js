'use strict';

angular.module('mwcCoreWebFrontendApp')
  .factory('signinService', function() {
    var session = {
      isLogged: false,
      username: ''
    };
    
    return {
      session: session
    };
  });