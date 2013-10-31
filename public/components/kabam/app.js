//= require jquery/jquery.js
//= require jquery-ui/ui/jquery-ui.js
//= require lodash/dist/lodash.js
//= require momentjs/moment.js
//= require vendor/bootstrap.js
//= require select2/select2.js
//= require pines-notify/jquery.pnotify.js

//= require angular/angular.js
//= require angular-resource/angular-resource.js
//= require angular-cookies/angular-cookies.js
//= require angular-sanitize/angular-sanitize.js
//= require angular-socket-io/socket.js
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
//= require ./admin.js

//= require_self

//= require kabam/controllers/index.js

'use strict';

var dependencies = [
  'ui.router',
  'ui.bootstrap',
  'ui.notify',
  'btford.socket-io',
  'restangular',
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
    '$stateProvider', '$urlRouterProvider', '$locationProvider', 'RestangularProvider', 'kabamStatesProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider, kabamStatesProvider) {
      // add all states that were registered in other modules
      for(var s in kabamStatesProvider.states){
        $stateProvider.state(kabamStatesProvider.states[s]);
      }

      $urlRouterProvider.otherwise('/');
      // $locationProvider.html5Mode(true)

      // setup Restangular
      RestangularProvider.setBaseUrl('/api/rest');
      RestangularProvider.setResponseExtractor(function(response) {
        var newResponse = response;
        if (angular.isArray(response)) {
          angular.forEach(newResponse, function(value, key) {
            newResponse[key].originalElement = angular.copy(value);
          });
        } else {
          newResponse.originalElement = angular.copy(response);
        }

        return newResponse;
      });
      RestangularProvider.setRestangularFields({
        id: '_id'
      });
    }
  ])
  .run([
    'guard', 'authService', '$rootScope', '$state', '$stateParams', '$log', 'socket', 'notificationService',
    function(guard, authService, $rootScope, $state, $stateParams, $log, socket, notificationService) {
      $rootScope.authService = authService;
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      guard.watch();

      socket.on('broadcast', function(data) {
        $log.log('broadcast', data);
        $rootScope.$broadcast('broadcast', data);
      });

      socket.on('notify', function(data) {
        $log.log('notify', data);
        if (data.type && _.contains([ 'info', 'error', 'notice', 'success' ], data.type)) {
          notificationService.notify({
            type: data.type,
            text: data.message
          });
        } else {
          $rootScope.$broadcast('notify', data);
        }
      });

      $rootScope.$on('backend', function(event, args) {
        if (args.action) {
          args.sender = authService.user;
          socket.emit('backend', args);
          $log.log('event sent to backend:', args);
        } else {
          $log.error('invalid backend event: no action:', args);
        }
      });

      socket.on('update', function(data) {
        $rootScope.$broadcast('update', data);
      });

      socket.on('delete', function(data) {
        $rootScope.$broadcast('delete', data);
      });

      socket.on('create', function(data) {
        $rootScope.$broadcast('create', data);
      });

    }
  ]);
