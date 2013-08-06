'use strict';

describe('Controller: MenusCtrl', function () {

  // load the controller's module
  beforeEach(module('mwcCoreWebFrontendApp'));

  var MenusCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MenusCtrl = $controller('MenusCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of menus to the scope', function () {
    expect(scope.menus).toBeDefined();
    expect(scope.menus).toEqual(jasmine.any(Object));
  });
});
