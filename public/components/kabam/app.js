//=require jquery/jquery.js
//=require angular/angular.js
//=require angular-resource/angular-resource.js
//=require angular-cookies/angular-cookies.js
//=require angular-sanitize/angular-sanitize.js
//=require auth/main.js

'use strict';

angular.module('CoreFrontend', ['CoreAuth.Services', 'CoreAuth.Controllers'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/assets/kabam/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: '/assets/auth/views/login.html',
        controller: 'GenericLoginCtrl'
      })
      .when('/signup', {
        templateUrl: '/assets/auth/views/signup.html',
        controller: 'GenericSignupCtrl',
        loginRequired: false
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['guard', function(guard){
    guard.watch();
  }]);
