'use strict';

angular.module('mwcCoreWebFrontendApp')
  .factory('menuFactory', function($http) {

    // load menus from local JSON file
    var menus = $http.get('/menus.json');

    // Public API here
    return {
      getMenus: function() {
        return menus;
      }
    };
  });