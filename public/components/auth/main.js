//= require_tree ../config
//= require_self
//= require_tree ./controllers
//= require_tree ./services
//= require      ./states

angular.module('CoreAuth.Services', ['CoreFrontend.Config']);
angular.module('CoreAuth.Controllers', []);
angular.module('CoreAuth.States', ['kabam.states']);
