angular.module('kabam.auth.directives')
  .directive('authStrategy', [
    '$window', 'sessionStorage', '$location',
    /**
     * @description
     * Directive for creating links to oauth/openid strategies. Accepts client-side redirect location for success and
     * failure using `success-redirect` and `failure-redirect` attributes. Accepts strategy name using `auth-strategy`
     * attribute. If no redirect endpoints specified `/` and current $location.path() will be used for success and
     * failure respectively.
     * @example
     * ```
     * <a auth-strategy="google" success-redirect="/profile" class="btn">Sign Up With Google</a>
     * ```
     */
    function($window, sessionStorage, $location){
      return {
        restrict: 'A',
        link: function(scope, element, attrs){
          var strategyPath = '/auth/' + attrs.authStrategy;

          // set a href for links just to make sure browser can show a link to the user
          if(element.prop('tagName') === 'A'){
            element.attr('href', strategyPath);
          }

          element.bind('click', function(e) {
            var
              successRedirect = '/',
              failureRedirect = $location.path();

            e.preventDefault();

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

            $window.location.href = strategyPath;
          })
        }
      }
    }
  ]);