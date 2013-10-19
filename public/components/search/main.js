angular.module('kabam.search', [])

  .config(['kabamStatesProvider',
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
  ])

  .controller(
    'TypeaheadCtrl',
    [ '$scope', '$http', '$log', '$timeout', '$state', '$stateParams', 'CONFIG',
      function ($scope, $http, $log, $timeout, $state, $stateParams, CONFIG) {
        var searchURL = CONFIG.searchURL || 'http://23.92.18.59:6660';

        $scope.getTermsAsync = function(suggestion, callback) {
          $http.jsonp(searchURL + '/search/autocomplete?callback=JSON_CALLBACK&q=' + suggestion)
            .then(function(response) {
              $scope.suggestions = response.data;
              callback(response.data);
            });
        };

        $scope.search = function(term, callback) {
          $http.jsonp(searchURL + '/search?callback=JSON_CALLBACK&q=' + term)
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
          $timeout(function() {
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
          $timeout(function() {
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
