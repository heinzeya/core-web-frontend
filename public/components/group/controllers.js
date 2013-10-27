(function(){
  "use strict";

var groupControllers = angular.module('kabam.group.controllers');

groupControllers.controller(
  'GroupMainCtrl',
  [
    '$scope', '$state', 'groups',
    function($scope, $state, groups) {
      $scope.groups = groups;
      $scope.world = groups[0];

      $scope.$on('update', function(event, data) {
        var idx = _.findIndex($scope.groups, { _id: data.Group._id });

        if (idx >= 0) {
          // replacing the whole array is a workaround to force ng-grid updates its view
          // see https://github.com/angular-ui/ng-grid/pull/651
          var groupsCopy = angular.copy($scope.groups);
          groupsCopy.splice(idx, 1, data.Group);
          $scope.groups = groupsCopy;
        }
      });

      $scope.$on('create', function(event, data) {
        $scope.groups.push(data.Group);
      });

      $scope.$on('delete', function(event, data) {
        var idx = _.findIndex($scope.groups, { _id: data.id });
        if (idx >= 0) {
          $scope.groups.splice(idx, 1);
        }
      });

      $scope.$emit('backend', { action: 'subscribe', channel: 'Group' });
    }
  ]);

groupControllers.controller(
  'GroupListCtrl',
  [
    '$rootScope', '$scope', '$state',
    function($rootScope, $scope, $state) {

      $scope.selectedItems = [];
      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/group/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/group/edit/{{row.getProperty(col.field)}}">Edit</a>' +
            '</div>';
      $scope.gridOptions = {
        data: 'groups',
        enableRowSelection: true,
        selectedItems: $scope.selectedItems,
        columnDefs: [
          { field: 'name' },
          { field: 'uri' },
          { field: 'tier' },
          { field: 'schoolId' },
          { field: 'courseId' },
          { field: '_id',
            displayName: 'Action',
            enableEditCell: false,
            cellTemplate: linkCellTemplate }
        ]
      };

      $scope.add = function() {
        $state.go('group.new');
      };

    }
  ]
);

groupControllers.controller(
  'GroupViewCtrl',
  [
    '$scope', '$state', 'group', '$log',
    function($scope, $state, group ,$log) {
      $scope.group = group;
      $scope.isDisabled = false;
      if(group.tier == 3){
        $log.log('disableing for tier3');
        $scope.isDisabled = true;
      }


      $scope.edit = function() {
        $state.go('group.edit', { id: $scope.group._id });
      };

      $scope.addSubGroup = function() {
        $state.go('group.subgroup', { id: $scope.group._id });
      };

      $scope.admin = function() {
        $state.go('group.admin', { id: $scope.group._id });
      };

      $scope.member = function() {
        $state.go('group.member', { id: $scope.group._id });
      };

      $scope.$emit('backend', { action: 'subscribe', channel: 'Group:' + $scope.group._id.toString() });

      $scope.$on('update', function(event, data) {
        $scope.group = data.Group;
      });

    }
  ]
);

groupControllers.controller(
  'GroupEditCtrl',
  [
    '$rootScope', '$scope', '$state', 'Restangular', 'group','$log',
    function($rootScope, $scope, $state, Restangular, group, $log) {
      if (group) {
        $scope.newGroup = false;
        $scope.group = Restangular.copy(group);
      } else {
        $scope.newGroup = true;
        $scope.group = {
          'tier': 0,
          'schoolId': null,
          'courseId': null,
          'isHidden': false,
          'isOpenToParent': true,
          'isOpenToAll': true
        };
      }
      $log.log(group);

      $scope.save = function() {
        // if ($scope.group.schoolId === '') {
        //   $scope.group.schoolId = null;
        // }
        // if ($scope.group.courseId === '') {
        //   $scope.group.courseId = null;
        // }
        if ($scope.newGroup) {
          $scope.postGroup($scope.group).then(function(group) {
            $state.go('group.list');
            $rootScope.$broadcast('groupDataChange', $scope.group);
          });
        } else {
          $scope.group.put().then(function(group) {
            $state.go('group.list');
            $rootScope.$broadcast('groupDataChange', $scope.group);
          });
        }
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

      $scope.$emit('backend', { action: 'subscribe', channel: 'Group:' + $scope.group._id.toString() });

      $scope.$on('update', function(event, data) {
        $scope.group = data.Group;
      });

    }
  ]
);

groupControllers.controller(
  'GroupAdminCtrl',
  [
    '$rootScope', '$scope', '$state', 'group',
    function($rootScope, $scope, $state, group) {

      $scope.group = group;

      $scope.admins = [
        { name: 'AAA', action: 'a' },
        { name: 'BBB', action: 'b' },
        { name: 'CCC', action: 'c' }
      ];

      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/group/admin/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/group/admin/remove/{{row.getProperty(col.field)}}">Remove</a>' +
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

groupControllers.controller(
  'GroupMemberCtrl',
  [
    '$rootScope', '$scope', '$log', '$state', 'group', 'UserSearch',
    function($rootScope, $scope, $log, $state, group, UserSearch) {

      $scope.group = group;

      $scope.members = [
        { name: 'AAA', action: 'a' },
        { name: 'BBB', action: 'b' },
        { name: 'CCC', action: 'c' }
      ];

      var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
            '<a href="#/group/member/view/{{row.getProperty(col.field)}}">View</a> | ' +
            '<a href="#/group/member/remove/{{row.getProperty(col.field)}}">Remove</a>' +
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

      $scope.users = UserSearch('user');

      $scope.$watch('member', function(newVal, oldVal, scope) {
        if ($scope.member && !_.find($scope.members, {action: $scope.member})) {
          $scope.users.then(function(users) {
            var newMember = _.find(users, { '_id': $scope.member.toString() });
            $scope.members.push({ name: newMember.username, action: newMember._id });
          });
        }
      });

    }
  ]
);

groupControllers.controller(
  'SubgroupCtrl',
  [
    '$rootScope', '$scope', '$state', 'group', 'GroupService', 'school', 'course', '$log',
    function($rootScope, $scope, $state, group, GroupService, school, course, $log) {

      var newgroup = {
        'tier': 0,
        'schoolId': null,
        'courseId': null,
        'isHidden': false,
        'isOpenToParent': true,
        'isOpenToAll': true
      };

      $scope.group = newgroup;

      if(school)
        $scope.schoolname = school.name;
      if(course)
        $scope.coursename = course.name;

      if(group.tier == 0){
        $scope.grouptype = 'School / Organization';
        $scope.group.tier = 1;
        $log.log('constructing school');
        $scope.types = [
          { name: '1 - School / Organization',id:1 }
        ];
      }
      else if(group.tier == 1){
        $scope.grouptype = 'Course';
        $scope.group.tier = 2;
        $log.log('constructing course');
        $scope.schoolname = group.name;
        $scope.types = [
          { name: '2 - Course',id:2 }
        ];
      }
      else if(group.tier == 2){
        $scope.grouptype = 'group';
        $scope.group.tier = 3;
        $log.log('constructing group');
        $scope.coursename = group.name;
        $scope.types = [
          { name: '3 - group',id:3 }
        ];
      }
      else{
        $log.log('NO NEED');
        return;
      }

      $scope.save = function() {

        if($scope.group.tier == 1){
          $log.log('schools');
        }
        if($scope.group.tier == 2){
          $log.log('courses');
          $scope.group.schoolId = $state.params.id;
        }
        if($scope.group.tier == 3){
          $log.log('groups');
          $scope.group.courseId = $state.params.id;
          $scope.group.schoolId = group.schoolId;
        }

        GroupService.postGroup($scope.group).then(function(group) {
          //$log.log(group);
          $state.go('group.list');
          $rootScope.$broadcast('groupDataChange', $scope.group);
        });
      };
    }
  ]);

})();
