//=require ../bower_components/jquery/jquery.js
//=require ../bower_components/angular/angular.js
//=require ../bower_components/angular-resource/angular-resource.js
//=require ../bower_components/angular-cookies/angular-cookies.js
//=require ../bower_components/angular-sanitize/angular-sanitize.js
//=require ../components/auth/main.js

'use strict';

angular.module('CoreFrontend', ['CoreAuth.Services', 'CoreAuth.Controllers'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'components/auth/views/login.html',
        controller: 'GenericLoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'components/auth/views/signup.html',
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
