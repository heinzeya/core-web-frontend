(function(){
  "use strict";

var groupServices = angular.module('kabam.group.services');

groupServices.factory('GroupService', [
  'Restangular',
  function(Restangular) {
    var _groupService = Restangular.all('Group');
    return {

      getGroups: function() {
        return _groupService.getList();
      },

      getGroup: function(id) {
        return _groupService.get(id);
      },

      postGroup: function(group) {
        return _groupService.post(group);
      }

    };
  }
]);

})();
