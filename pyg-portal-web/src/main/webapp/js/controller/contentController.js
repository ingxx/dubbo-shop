app.controller('contentController', function ($scope, contentService) {
    $scope.contentList = [];
    $scope.findByCategoryId = function (categoryId) {
        contentService.findByCategoryId(categoryId).success(
            function (data) {
                $scope.contentList[categoryId] = data;
            }
        )
    }

})