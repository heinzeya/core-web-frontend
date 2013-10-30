// TODO: FIXME: tests
angular.module('kabam.states', []).provider('kabamStates',
  /**
   * @name kabamStatesProvider
   * @description Adds states to the application, allows to redefine a state: stated added later will redefine states
   * added earlier. This provider is based on the Angular ui-router states though, so you'll need to understand how ui-router works.
   */
  function(){
    // storage for all states, states added later shadow states added earlier
    this.states = {};

    this.push = function(states) {
      if(!angular.isArray(states)) states = [states];
      angular.forEach(states, function(state){
        this.states[state.name] = state;
      }, this)
    };

    this.$get = function(){
      return this;
    }
  }
);
