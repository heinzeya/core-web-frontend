'use strict';

angular.module('mwcCoreWebFrontendApp')
  .controller('MenusCtrl', function ($scope, menuFactory) {
    $scope.menus = menuFactory.getMenus();
  });
