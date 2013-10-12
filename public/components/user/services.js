(function(){
"use strict";

var userServices = angular.module('kabam.user.services');

userServices.factory('User', [
  'Restangular',
  function(Restangular) {
    //return $resource('/api/rest/User/:id', {id: '@id'});
    return Restangular.all('User');
  }
]);

userServices.factory('UserService', [
  'Restangular',
  function(Restangular) {
    var _userService = Restangular.all('User');
    return {
      getUsers: function() {
        return _userService.getList();
      },

      getUser: function(id) {
        return _userService.get(id);
      },

      postUser: function(user) {
        return _userService.post(user);
      }
    };
  }
]);

userServices.factory('UserSearch', [
  '$q',
  function($q) {
    return function(username) {
      var delay = $q.defer();
      setTimeout(function() {
        var users = [
          {_id: '1', email: 'user1@monimus.com', username: 'user1'},
          {_id: '2', email: 'user2@monimus.com', username: 'user2'},
          {_id: '3', email: 'user3@monimus.com', username: 'user3'},
          {_id: '4', email: 'user4@monimus.com', username: 'user4'},
          {_id: '5', email: 'user5@monimus.com', username: 'user5'},
          {_id: '6', email: 'user6@monimus.com', username: 'user6'},
          {_id: '7', email: 'user7@monimus.com', username: 'user7'}
        ];
        delay.resolve(users);
      }, 1000);
      return delay.promise;
    };
  }
]);

})();
