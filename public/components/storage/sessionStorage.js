angular.module('sessionStorage', []).factory('sessionStorage', function(){
  return {
    setItem: function(key, value){
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    getItem: function(key){
      return JSON.parse(sessionStorage.getItem(key));
    },
    removeItem: sessionStorage.removeItem.bind(sessionStorage)
  }
});