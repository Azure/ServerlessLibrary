'use strict';

var libraryApp = angular.module('libraryApp', []);
var armApp = angular.module('armApp', []);

libraryApp.controller('library', ['$scope', '$http', function ($scope, $http) {
    $http.get('assets/data/functions.js').success(function (data) {
        $scope.items = data;

        angular.forEach($scope.items, function (item) {
            item.TemplateUri = function () {
                return encodeURIComponent(item.template);
            };
            item.AddTemplateUri = function () {
                return encodeURIComponent(item.addTemplate)
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

armApp.controller('arm', ['$scope', '$http', function ($scope, $http) {
    require.config({ paths: { 'vs': 'assets/monaco-editor/min/vs' } });
    
    $http.get('assets/data/arm-input.js').success(function (data) {
        $scope.data = data;

        require(['vs/editor/editor.main'], function () {
            var editor = monaco.editor.create(document.getElementById('template'), {
                value: data,
                language: 'json'
            });
        });
    });
}]);