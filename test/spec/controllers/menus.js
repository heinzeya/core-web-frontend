'use strict';

describe('Controller: MenusCtrl', function() {

  // load the controller's module
  beforeEach(module('mwcCoreWebFrontendApp'));

  var MenusCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/menus.json')
      .respond({
        "home": {
          "title": "Home",
          "uri": "/"
        }
      });
    scope = $rootScope.$new();
    MenusCtrl = $controller('MenusCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of menus to the scope', function() {
    // expect(scope.menus).toBeUndefined();
    $httpBackend.flush();
    expect(scope.menus).toBeDefined();
    expect(scope.menus).toEqual(jasmine.any(Object));
  });
});