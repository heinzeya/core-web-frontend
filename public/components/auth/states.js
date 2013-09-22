angular.module('kabam.auth.states')
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
        },
        {
          name: 'passwordRecovery',
          url: '/recover-password',
          templateUrl: '/assets/auth/views/recovery.html',
          controller: 'GenericPasswordRecoveryCtrl',
          loginRequired: false
        },
        {
          name: 'profile',
          url: "/profile",
          templateUrl: '/assets/auth/views/profile.html',
          controller: 'GenericProfileCtrl'
        }
      ])
    }
  ]);