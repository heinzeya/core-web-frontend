'use strict';

angular.module('mwcCoreWebFrontendApp')
  .controller('MenusCtrl', function($scope, menuFactory) {
    menuFactory.getMenus()
      .success(function(data) {
        $scope.menus = data;
      })
      .error(function() {
        $scope.menus = {
          error: {
            uri: '',
            title: 'Could not load the menus, please try again later'
          }
        };
      });
  });