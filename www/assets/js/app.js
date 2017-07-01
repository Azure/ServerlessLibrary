'use strict';

var libraryApp = angular.module('libraryApp', []);

libraryApp.controller('library', ['$scope', '$http', function ($scope, $http) {
    $http.get('assets/data/apps.js').success(function (data) {
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

libraryApp.controller('arm', ['$scope', '$http', function ($scope, $http) {
    require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });

    $http.get('assets/data/arm-input.js').success(function (data) {
        $scope.data = data;

        require(['vs/editor/editor.main'], function () {
            var editor = monaco.editor.create(document.getElementById('container'), {
                value: JSON.stringify(data, null, 2),
                language: 'json'
            });
        });
    });


    $scope.urlChange = function () {
        $scope.data.variables.repoUrl = "sdfghjk";

        var editor = document.getElementById('container');
        editor.updateOptions({ 'value': JSON.stringify($scope.data, null, 2) });
    };
}]);

libraryApp.controller('contibutors', ['$scope', '$http', function ($scope, $http) {
    $http.get('assets/data/contibutors.js').success(function (data) {
        $scope.people = data;
    });
}]);