angular.module('kabam.group.states').config([
  'kabamStatesProvider',
  function(kabamStatesProvider) {

    kabamStatesProvider
      .push([
        {
          name: 'group',
          url: '/group',
          templateUrl: '/assets/group/views/index.html',
          controller: 'GroupMainCtrl',
          resolve: {
            groups: function(GroupService) {
              return GroupService.getGroups();
            }
          }
        },
        {
          name: 'group.list',
          url: '/list',
          templateUrl: '/assets/group/views/list.html',
          controller: 'GroupListCtrl'
        },
        {
          name: 'group.view',
          url: '/view/:id',
          templateUrl: '/assets/group/views/view.html',
          controller: 'GroupViewCtrl',
          resolve: {
            group: function(GroupService, $stateParams) {
              return GroupService.getGroup($stateParams.id);
            }
          }
        },
        {
          name: 'group.new',
          url: '/new',
          templateUrl: '/assets/group/views/edit.html',
          controller: 'GroupEditCtrl',
          resolve: {
            'group': function() {
              return {};
            }
          }
        },
        {
          name: 'group.edit',
          url: '/edit/:id',
          templateUrl: '/assets/group/views/edit.html',
          controller: 'GroupEditCtrl',
          resolve: {
            group: function(GroupService, $stateParams) {
              return GroupService.getGroup($stateParams.id);
            }
          }
        },
        {
          name: 'group.admin',
          url: '/:id/admin',
          templateUrl: '/assets/group/views/admin.html',
          controller: 'GroupAdminCtrl',
          resolve: {
            group: function(GroupService, $stateParams) {
              return GroupService.getGroup($stateParams.id);
            }
          }
        },
        {
          name: 'group.member',
          url: '/:id/member',
          templateUrl: '/assets/group/views/member.html',
          controller: 'GroupMemberCtrl',
          resolve: {
            group: function(GroupService, $stateParams) {
              return GroupService.getGroup($stateParams.id);
            }
          }
        },
        {
          name: 'group.subgroup',
          url: '/:id/subgroup',
          templateUrl: '/assets/group/views/subgroup.html',
          controller: 'SubgroupCtrl',
          resolve: {
            group: function(GroupService, $stateParams) {
              return GroupService.getGroup($stateParams.id);
            },
            school: function(GroupService, group) {
                if (group.schoolId == null) {
                  return null;
                }
                return GroupService.getGroup(group.schoolId);
            },
            course: function(GroupService, group) {
                if(group.courseId == null) {
                  return null;
                }
                return GroupService.getGroup(group.courseId);
            }
          }
        }

      ]);
  }
]);
