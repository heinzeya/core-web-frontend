// TODO: tests
angular.module('kabam.flash', [])
  .factory('flash', [
    '$window',
    function($window){
      var flash = {};
      window.FLASH && (flash = $window.FLASH);
      /**
       * @name flash
       */
      return {
        /**
         * @description Returns flashed message by key
         * @param {String} name
         * @returns {*}
         */
        get: function(name){
          return flash[name.toUpperCase()]
        },

        /**
         * @description Returns and deletes flashed message by key
         * @param {String} name
         * @returns {*}
         */
        pop: function(name){
          var val = flash[name.toUpperCase()];
          delete flash[name.toUpperCase()];
          return val;
        },

        keys: function(){
          return Object.keys(flash);
        },

        clear: function(){
          flash = {};
        }
      }
    }
  ]);