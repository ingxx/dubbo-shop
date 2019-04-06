app.controller('pageController', function ($scope, pageService) {
    $scope.getPage = function (goodsId) {
        pageService.getPage(goodsId).success(
            function (data) {
                $scope.goods = data;
                console.log($scope.goods);
            }
        )
    }
    $scope.search = function () {
        location.href="http://localhost:8083/#?keywords="+$scope.keywords;
    }
})