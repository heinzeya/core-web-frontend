//= require jquery/jquery.js
//= require jquery-ui/ui/jquery-ui.js
//= require pines-notify/jquery.pnotify.js

//= require lodash/dist/lodash.js
//= require vendor/bootstrap.js
//= require select2/select2.js

//= require angular/angular.js
//= require angular-resource/angular-resource.js
//= require angular-cookies/angular-cookies.js
//= require angular-sanitize/angular-sanitize.js

//= require angular-ui-router/release/angular-ui-router.js
//= require angular-socket-io/socket.js
//= require angular-bootstrap/ui-bootstrap-tpls.js
//= require angular-ui-utils/modules/utils.js
//= require angular-ui-select2/src/select2.js
//= require angular-grid/ng-grid-2.0.7.debug.js
//= require fullcalendar/fullcalendar.js
//= require angular-ui-calendar/src/calendar.js
//= require restangular/dist/restangular.js
//= require angular-pines-notify/src/pnotify.js

//= require states/states.js
//= require auth/main.js
//= require user/main.js
//= require group/main.js
//= require search/main.js
//= require chat-xmpp/main.js
//= require ./admin.js
//= require ./controllers/index.js

window.kabam = {
  modules : [],
  use: function(modules){
    angular.isArray(modules) || (modules = [modules]);
    this.modules = this.modules.concat(modules);
  },
  prepend: function(modules){
    angular.isArray(modules) || (modules = [modules]);
    this.modules = modules.concat(this.modules);
  }
};