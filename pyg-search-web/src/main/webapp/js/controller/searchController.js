app.controller('searchController',function ($scope,searchService) {

    $scope.searchMap = {'keywords':'','category':'','brand':'','spec':{}};
    //搜索方法
    $scope.search = function () {
        searchService.search($scope.searchMap).success(
            function (response) {
                $scope.resultMap = response;
            }
        )
    };
    //添加搜索项
    $scope.addSearchItem =function (key,value) {
        if(key == 'category' || key == 'brand'){//如果用户点击的是分类或品牌
            $scope.searchMap[key] = value;
        }else{
            $scope.searchMap.spec[key] = value;
        }
        $scope.search();
    }

    //撤销搜索项
    $scope.removeSearchItem = function (key) {
        if(key == 'category' || key == 'brand'){//如果用户点击的是分类或品牌
            $scope.searchMap[key] = '';
        }else{
            delete $scope.searchMap.spec[key];
        }
        $scope.search();
    }
})