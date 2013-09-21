angular.module('kabam.auth.directives')
  .directive('authStrategy', [
    'sessionStorage', '$location',
    function(sessionStorage, $location){
      return {
        restrict: 'A',
        link: function(scope, element, attrs){
          var strategyName = attrs.authStrategy;
          element.attr('href', '/auth/' + strategyName);
          element.bind('click', function() {
            var
              successRedirect = '/',
              failureRedirect = $location.path();
            if(attrs.successRedirect){
              successRedirect = attrs.successRedirect
            }
            if(attrs.failureRedirect){
              failureRedirect = attrs.failureRedirect
            }
            sessionStorage.setItem('redirect', {
              success: successRedirect,
              failure: failureRedirect
            });
          })
        }
      }
    }
  ]);