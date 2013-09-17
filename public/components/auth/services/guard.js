(function () {
  'use strict';

  angular.module('CoreAuth.Services')
    .provider('guard',
      /**
       * @name guardProvider
       */
      function () {
        //TODO: test provider
        this.unauthorizedState = 'login';
        this.uncomplitedProfileState = 'profile';
        this.defaultState = 'index';
        this.onLoggedOutState = 'login';
        this.$get = [
          '$rootScope', '$state', 'authService',
          /**
           * @param {angular.$rootScope} $rootScope
           * @param {$state} $state
           * @param {authService} authService
           * @returns {{watch: Function}}
           */
            function ($rootScope, $state, authService) {
            var _this = this;
            return {
              /**
               * @name guard.watch
               * @description Listens for stage change events and prevents from navigating to private states
               */
              watch: function () {
                authService.onUncompletedProfile = function (user) {
                  $state.go(_this.uncomplitedProfileState);
                };

                //TODO: maybe we need a user service for that
                if (window.USER && Object.keys(window.USER).length > 0) {
                  authService.authenticate(window.USER);
                }

                $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                  if (toState.name === _this.unauthorizedState) return;
                  if (toState.loginRequired !== false && !authService.isAuthenticated()) {
                    // prevent transition to the current state
                    event.preventDefault();
                    //TODO: configurable state
                    $state.go(_this.unauthorizedState);
                  }
                });

                authService.onloggedout = function () {
                  //TODO: configurable state
                  $state.go(_this.onLoggedOutState);
                };

                authService.onauthenticated = function (user) {
                  $state.go(_this.defaultState);
                };
              }
            }
          }
        ]
      }
    );
})();