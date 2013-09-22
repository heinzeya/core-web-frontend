(function(){
  'use strict';
  angular.module('kabam.auth.controllers')
    .controller('GenericLoginCtrl', ['$scope', 'authService', function($scope, authService){
      $scope.username = null;
      $scope.password = null;
      $scope.errors = {
        username: [],
        password: [],
        form: []
      };
      $scope.login = function(){
        authService.logIn($scope.username, $scope.password).error(function(data, status, headers, config){
          $scope.errors = data.errors;
        });
      };
    }])
    .controller('GenericSignupCtrl', ['$scope', 'authService', function($scope, authService){
      $scope.message = null;
      $scope.username = null;
      $scope.email = null;
      $scope.password = null;
      $scope.errors = {
        username: [],
        email: [],
        password: [],
        form: []
      };
      $scope.signup = function(){
        authService.signUp($scope.username, $scope.email, $scope.password)
          .success(function(data, status, headers, config){
            $scope.message = 'Successfully signed up. Check your email for confirmation';
          })
          .error(function(data, status, headers, config){
            $scope.errors = data.errors;
          });
      };
    }])
    .controller('GenericPasswordRecoveryCtrl', [
      '$scope', 'authService',
      function($scope, authService){
        $scope.usernameOrEmail = null;
        $scope.error = null;
        $scope.message = null;
        $scope.recover = function(){
          authService.recover($scope.usernameOrEmail)
            .error(function(data){
              $scope.error = data.error || 'Cannot find a user with such username or email';
            })
            .success(function(data, status, headers, config){
              $scope.message = 'Check your email for further instructions';
            });
        };
      }
    ])
    .controller('GenericProfileCtrl', [
      '$scope', 'authService',
      function($scope, authService){
        // We don't want to keep changes in the model if user changed some fields in profile edit, but not yet saved it.
        $scope.user = angular.copy(authService.user);
        $scope.save = function(){
          authService.save($scope.user)
            .success(function(data, status, headers, config){})
            .error(function(data, status, headers, config){})
        };
      }
    ])
})();
