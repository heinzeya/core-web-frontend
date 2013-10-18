//= require jquery/jquery.js
//= require jquery-ui/ui/jquery-ui.js
//= require lodash/dist/lodash.js
//= require vendor/bootstrap.js
//= require select2/select2.js
//= require pines-notify/jquery.pnotify.js

//= require angular/angular.js
//= require angular-resource/angular-resource.js
//= require angular-cookies/angular-cookies.js
//= require angular-sanitize/angular-sanitize.js
//= require angular-ui-router/release/angular-ui-router.js
//= require angular-bootstrap/ui-bootstrap-tpls.js
//= require angular-ui-utils/modules/utils.js
//= require angular-ui-select2/src/select2.js
//= require angular-grid/ng-grid-2.0.7.debug.js
//= require fullcalendar/fullcalendar.js
//= require angular-ui-calendar/src/calendar.js
//= require restangular/dist/restangular.js
//= require angular-pines-notify/src/pnotify.js

//= require states/states.js
//= require auth/main.js
//= require user/main.js
//= require group/main.js
//= require search/main.js

//= require_self

//= require kabam/controllers/index.js

'use strict';

var dependencies = [
  'ui.router',
  'ui.bootstrap',
  'kabam.auth',
  'kabam.user',
  'kabam.group',
  'kabam.search',
  'kabam.states'
];

if (window.moduleDependencies && Array.isArray(window.moduleDependencies)) {
  dependencies = dependencies.concat(window.moduleDependencies);
}

angular.module('kabam', dependencies)
  .config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', 'kabamStatesProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, kabamStatesProvider) {
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
