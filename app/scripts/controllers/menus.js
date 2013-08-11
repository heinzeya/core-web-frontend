'use strict';

angular.module('mwcCoreWebFrontendApp')
  .controller('MenusCtrl', function($scope, $http) {
    $http.get('/menus.json')
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