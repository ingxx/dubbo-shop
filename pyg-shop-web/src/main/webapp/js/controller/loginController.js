app.controller('loginController', function ($scope, loginService) {
    //显示当前用户名
    $scope.showLoginName = function () {
        loginService.loginName().success(
            function (data) {
                $scope.loginName=data.loginName;
        })
    }
})