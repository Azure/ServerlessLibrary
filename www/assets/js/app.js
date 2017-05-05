﻿'use strict';

var libraryApp = angular.module('libraryApp', []);

libraryApp.controller('library', ['$scope', '$http', function ($scope, $http) {
    $http.get('assets/js/data.js').success(function (data) {
        $scope.items = data;

        angular.forEach($scope.items, function (item) {
            item.TemplateUri = function () {
                return encodeURIComponent(item.template);
            };
        });

        $scope.columns = columnize(data, 3);
        function columnize(input, cols) {
            var arr = [];
            for (var i = 0; i < input.length; i++) {
                var colIdx = i % cols;
                arr[colIdx] = arr[colIdx] || [];
                arr[colIdx].push(input[i]);
            }
            return arr;
        }
    });
}]);