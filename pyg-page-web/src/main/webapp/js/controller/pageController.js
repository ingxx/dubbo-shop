app.controller('pageController', function ($scope, pageService,$location,$sce) {
    $scope.getPage = function (goodsId) {
        pageService.getPage(goodsId).success(
            function (data) {
                $scope.goods = data;
                $scope.goods.goodsDesc.itemImages = JSON.parse($scope.goods.goodsDesc.itemImages);
                $scope.goods.goodsDesc.customAttributeItems = JSON.parse($scope.goods.goodsDesc.customAttributeItems);
                $scope.goods.goodsDesc.specificationItems = JSON.parse($scope.goods.goodsDesc.specificationItems);
                console.log($scope.goods);
            }
        )
    }
    $scope.loadPage = function () {
        $scope.getPage($location.search()['keywords']);
    }

    $scope.num = 1;
    //数量加减
    $scope.addNum = function (x) {
        $scope.num += x;
        if($scope.num <= 1){
            $scope.num = 1;
        }
    };

    $scope.specificationItems = {};//存储用户选择的内容
    $scope.selectSpecification = function (key,value) {
        $scope.specificationItems[key] = value;
    }
})
app.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});