app.service('pageService', function ($http) {
    //根据ID查询详情
    this.getPage = function (goodsId) {
        return $http.get('page/getPage?goodsId=' + goodsId);
    }
    this.addToCart = function (sku,num) {
        alert("111");
        return $http.get("localhost:9107/addGoodsToCartList?itemId="+sku+"&num=" + num);
    }
})