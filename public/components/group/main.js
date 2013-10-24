//=require_self
//=require ./services.js
//=require ./controllers.js
//=require ./states.js

angular.module('kabam.group.states', ['kabam.states']);
angular.module('kabam.group.services', []);
angular.module('kabam.group.controllers', ['kabam.group.services', 'kabam.user.services']);

angular.module('kabam.group',
               ['kabam.group.states',
                'kabam.group.services',
                'kabam.group.controllers',
                'kabam.user.services',
                'ui.router',
                'ui.bootstrap',
                'ui.select2',
                'kabam.states'
               ]);
