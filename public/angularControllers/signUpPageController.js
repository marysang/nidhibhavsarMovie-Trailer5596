var app = angular.module('signUpApp', ['ui.bootstrap', 'ui.utils']);

app.controller('signUpContoller', function ($scope, $http,$window) {
    // console.log(1)
    $scope.signup = function (){
        // console.log(2)
        // check to form is completely valid
        var userData = $scope.user;
        console.log(JSON.stringify(userData));
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        if(username=="" ||email=="" ||password==""){
            swal({
                type: 'error',
                title: 'Error',
                html: 'All fields are required'
            });
        }else{
            $http.post("/signupReq",{'udata':userData}).then(function (callback) {
            
                if (callback.data.status==="success") { 
                    $window.location.href = '/trailerPage?id='+callback.data.id;
                  
                }else if(callback.data.status==="already_exist"){
                    swal({
                        type: 'error',
                        title: 'Error',
                        html: callback.data.msg
                    });
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

        
       
      }
})