'use strict';

describe('Service: guard', function () {
  var guard;

  beforeEach(module('kabam.auth.services'));
  beforeEach(module('ui.router'));

  beforeEach(inject(function(_guard_){
    guard = _guard_;
  }));



  describe('#watch', function(){

    it('should listen on $rootScope.$stateChangeStart', function(){
      var $rootScope;

      runs(function(){
        inject(function(_$rootScope_){
          $rootScope = _$rootScope_;
          spyOn($rootScope, '$on');
          guard.watch();
        });
      });

      waitsFor(function(){
        return true
      }, 'failed to listen on $rootScope.$stateChangeStart' , 100);

      runs(function(){
        expect($rootScope.$on).toHaveBeenCalled();
      })
    });

  })

});