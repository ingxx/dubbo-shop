app.controller('searchController', function ($scope, searchService) {

    $scope.searchMap = {
        'keywords': '',
        'category': '',
        'brand': '',
        'spec': {},
        'price': '',
        'pageNum': 1,
        'pageSize': 40
    };
    //搜索方法
    $scope.search = function () {
        searchService.search($scope.searchMap).success(
            function (response) {
                $scope.resultMap = response;

                builPageLable();//构建分页栏
            }
        )
    };
    builPageLable = function () {
        $scope.pageLabel = [];
        var firstPage = 1; //开始页
        var lastPage = $scope.resultMap.totalPages; //截至页码
        if ($scope.resultMap.totalPages > 5) { //如果总页数大于5
            if ($scope.searchMap.pageNum <= 3) { //如果当前页码小于3显示前5页
                lastPage = 5;
            } else if ($scope.searchMap.pageNum >= $scope.resultMap.totalPages - 2) {
                firstPage = $scope.resultMap.totalPages - 4;
            } else {
                firstPage = $scope.searchMap.pageNum - 2;
                lastPage = $scope.searchMap.pageNum + 2;
            }
        }
        for (var i = firstPage; i <= lastPage; i++) {
            $scope.pageLabel.push(i);
        }
    };
    //添加搜索项
    $scope.addSearchItem = function (key, value) {
        if (key == 'category' || key == 'brand' || key == 'price') {//如果用户点击的是分类或品牌
            $scope.searchMap[key] = value;
        } else {
            $scope.searchMap.spec[key] = value;
        }
        $scope.search();
    }

    //撤销搜索项
    $scope.removeSearchItem = function (key) {
        if (key == 'category' || key == 'brand' || key == 'price') {//如果用户点击的是分类或品牌
            $scope.searchMap[key] = '';
        } else {
            delete $scope.searchMap.spec[key];
        }
        $scope.search();
    }

    $scope.queryByPage = function (pageNum) {
        $scope.searchMap.pageNum = pageNum;
        $scope.search();
    }

})