'use strict';

describe('Service: sessionFactory', function () {

  // load the service's module
  beforeEach(module('mwcCoreWebFrontendApp'));

  // instantiate service
  var sessionFactory;
  beforeEach(inject(function (_sessionFactory_) {
    sessionFactory = _sessionFactory_;
  }));

  it('should have signin()', function () {
    expect(!!sessionFactory.signin).toBeDefined();
    expect(!!sessionFactory.isSignedIn).toBeDefined();
  });

});
