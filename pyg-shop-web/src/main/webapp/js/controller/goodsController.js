//控制层
app.controller('goodsController', function ($scope, $controller, goodsService, uploadService, itemCatService, typeTemplateService) {

    $controller('baseController', {$scope: $scope});//继承

    //读取列表数据绑定到表单中  
    $scope.findAll = function () {
        goodsService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    }

    //分页
    $scope.findPage = function (page, rows) {
        goodsService.findPage(page, rows).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    //查询实体
    $scope.findOne = function (id) {
        goodsService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    //保存
    $scope.save = function () {
        var serviceObject;//服务层对象
        if ($scope.entity.id != null) {//如果有ID
            serviceObject = goodsService.update($scope.entity); //修改
        } else {
            serviceObject = goodsService.add($scope.entity);//增加
        }
        serviceObject.success(
            function (response) {
                if (response.success) {
                    //重新查询
                    $scope.reloadList();//重新加载
                } else {
                    alert(response.message);
                }
            }
        );
    };
    //增加商品
    $scope.add = function () {
        $scope.entity.goodsDesc.introduction = editor.html();
        goodsService.add($scope.entity).success(
            function (response) {
                if (response.success) {
                    alert("新增成功！");
                    editor.html("");//清空富文本编辑器
                    $scope.entity = {};
                } else {
                    alert(response.message);
                }
            }
        );
    }


    //批量删除
    $scope.dele = function () {
        //获取选中的复选框
        goodsService.dele($scope.selectIds).success(
            function (response) {
                if (response.success) {
                    $scope.reloadList();//刷新列表
                    $scope.selectIds = [];
                }
            }
        );
    }

    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        goodsService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }
    //上传图片
    $scope.uploadFile = function () {
        uploadService.uploadFile().success(
            function (data) {
                if (data.success) {
                    $scope.image_entity.url = data.message;
                } else {
                    alert(data.message);
                }
            }
        )
    }
    $scope.entity = {goodsDesc: {itemImages: [], specificationItems: []}};
    //向goodsdesc的itemImages字段添加图片实体
    $scope.add_image_entity = function () {
        $scope.entity.goodsDesc.itemImages.push($scope.image_entity);
    }

    //在itemImages字段删除图片
    $scope.remove_image_entity = function (index) {
        $scope.entity.goodsDesc.itemImages.splice(index, 1);
    }

    //查找一级分类
    $scope.selectItemCat1List = function () {
        itemCatService.findByParentId(0).success(
            function (data) {
                $scope.itemCat1List = data;
            }
        )
    }
    //查找二级分类
    $scope.$watch('entity.goods.category1Id', function (newValue, oldValue) {
        itemCatService.findByParentId(newValue).success(
            function (data) {
                $scope.itemCat2List = data;
            }
        )
    })
    //查找三级分类
    $scope.$watch('entity.goods.category2Id', function (newValue, oldValue) {
        itemCatService.findByParentId(newValue).success(
            function (data) {
                $scope.itemCat3List = data;
            }
        )
    })

    //读取模板ID
    $scope.$watch('entity.goods.category2Id', function (newValue, oldValue) {
        itemCatService.findOne(newValue).success(
            function (data) {
                $scope.entity.goods.typeTemplateId = data.typeId;
            }
        )
    })

    //读取到模板变化后 读取品牌列表
    $scope.$watch('entity.goods.typeTemplateId', function (newValue, oldValue) {
        typeTemplateService.findOne(newValue).success(
            function (data) {
                $scope.typeTemplate = data;
                //品牌列表
                $scope.typeTemplate.brandIds = JSON.parse($scope.typeTemplate.brandIds);
                //扩展属性
                $scope.entity.goodsDesc.customAttributeItems = JSON.parse($scope.typeTemplate.customAttributeItems);
            }
        );
        //读取规格
        typeTemplateService.findSpecList(newValue).success(
            function (data) {
                $scope.specList = data;
            }
        );

        //修改选中规格
        $scope.updateSpecAttribute = function ($event, name, value) {
            //查找规格是否存在
            var obj = $scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems, 'attributeName', name);
            //存在
            if (obj != null) {
                //判断是选中还是取消
                if ($event.target.checked) {
                    //选中push value到attributeValue集合
                    obj.attributeValue.push(value);
                }else{
                    //取消 删除attributeValue中的value值
                    obj.attributeValue.splice(obj.attributeValue.indexOf(value),1);
                    //如果attributeValue为空了 从specificationItems移除当前规格
                    if(obj.attributeValue.length ==0){
                        $scope.entity.goodsDesc.specificationItems.splice($scope.entity.goodsDesc.specificationItems.indexOf(obj),1);
                    }
                }
            } else {
                $scope.entity.goodsDesc.specificationItems.push({"attributeName": name, "attributeValue": [value]})
            }
        }
    });
    //创建sku列表
    $scope.createItemList = function () {
        $scope.entity.itemList = [{spec:{},price:0,num:99999,status:'0',isDefault:'0'}];//列表初始化

    }

});	
