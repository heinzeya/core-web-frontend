(function(){
"use strict";

var userControllers = angular.module('kabam.user.controllers');

userControllers.controller(
  'UserMainCtrl',
  [
    '$scope', '$state', 'users',
    function($scope, $state, users) {
      $scope.users = users;
      $scope.world = users[0];
    }
  ]);

userControllers.controller(
  'UserListCtrl',
  [
    '$rootScope', '$scope', '$state',
    function($rootScope, $scope, $state) {

      $scope.selectedItems = [];
      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/user/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/user/edit/{{row.getProperty(col.field)}}">Edit</a>' +
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

      $rootScope.$on('userDataChange', function(event, updatedUser) {
        var idx = _.findIndex($scope.users, { _id: updatedUser._id });
        if (idx >= 0) {
          $scope.users[idx] = updatedUser;
        } else {
          $scope.users.push(updatedUser);
        }
      });
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

    }
  ]
);

userControllers.controller(
  'UserEditCtrl',
  [
    '$window', '$rootScope', '$scope', '$state', '$log', 'Restangular', 'notificationService', 'UserService', 'user',
    function($window, $rootScope, $scope, $state, $log, Restangular, notificationService, UserService, user) {

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
            $rootScope.$broadcast('userDataChange', $scope.user);
          });
        } else {
          $scope.user.put().then(function() {
            $state.go('user.list');
            $rootScope.$broadcast('userDataChange', $scope.user);
          });
        }
      };

      $scope.remove = function() {
        $log.log('Delete button clicked');
        notificationService.notice('Success');
        // notificationService.notify({ title: 'Warning', text: 'This feature is not implemented yet' });
        // $notification.warning('Remove User', 'This feature is not implemented yet');
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

    }
  ]
);

})();
