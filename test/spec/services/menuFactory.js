'use strict';

describe('Service: menuFactory', function () {

  // load the service's module
  beforeEach(module('mwcCoreWebFrontendApp'));

  // instantiate service
  var menuFactory;
  beforeEach(inject(function (_menuFactory_) {
    menuFactory = _menuFactory_;
  }));

  it('should have a menus in Object', function () {
    expect(!!menuFactory.getMenus).toBeDefined();
    expect(!!menuFactory).toBe(true);
    expect(menuFactory.getMenus()).toEqual(jasmine.any(Object));
  });

});
