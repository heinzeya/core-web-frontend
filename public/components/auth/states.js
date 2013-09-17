angular.module('CoreAuth.States')
  .config([
    'kabamStatesProvider',
    function(kabamStatesProvider){
      // default auth states
      kabamStatesProvider.push([
        {
          name: 'index',
          url: '/',
          templateUrl: '/assets/kabam/views/main.html',
          controller: 'IndexCtrl'
        },
        {
          name: 'login',
          url: '/login',
          templateUrl: '/assets/auth/views/login.html',
          controller: 'GenericLoginCtrl',
          loginRequired: false
        },
        {
          name: 'signup',
          url: '/signup',
          templateUrl: '/assets/auth/views/signup.html',
          controller: 'GenericSignupCtrl',
          loginRequired: false
        }
      ])
    }
  ]);