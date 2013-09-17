angular.module('CoreAuth.States')
  .config([
    'kabamStatesProvider',
    function(kabamStatesProvider){
      // default auth states
      var states = [
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
      ];
      angular.forEach(states, function(state){
        kabamStatesProvider.push(state)
      })
    }
  ]);