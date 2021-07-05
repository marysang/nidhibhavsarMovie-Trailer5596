var app = angular.module('signUpApp', ['ui.bootstrap', 'ui.utils']);

app.controller('signUpContoller', function ($scope, $http, $timeout, $compile,$interval) {
    // console.log(1)
    $scope.signup = function (){
        // console.log(2)
        // check to form is completely valid
        var userData = $scope.user;
        console.log(JSON.stringify(userData))

        $http.post("/signupReq", { 'data': $scope.user }).then(function (callback) {
            
            if (callback.data.status==="success") { 
              
            }else{
                swal({
                    type: 'error',
                    title: 'Error',
                    html: 'Error: Please Contact Administrator !!'
                });
            }
        },function (error) {
            swal({
                type: 'error',
                title: 'Error',
                html: 'Something Went Wrong. Please Contact Administrator !!'
            });
        });
      }
})