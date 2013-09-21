//= require_tree ../config
//= require_self
//= require_tree ./controllers
//= require_tree ./services
//= require      ./states

angular.module('kabam.auth.services', ['kabam.config']);
angular.module('kabam.auth.controllers', []);
angular.module('kabam.auth.states', ['kabam.states']);
