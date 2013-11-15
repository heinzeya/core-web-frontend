kabam.prepend([
  'ui.router',
  'ui.bootstrap',
  'ui.notify',
  'btford.socket-io',
  'restangular',
  'kabam.auth',
  'kabam.user',
  'kabam.group',
  'kabam.search',
  'kabam.states',
  'ChatXmpp'
]);

angular.module('kabam', kabam.modules)
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
