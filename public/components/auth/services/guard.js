(function () {
  'use strict';

  angular.module('kabam.auth.services')
    .provider('guard',
      /**
       * @name guardProvider
       */
      function () {
        //TODO: test provider
        this.unauthorizedState = 'signup';
        this.incompleteProfileState = 'profile';
        this.defaultState = 'index';
        this.onLoggedOutState = 'login';
        this.$get = [
          '$rootScope', '$window', '$location', '$state', 'authService', 'sessionStorage', 'flash',
          /**
           * @param {angular.$rootScope} $rootScope
           * @param {angular.$window} $window
           * @param {angular.$location} $location
           * @param {$state} $state
           * @param {authService} authService
           * @param {sessionStorage} sessionStorage
           * @param {flash} flash
           * @returns {{watch: Function}}
           */
            function ($rootScope, $window, $location,  $state, authService, sessionStorage, flash) {
            var _this = this;
            return {
              /**
               * @name guard.watch
               * @description Listens for stage change events and prevents from navigating to private states
               */
              watch: function () {
                var
                  redirect = sessionStorage.getItem('redirect'),
                  offStateChangeSuccess;

                if(redirect) {
                  sessionStorage.removeItem('redirect');
                  if(flash.get('success')){
                    $location.path(redirect.success);
                  } else {
                    $location.path(redirect.failure);
                  }
                }

                // if we have flashed messaged we should empty them after loading the state, so that we don't  have
                // flashed messages for the next location
                if(flash.keys().length){
                  offStateChangeSuccess = $rootScope.$on("$stateChangeSuccess", function(){
                    flash.clear();
                    offStateChangeSuccess()
                  });
                }

                authService.onUncompletedProfile = function (user) {
                  $state.go(_this.incompleteProfileState);
                };

                //TODO: maybe we need a user service for that
                if ($window.USER && Object.keys($window.USER).length > 0) {
                  authService.authenticate($window.USER);
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

