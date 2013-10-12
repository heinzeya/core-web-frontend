angular.module('kabam.user.states').config([
  'kabamStatesProvider', 'RestangularProvider',
  function(kabamStatesProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/rest');
    kabamStatesProvider
      .push([
        {
          name: 'user',
          url: '/user',
          templateUrl: '/assets/user/views/index.html',
          controller: 'UserMainCtrl',
          resolve: {
            users: function(UserService) {
              return UserService.getUsers();
            }
          }
        },
        {
          name: 'user.list',
          url: '/list',
          templateUrl: '/assets/user/views/list.html',
          controller: 'UserListCtrl'
        },
        {
          name: 'user.view',
          url: '/view/:id',
          templateUrl: '/assets/user/views/view.html',
          controller: 'UserViewCtrl',
          resolve: {
            user: function(UserService, $stateParams) {
              return UserService.getUser($stateParams.id);
            }
          }
        },
        {
          name: 'user.new',
          url: '/new',
          templateUrl: '/assets/user/views/edit.html',
          controller: 'UserEditCtrl',
          resolve: {
            'user': function() {
              return null;
            }
          }
        },
        {
          name: 'user.edit',
          url: '/edit/:id',
          templateUrl: '/assets/user/views/edit.html',
          controller: 'UserEditCtrl',
          resolve: {
            user: function(UserService, $stateParams) {
              return UserService.getUser($stateParams.id);
            }
          }
        }

      ]);
  }
]);
