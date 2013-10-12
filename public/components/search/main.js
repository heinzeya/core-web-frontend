var searchModule = angular.module(
  'kabam.search',
  [
    'ui.bootstrap', 'kabam.states'
  ]);

searchModule.config([
  'kabamStatesProvider',
  function(kabamStatesProvider) {
    kabamStatesProvider
      .push([
        {
          name: 'search',
          url: '/search?query',
          templateUrl: '/assets/search/views/index.html',
          controller: 'TypeaheadCtrl'
        }
      ]);
  }
]);

searchModule.controller(
  'TypeaheadCtrl',
  [ '$scope', '$http', '$log', '$state', '$stateParams',
    function ($scope, $http, $log, $state, $stateParams) {

      $scope.getTermsAsync = function(suggestion, callback) {
        $http.jsonp("http://target.monimus.com:6660/search/autocomplete?callback=JSON_CALLBACK&q=" + suggestion)
          .then(function(response) {
            $scope.suggestions = response.data;
            callback(response.data);
          });
      };

      $scope.search = function(term, callback) {
        $http.jsonp("http://target.monimus.com:6660/search?callback=JSON_CALLBACK&q=" + term)
          .then(function(response) {
            $scope.suggestions = response.data;
            callback(response.data);
          });
      };

      $scope.courses = true;
      $scope.documents = true;
      $scope.schools = true;
      $scope.students = true;

      $scope.updater = function(selected) {
        _.defer(function() {
          $scope.$apply(function() {
            $scope.selected = selected;
            $scope.search(selected, function(results) {
              $scope.selected = $scope.selected;
              $scope.results = results.results;
            });
          });
        });
      };

      $scope.submit = function($event) {
        if ($event.keyCode == 13) {
          $scope.topUpdater($scope.selected);
        }
      };

      $scope.topUpdater = function(selected) {
        _.defer(function() {
          $scope.$apply(function() {
            $scope.selected = selected;
            $state.go('search', { query: selected });
          });
        });
      };

      if ($stateParams.query) {
        $scope.selected = $stateParams.query;
        $scope.search($stateParams.query, function(results) {
          $scope.results = results.results;
        });
      } else {
        $scope.selected = undefined;
        $scope.results = {};
      }

      var typeaheadOpts = {
        source: $scope.getTermsAsync,
        items: 20,
        minLength: 2,
        updater: $scope.updater
      };

      var topTypeaheadOpts = {
        source: $scope.getTermsAsync,
        items: 20,
        minLength: 2,
        updater: $scope.topUpdater
      };

      $('input.search-box').typeahead(typeaheadOpts);
      $('input.top-search-box').typeahead(topTypeaheadOpts);

      $scope.suggestions = [];
    }
  ]
);
