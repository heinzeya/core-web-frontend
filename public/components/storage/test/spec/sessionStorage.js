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
  })

});