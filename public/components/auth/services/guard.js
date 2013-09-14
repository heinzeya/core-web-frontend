(function(){
  'use strict';

  angular.module('CoreAuth.Services')
    .factory('guard', ['$rootScope', '$state', 'authService',
      /**
       *
       * @param {angular.$rootScope} $rootScope
       * @param {$state} $state
       * @param {AuthService} authService
       * @returns {{watch: Function}}
       */
      function($rootScope, $state, authService){
        return {
          watch: function(){

            authService.onUncompletedProfile = function(user){
              $state.go("profile");
            };

            //TODO: maybe we need a user service for that
            if(window.USER && Object.keys(window.USER).length > 0){
              authService.authenticate(window.USER);
            }

            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
              if(toState.name === 'login') return;
              if(toState.loginRequired !== false && !authService.isAuthenticated()){
                // prevent transition to the current state
                event.preventDefault();
                //TODO: configurable state
                $state.go("signup");
              }
            });

            authService.onloggedout = function(){
              //TODO: configurable state
              $state.go("login");
            };

            authService.onauthenticated = function(user){
              $state.go("index");
            };
          }
        }
      }
    ]);
})();
