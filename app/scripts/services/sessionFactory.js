'use strict';

angular.module('mwcCoreWebFrontendApp')
  .factory('sessionFactory', function() {

    var sessionFactory = {};

    var loggedIn = true;

    sessionFactory.signin = function() {
      return loggedIn;
    };

    sessionFactory.isSignedIn = function() {
      return loggedIn;
    };

    return sessionFactory;
  });