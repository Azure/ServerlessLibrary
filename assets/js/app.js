'use strict';

var libraryApp = angular.module('libraryApp', []);

libraryApp.controller('library', ['$scope', '$http', function ($scope, $http) {
    $http.get('assets/js/data.js').success(function (data) {
        $scope.items = data;

         angular.forEach($scope.items, function (item) {
            item.TemplateUri = function() {
                return encodeURIComponent(item.TemplateUrl);
            };
        });
    });
}]);