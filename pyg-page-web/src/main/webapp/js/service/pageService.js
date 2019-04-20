app.service('pageService', function ($http) {
    //根据ID查询详情
    this.getPage = function (goodsId) {
        return $http.get('page/getPage?goodsId=' + goodsId);
    }
    this.addToCart = function (sku,num) {
        return $http.get("http://localhost:9107/cart/addGoodsToCartList.do?itemId="+sku+"&num=" + num,{'withCredentials':true}).success(
            function (data) {
                if(data.success){
                    location.href='http://localhost:9107'
                }
            }
        )
    }
})