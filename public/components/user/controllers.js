(function(){
"use strict";

var userControllers = angular.module('kabam.user.controllers');

userControllers.controller(
  'UserMainCtrl',
  [
    '$scope', '$state', '$log', 'users',
    function($scope, $state, $log, users) {
      $scope.users = users;

      $scope.$on('update', function(event, data) {
        var idx = _.findIndex($scope.users, { _id: data.User._id });

        if (idx >= 0) {
          // replacing the whole array is a workaround to force ng-grid updates its view
          // see https://github.com/angular-ui/ng-grid/pull/651
          var usersCopy = angular.copy($scope.users);
          usersCopy.splice(idx, 1, data.User);
          $scope.users = usersCopy;
          // $log.log('Final users:', $scope.users);
        }
      });

      $scope.$on('create', function(event, data) {
        $scope.users.push(data.User);
      });

      $scope.$on('delete', function(event, data) {
        var idx = _.findIndex($scope.users, { _id: data.id });
        if (idx >= 0) {
          $scope.users.splice(idx, 1);
        }
      });

      $scope.$emit('backend', { action: 'subscribe', channel: 'User' });
    }
  ]);

userControllers.controller(
  'UserListCtrl',
  [
    '$rootScope', '$scope', '$log', '$state', 'authService', 'notificationService',
    function($rootScope, $scope, $log, $state, authService, notificationService) {

      $scope.selectedItems = [];
      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/user/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/user/edit/{{row.getProperty(col.field)}}">Edit</a> | ' +
            '<a ng-click="poke(row.getProperty(col.field))">Poke</a>' +
            '</div>';
      $scope.gridOptions = {
        data: 'users',
        enableRowSelection: true,
        selectedItems: $scope.selectedItems,
        columnDefs: [
          { field: 'username' },
          { field: 'email' },
          { field: 'roles' },
          { field: 'group' },
          { field: 'isOnline' },
          { field: 'lastSeenOnline' },
          { field: '_id',
            displayName: 'Action',
            enableEditCell: false,
            cellTemplate: linkCellTemplate }
        ]
      };

      $scope.add = function() {
        $state.go('user.new');
      };

      $scope.poke = function(id) {
        $log.log('poke:', id);
        var to = _.find($scope.users, { _id: id });
        if (to) {
          $scope.$emit('backend', { action: 'notify:sio',
                                    message: authService.user.email + ' poke you',
                                    user: to,
                                    type: 'info'
                                  });
          if (to.isOnline) {
            notificationService.success('You poke ' + to.username);
          } else {
            notificationService.error('You poke ' + to.username + ' but the user is not online');
          }
        }
      };

    }
  ]
);

userControllers.controller(
  'UserViewCtrl',
  [
    '$scope', '$state', 'user',
    function($scope, $state, user) {
      $scope.user = user;

      $scope.edit = function() {
        $state.go('user.edit', { id: $scope.user._id });
      };

      $scope.$emit('backend', { action: 'subscribe', channel: 'User:' + $scope.user._id.toString() });

      $scope.$on('update', function(event, data) {
        $scope.user = data.User;
      });

    }
  ]
);

userControllers.controller(
  'UserEditCtrl',
  [
    '$window', '$rootScope', '$scope', '$state', '$log', 'Restangular', 'notificationService', 'UserService', 'user', 'authService',
    function($window, $rootScope, $scope, $state, $log, Restangular, notificationService, UserService, user, authService) {

      $log.log('user', user);
      if (!user) {
        $scope.newUser = true;
        $scope.user = {
        };
      } else {
        $scope.newUser = false;
        $scope.user = Restangular.copy(user);
      }

      $scope.save = function() {
        // if ($scope.user.schoolId === '') {
        //   $scope.user.schoolId = null;
        // }
        // if ($scope.user.courseId === '') {
        //   $scope.user.courseId = null;
        // }
        $log.log('user', $scope.user);
        if ($scope.newUser) {
          UserService.postUser($scope.user).then(function() {
            $state.go('user.list');
            // $rootScope.$broadcast('userDataChange', $scope.user);
          });
        } else {
          $scope.user.put().then(function() {
            $state.go('user.list');
            // $rootScope.$broadcast('userDataChange', $scope.user);
          });
        }
      };

      $scope.remove = function() {
        var originalUser;

        $log.log('Delete button clicked');
        notificationService.error('This feature is not implemented yet');
        if ($scope.user.originalElement) {
          originalUser = $scope.user.originalElement;
        } else {
          originalUser = $scope.user;
        }

        $scope.$emit('backend', { action: 'broadcast', message: 'delete user attempted', user: originalUser });
        $scope.$emit('backend', { action: 'notify:sio',
                                  message: authService.user.email + ' tries to delete you',
                                  user: originalUser,
                                  type: 'notice'
                                });
      };

      $scope.tierOptions = {
        width: 'element',
        'minimumResultsForSearch': -1
      };

      $scope.schoolOptions = {
        width: 'element'
      };

      $scope.courseOptions = {
        width: 'element'
      };

      if (!$scope.newUser) {
        $scope.$emit('backend', { action: 'subscribe', channel: 'User:' + $scope.user._id.toString() });

        $scope.$on('update', function(event, data) {
          $scope.user = data.User;
        });
      }

    }
  ]
);

userControllers.controller(
  'UserAdminCtrl',
  [
    '$rootScope', '$scope', '$state', 'user',
    function($rootScope, $scope, $state, user) {

      $scope.user = user;

      $scope.admins = [
        { name: 'AAA', action: '0' },
        { name: 'BBB', action: '1' },
        { name: 'CCC', action: '2' }
      ];

      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/user/admin/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/user/admin/remove/{{row.getProperty(col.field)}}">Remove</a>' +
            '</div>';

      $scope.gridOptions = {
        data: 'admins',
        enableRowSelection: true,
        selectedItems: $scope.selectedItems,
        columnDefs: [
          { field: 'name' },
          { field: 'action',
            enableEditCell: false,
            cellTemplate: linkCellTemplate }
        ]
      };

      $scope.$on('update', function(event, data) {
        $scope.user = data.User;
      });

    }
  ]
);

userControllers.controller(
  'UserMemberCtrl',
  [
    '$rootScope', '$scope', '$state', 'user',
    function($rootScope, $scope, $state, user) {

      $scope.user = user;

      $scope.members = [
        { name: 'AAA', action: '0' },
        { name: 'BBB', action: '1' },
        { name: 'CCC', action: '2' }
      ];

      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/user/member/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/user/member/remove/{{row.getProperty(col.field)}}">Remove</a>' +
            '</div>';

      $scope.gridOptions = {
        data: 'members',
        enableRowSelection: true,
        selectedItems: $scope.selectedItems,
        columnDefs: [
          { field: 'name' },
          { field: 'action',
            enableEditCell: false,
            cellTemplate: linkCellTemplate }
        ]
      };

      $scope.$on('update', function(event, data) {
        $scope.user = data.User;
      });

    }
  ]
);

})();
