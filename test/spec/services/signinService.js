'use strict';

describe('Service: signinService', function() {

  // load the service's module
  beforeEach(module('mwcCoreWebFrontendApp'));

  // instantiate service
  var signinService;
  beforeEach(inject(function(_signinService_) {
    signinService = _signinService_;
  }));

  it('should do something', function() {
    expect( !! signinService).toBe(true);
    expect( !! signinService.session).toBeDefined();
    expect( !! signinService.session.isLogged).toBeDefined();
    expect( !! signinService.session.username).toBeDefined();
  });

});