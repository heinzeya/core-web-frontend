'use strict';

describe('Service: authService', function () {
  var
    $httpBackend,
    authService,
    CONFIG;

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

  beforeEach(inject(function (_authService_, _$httpBackend_, _CONFIG_) {
    authService = _authService_;
    $httpBackend = _$httpBackend_;
    CONFIG = _CONFIG_;
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
    })
  });

  describe('#login()', function(){
    it('should POST `CONFIG.loginURL`', function(){
      $httpBackend.expectPOST(CONFIG.loginURL, {username: 'joe', password: 'qweqwe'});
      authService.logIn('joe', 'qweqwe');
      $httpBackend.flush();
    });
    it("should  authenticate user if username and passwordsmatch", function(){
      $httpBackend.expectPOST(CONFIG.loginURL, {username: 'joe', password: 'qweqwe'});
      authService.logIn('joe', 'qweqwe');
      $httpBackend.flush();
      expect(authService.isAuthenticated()).toBe(true);
    });
    it("should not authenticate user if username and passwords don't match", function(){
      $httpBackend.expectPOST(CONFIG.loginURL, {username: 'joe', password: 'qweqwe'}).respond(401);
      authService.logIn('joe', 'qweqwe');
      $httpBackend.flush();
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('#signup()', function(){
    it('should POST `CONFIG.signUpURL`', function(){
      $httpBackend.expectPOST(CONFIG.signUpURL, {username: 'joe', email: 'joe@doe.com', password: 'qweqwe'}).respond(201);
      authService.signUp('joe', 'joe@doe.com', 'qweqwe');
      $httpBackend.flush();
    });
  });

  describe('#logout()', function(){
    it('should POST `CONFIG.logoutURL`', function(){
      $httpBackend.expectPOST(CONFIG.logoutURL).respond(200);
      authService.authenticate({username: 'Joe'});
      authService.logOut();
      $httpBackend.flush();
    });
    it('should call `onloggedout` function if exists', function(){
      $httpBackend.expectPOST(CONFIG.logoutURL).respond(200);
      authService.onloggedout = jasmine.createSpy();
      authService.authenticate({username: 'Joe'});
      authService.logOut();
      $httpBackend.flush();
      expect(authService.onloggedout).toHaveBeenCalled();
    })
  });

  describe('#recover', function(){
    it('should POST `CONFIG.recoveryURL`', function(){
      $httpBackend.expectPOST(CONFIG.recoveryURL).respond(200);
      authService.recover('john@legend.com');
      $httpBackend.flush();
    });
  });

  describe('#save', function(){
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
      authService.save({
        username: 'joe',
        email: 'joe@doe.com',
        firstName: 'John',
        lastName: 'Legend'
      });
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
      authService.save({
        username: 'joe',
        email: 'joe@travolta.com',
        firstName: 'John',
        lastName: 'Travolta'
      });
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