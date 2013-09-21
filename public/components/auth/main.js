//= require_tree ../config
//= require      ../storage/sessionStorage
//= require      ../flash/main
//= require_self
//= require_tree ./controllers
//= require_tree ./services
//= require      ./states
//= require      ./directives

angular.module('kabam.auth.services', ['kabam.config', 'kabam.flash', 'sessionStorage']);
angular.module('kabam.auth.controllers', []);
angular.module('kabam.auth.states', ['kabam.states']);
angular.module('kabam.auth.directives', ['sessionStorage']);

angular.module('kabam.auth', [
  'kabam.auth.services',
  'kabam.auth.controllers',
  'kabam.auth.states',
  'kabam.auth.directives'
]);
