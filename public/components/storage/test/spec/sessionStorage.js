describe('Service: sessionStorage', function () {
  var sessionStorage;

  beforeEach(module('sessionStorage'));

  beforeEach(inject(function(_sessionStorage_){
    sessionStorage = _sessionStorage_;
  }));

  describe('#setItem', function(){
    it('should save an json encoded object under the given key in the window.sessionStorage', function(){
      sessionStorage.setItem('key', 'value');
      expect(window.sessionStorage.getItem('key')).toBe('"value"');

      sessionStorage.setItem('key2', {ololo: true});
      expect(window.sessionStorage.getItem('key2')).toBe('{"ololo":true}');
    });
  });

  describe('#getItem', function(){
    it('should return an object for a given key', function(){
      sessionStorage.setItem('key', {ololo: true});
      expect(sessionStorage.getItem('key')).toEqual({ololo: true});
    })
  });

  describe('#removeItem', function(){
    it('should delete object from storage', function(){
      sessionStorage.setItem('key', {ololo: true});
      expect(sessionStorage.getItem('key')).toEqual({ololo: true});
      sessionStorage.removeItem('key');
      expect(sessionStorage.getItem('key')).toEqual(null);
    })
  });

});