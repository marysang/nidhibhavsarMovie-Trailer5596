var app = angular.module('trailerApp', ['ui.bootstrap', 'ui.utils']);

app.controller('trailerContoller', function ($scope, $http,$window) {
    console.log(1)
    $scope.init = function (){
        console.log(2)

      }
})