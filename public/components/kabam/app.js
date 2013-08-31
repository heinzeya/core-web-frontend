//=require jquery/jquery.js
//=require angular/angular.js
//=require angular-resource/angular-resource.js
//=require angular-cookies/angular-cookies.js
//=require angular-sanitize/angular-sanitize.js
//=require angular-ui-router/release/angular-ui-router.js
//=require auth/main.js
//=require_self
//=require kabam/controllers/index.js

'use strict';


var dependencies = ['ui.router', 'ui.state', 'CoreAuth.Services', 'CoreAuth.Controllers'];

angular.module('CoreFrontend', dependencies)
  .config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('index', {
          url: '/',
          templateUrl: '/assets/kabam/views/main.html',
          controller: 'IndexCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: '/assets/auth/views/login.html',
          controller: 'GenericLoginCtrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: '/assets/auth/views/signup.html',
          controller: 'GenericSignupCtrl',
          loginRequired: false
        });

      $urlRouterProvider.otherwise('/');
    }
  ])
  .run(['guard', '$rootScope', '$state', '$stateParams', function(guard, $rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    guard.watch();
  }]);
