app.service('pageService', function ($http) {
    //根据ID查询详情
    this.getPage = function (goodsId) {
        return $http.get('page/getPage?goodsId=' + goodsId);
    }
})