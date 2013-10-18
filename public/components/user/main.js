//= require_self
//= require ./states.js
//= require ./services.js
//= require ./controllers.js

angular.module('kabam.user.states', ['restangular', 'kabam.states']);
angular.module('kabam.user.services', ['restangular', 'ngGrid', 'ui.router']);
angular.module('kabam.user.controllers', ['ui.notify', 'kabam.user.services']);

angular.module('kabam.user', [
  'kabam.user.states',
  'kabam.user.services',
  'kabam.user.controllers'
]);
