window.moduleDependencies || (window.moduleDependencies = []);

window.moduleDependencies.push('kabam.admin');

angular.module('kabam.admin', [])
  .controller('AdminPanelCtrl', [
    '$scope',
    function($scope){
      $scope.name = "ADMIN PANEL";
    }
  ])
  .controller('MasqueradeCtrl', [
    '$scope', '$window', 'authService',
    function($scope, $window, authService){
      $scope.authService = authService;
      $scope.isMasquerading = $window.ADMIN._id !== $window.USER._id;
      $scope.masquerade = function(usernameOrEmail){
        $window.location.href = '/admin/masquerade/'+ usernameOrEmail
      };
      $scope.unmasquerade = function(){
        $window.location.href = '/admin/masquerade'
      }
    }
  ]);