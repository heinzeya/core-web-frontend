(function(){
  'use strict';

  angular.module('CoreAuth.Services')
    .factory('guard', ['$rootScope', '$location', 'authService',
      /**
       *
       * @param {angular.$rootScope} $rootScope
       * @param {angular.$location} $location
       * @param {AuthService} authService
       * @returns {{watch: Function}}
       */
      function($rootScope, $location, authService){
        return {
          watch: function(){

            authService.onUncompletedProfile = function(user){
              //TODO: configurable profile edit path
              $location.url('/profile')
            };

            //TODO: maybe we need a user service for that
            if(window.USER && Object.keys(window.USER).length > 0){
              authService.authenticate(window.USER);
            }

            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
              if(toState.loginRequired !== false && !authService.isAuthenticated()){
                //TODO: configurable login path
                $location.url("/login");
              }
            });

            authService.onloggedout = function(){
              //TODO: configurable login path
              $location.url("/login");
            };

            authService.onauthenticated = function(user){
              $location.url('/');
            };
          }
        }
      }
    ]);
})();