'use strict';

angular.module('mwcCoreWebFrontendApp')
  .factory('menuFactory', function() {

    var view = '../views/menus.html'

    var menus = {
      "home": {
        "title": "Home",
        "uri": "/"
      },
      "about": {
       "title" : "About Us",
       "uri": "/about"
      },
      "signin": {
       "title" : "Sign In",
       "uri": "/signin"
      }
    };

    // Public API here
    return {
      getMenus: function() {
        return menus;
      }
    };
  });