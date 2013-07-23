'use strict';

describe('Service: signinFactory', function () {

  // load the service's module
  beforeEach(module('mwcCoreWebFrontendApp'));

  // instantiate service
  var signinFactory;
  beforeEach(inject(function (_signinFactory_) {
    signinFactory = _signinFactory_;
  }));

  it('should do something', function () {
    expect(!!signinFactory).toBe(true);
  });

});
