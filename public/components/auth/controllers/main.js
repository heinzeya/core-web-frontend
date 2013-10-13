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
    .controller('GenericPasswordResetCtrl', [
      '$scope', '$state', '$stateParams', '$timeout', 'authService',
      function($scope, $state, $stateParams, $timeout, authService) {
        console.log('$stateParams', $stateParams);
        $scope.password1 = '';
        $scope.password2 = '';

        $scope.message = null;
        $scope.disableButton = true;

        if (!$stateParams.key) {
          $scope.error = 'Key Not Found: you\'re not authorize to access this page';
          $scope.disable = true;
        } else {
          $scope.error = null;
          $scope.disable = false;
        }

        $scope.reset = function() {
          authService.reset($stateParams.key, $scope.password1)
            .error(function(data) {
              $scope.error = data.error || 'Password reset failed. Invalid key';
            })
            .success(function(data, status, headers, config) {
              console.log('data', data);
              if (data.message) {
                $scope.message = data.message;
                $scope.error = null;
                $timeout(function() {
                  $state.go('login');
                }, 1000);
              } else {
                $scope.message = null;
                $scope.error = data.error || 'Password reset failed. Invalid key';
              }
            });
        };

        $scope.checkPassword = function() {
          if ($scope.password1.length === 0 || $scope.password2.length === 0) {
            $scope.disableButton = true;
            $scope.message = null;
            $scope.error = null;
            return;
          }
          if ($scope.password1.length < 8) {
            $scope.message = null;
            $scope.error = 'Passwords must be more than 7 characters';
            $scope.disableButton = true;
            return;
          }
          if ($scope.password1 === $scope.password2) {
            $scope.message = 'Passwords are matched';
            $scope.error = null;
            $scope.disableButton = false;
            return;
          } else {
            $scope.message = null;
            $scope.error = 'Passwords aren\'t matched';
            $scope.disableButton = true;
            return;
          }
        };

        $scope.$watch('password1 + password2', $scope.checkPassword);

      }
    ])
    .controller('GenericProfileCtrl', [
      '$scope', '$state', 'authService',
      function($scope, $state, authService){
        // We don't want to keep changes in the model if user changed some fields in profile edit, but not yet saved it.
        $scope.user = angular.copy(authService.user);

        $scope.save = function(){
          authService.save($scope.user)
            .then(function(){
              $state.go('profile');
            }, function(result){
              // clear previous errors
              $scope.errors = null;
              // http response
              if(result.status) {
                $scope.errors = result.data.errors;
              // password confirmation errors
              } else {
                $scope.errors = result.errors;
              }
              console.log('error', arguments);
            })
        };
      }
    ])
})();
