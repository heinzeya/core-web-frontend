'use strict';

describe('Service: authService', function () {
  var
    $httpBackend,
    authService,
    CONFIG,
    $rootScope;

  beforeEach(module('kabam.auth.services'));

  beforeEach(function(){
    module(function($provide){
      $provide.constant('CONFIG', {
        signUpURL:'/auth/signup',
        loginURL:'/auth/login',
        logoutURL:'/auth/logout',
        recoveryURL: '/auth/restoreAccount',
        profileEditURL: '/auth/profile'
      });
    });
  });

  beforeEach(inject(function (_authService_, _$httpBackend_, _$rootScope_, _CONFIG_) {
    authService = _authService_;
    $httpBackend = _$httpBackend_;
    CONFIG = _CONFIG_;
    $rootScope = _$rootScope_;
    $httpBackend.when('POST', CONFIG.loginURL).respond(200, {username: 'Joe'});
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#isAuthenticated()', function(){
    it('should return false if user is not authenticated', function () {
      expect(authService.isAuthenticated()).toBe(false);
    });
    it('should return true after authenticating a user', function(){
      authService.authenticate({name: 'Joe'});
      expect(authService.isAuthenticated()).toBe(true);
    });
  });

  describe('#authenticate()', function(){
    it('should save user as `.user` field', function(){
      authService.authenticate({name: 'Joe'});
      expect(authService.user.name).toBe('Joe');
    });
    it('should call `onauthenticated` function if it exists', function(){
      authService.onauthenticated = jasmine.createSpy();
      authService.authenticate({name: 'Joe'});
      expect(authService.onauthenticated).toHaveBeenCalled();
    });
  });

  describe('#login()', function(){
    it('should POST `CONFIG.loginURL`', function(){
      $httpBackend.expectPOST(CONFIG.loginURL, {username: 'joe', password: 'qweqwe'})
        .respond(200, { username: 'Joe' });
      $rootScope.$apply(authService.logIn('joe', 'qweqwe'));
      $httpBackend.flush();
    });
    it("should  authenticate user if username and passwordsmatch", function(){
      $httpBackend.expectPOST(CONFIG.loginURL, {username: 'joe', password: 'qweqwe'});
      $rootScope.$apply(authService.logIn('joe', 'qweqwe'));
      $httpBackend.flush();
      expect(authService.isAuthenticated()).toBe(true);
    });
    it("should not authenticate user if username and passwords don't match", function(){
      $httpBackend.expectPOST(CONFIG.loginURL, {username: 'joe', password: 'qweqwe'}).respond(401);
      $rootScope.$apply(authService.logIn('joe', 'qweqwe'));
      $httpBackend.flush();
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('#signup()', function(){
    it('should POST `CONFIG.signUpURL`', function(){
      $httpBackend.expectPOST(CONFIG.signUpURL, {username: 'joe', email: 'joe@doe.com', password: 'qweqwe'}).respond(201);
      $rootScope.$apply(authService.signUp('joe', 'joe@doe.com', 'qweqwe'));
      $httpBackend.flush();
    });
  });

  describe('#logout()', function(){
    it('should POST `CONFIG.logoutURL`', function(){
      $httpBackend.expectPOST(CONFIG.logoutURL).respond(200);
      $rootScope.$apply(function() {
        authService.authenticate({username: 'Joe'});
        authService.logOut();
      });
      $httpBackend.flush();
    });
    it('should call `onloggedout` function if exists', function(){
      $httpBackend.expectPOST(CONFIG.logoutURL).respond(200);
      authService.onloggedout = jasmine.createSpy();
      $rootScope.$apply(function() {
        authService.authenticate({username: 'Joe'});
        authService.logOut();
      });
      $httpBackend.flush();
      expect(authService.onloggedout).toHaveBeenCalled();
    });
  });

  describe('#recover', function(){
    it('should POST `CONFIG.recoveryURL`', function(){
      $httpBackend.expectPOST(CONFIG.recoveryURL).respond(200);
      $rootScope.$apply(authService.recover('john@legend.com'));
      $httpBackend.flush();
    });
  });

  describe('#save', function(){
    it("should return error if password1 doesn't match password2", function(){
      var error;

      runs(function(){
        $rootScope.$apply(
          authService.save({newPassword1: 'ololo', newPassword2: 'trololo'}).then(null, function(data) {
            error = data;
          })
        );
      });

      waitsFor(function(){
        return error !== undefined;
      }, 'failed', 1000);

      runs(function(){
        expect(error).toEqual({errors: {newPassword2: 'Password confirmation should match password'}});
      });
    });
    it('should POST `CONFIG.profileEditURL`', function(){
      $httpBackend.expectPOST(CONFIG.profileEditURL, {
        username: 'joe',
        email: 'joe@doe.com',
        firstName: 'John',
        lastName: 'Legend'
      }).respond(201, {
        username: 'joe',
        email: 'joe@doe.com',
        firstName: 'John',
        lastName: 'Legend'
      });
      $rootScope.$apply(
        authService.save({
          username: 'joe',
          email: 'joe@doe.com',
          firstName: 'John',
          lastName: 'Legend'
        })
      );
      $httpBackend.flush();
    });
    it('should replace authService.user with the returned one', function(){
      $httpBackend.expectPOST(CONFIG.profileEditURL, {
        username: 'joe',
        email: 'joe@travolta.com',
        firstName: 'John',
        lastName: 'Travolta'
      }).respond(201, {
        username: 'joe',
        email: 'joe@legend.com',
        firstName: 'John',
        lastName: 'Legend'
      });
      $rootScope.$apply(
        authService.save({
          username: 'joe',
          email: 'joe@travolta.com',
          firstName: 'John',
          lastName: 'Travolta'
        })
      );
      $httpBackend.flush();
      expect(authService.user).toEqual({
        username: 'joe',
        email: 'joe@legend.com',
        firstName: 'John',
        lastName: 'Legend'
      });
    })
  })

});
