angular.module('kabam.states', []).provider('kabamStates', function(){
  this.states = {};
  this.push = function(state){
    this.states[state.name] = state;
  };
  this.$get = function(){
    return this;
  }
});