//=require jquery/jquery.js
//=require angular/angular.js
//=require angular-resource/angular-resource.js
//=require angular-cookies/angular-cookies.js
//=require angular-sanitize/angular-sanitize.js
// require angular-ui-router/release/angular-ui-router.js
//=require ui-router/angular-ui-router.js
//=require ui-router/stateDirectives.js
//=require states/states.js
//=require auth/main.js
//=require_self
//=require kabam/controllers/index.js

'use strict';

var dependencies = ['ui.router', 'CoreAuth.Services', 'CoreAuth.Controllers', 'CoreAuth.States', 'kabam.states'];
if (window.moduleDependencies && Array.isArray(window.moduleDependencies)) {
  dependencies = dependencies.concat(window.moduleDependencies);
}

angular.module('CoreFrontend', dependencies)
  .config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', 'kabamStatesProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, kabamStatesProvider) {

      kabamStatesProvider.push({
        name: 'profile',
        url: "/profile",
        templateUrl: '/assets/kabam/views/profile.html'
      });

      // add all states that were registered in other modules
      for(var s in kabamStatesProvider.states){
        $stateProvider.state(kabamStatesProvider.states[s]);
      }

      $urlRouterProvider.otherwise('/');
//      $locationProvider.html5Mode(true)
    }
  ])
  .run([
    'guard', 'authService', '$rootScope', '$state', '$stateParams',
    function(guard, authService, $rootScope, $state, $stateParams){
      $rootScope.authService = authService;
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      guard.watch();
    }
  ]);
