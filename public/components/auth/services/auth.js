(function(){
  'use strict';

  /**
   * @name authService
   * @param {angular.$http} $http
   * @param {String} CONFIG Configuration object
   * @param {String} CONFIG.logoutUrl url for the logout
   * @constructor
   * @exports
   */
  var AuthService = function($http, CONFIG){
    this.$http = $http;
    this.CONFIG = CONFIG;
    // user object
    this.user = null;
    // callback that is called on user authentication
    /** @type {function} */
    this.onauthenticated = null;
    /** @type {function} */
    this.onloggedout = null;
  };

  /**
   * Returns true if current user is authenticated
   * @returns {boolean}
   */
  AuthService.prototype.isAuthenticated = function(){
    return !!this.user;
  };

  /**
   * Authenticates user. If service has onauthenticated callback
   * it will be called passing given user object
   * @param {Object} user User object
   */
  AuthService.prototype.authenticate = function(user){
    this.user = user;
    if(typeof this.onauthenticated === 'function'){
      this.onauthenticated(user);
    }
    if(!user.profileComplete && typeof this.onUncompletedProfile === 'function'){
      this.onUncompletedProfile(user);
    }
  };

  /**
   * Logs user out. If service has onloggedout callback it will be called
   * after successful logout http request
   */
  AuthService.prototype.logOut = function(){
    var _this = this;
    this.$http.post(this.CONFIG.logoutURL, '').success(function(){
      _this.user = null;
      if(typeof _this.onloggedout === 'function'){
        _this.onloggedout()
      }
    });
  };

  AuthService.prototype.logIn = function(username, password){
    var _this = this;
    return this.$http.post(this.CONFIG.loginURL, {
      username: username,
      password:password
    })
    .success(function(data, status, headers, config){
      _this.authenticate(data);
    })
  };

  AuthService.prototype.signUp = function(username, email, password){
    return this.$http.post(this.CONFIG.signUpURL, {
      username: username,
      email: email,
      password:password
    })
  };

  AuthService.prototype.recover = function(usernameOrEmail){
    return this.$http.post(this.CONFIG.recoveryURL, {
      email: usernameOrEmail
    })
  };

  /**
   * @description
   * Given a user object containing new fields, tries to save it using the API and if request was successful updates
   * current user object with new fields.
   * @param user User object
   */
  AuthService.prototype.save = function(user){
    var _this = this;
    // Profile edit endpoint should always return a user profile that we can save, so that we always have correct
    // user profile on the frontend
    return this.$http.post(this.CONFIG.profileEditURL, user).success(function(data){
      _this.user = data;
    })
  };

  angular.module('kabam.auth.services')
    .factory('authService', ['$http', 'CONFIG',
      function($http, CONFIG){
        return new AuthService($http, CONFIG);
      }
    ]);
})();