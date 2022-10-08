var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();
var day = d.getDate();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
var deFC = 'LTFLOOR20211026000011';

$(document).ready(function(){
    getShopFloorInfo(deFC);
});

//定义全局map变量
var map = null;
//定义地图ID变量
var fmapID = '1476807084257062913';

//判断当前是否点击的是poi,控制点击公共设施的时候只弹出公共设施的信息框
var clickedPOI = false;
// 点击事件ID
var eventID = null;
//定义选中模型
var selectedModel = null;
//定义二维/三维模式变量
var planarFlag = false;
//定义单层维/多层模式变量
var multiFlag = false;
//默认聚焦楼层
var defaultFocusID = 4;
//楼层索引值
var defaultIndex;

window.onload = function () {
    //加载地图
    openMap();
}; 

function openMap() {
    /**
     * 初始化参数，默认使用在线数据，从蜂鸟视图数据服务器加载模型数据
     * https://developer.fengmap.com/docs/js/v2.7.1/fengmap.FMMap.html
     **/
    var mapOptions = {
        //必要，地图容器
        container: document.getElementById('fengMap'),
        //地图数据位置
        //mapServerURL: './data/' + fmapID,
        //主题数据位置
        //mapThemeURL: './data/theme',
        //默认主题名称
        //defaultThemeName: '3b91d03288204d02368dd4f68fc1f189',
        //默认聚焦楼层
        //defaultFocusGroup: 4,
        //初始显示楼层ID数组
        //defaultVisibleGroups: [4],
        //是否支持单击模型高亮，false为单击时模型不高亮
        modelSelectedEffect: false,
        //初始二维/三维状态,默认3D显示
        defaultViewMode: fengmap.FMViewMode.MODE_3D,
        //必要，地图应用名称，通过蜂鸟云后台创建
        appName: '莲花测试',
        //必要，地图应用密钥，通过蜂鸟云后台获取
        key: '86f8810137286b16d865cde082150794'
    };

    //初始化地图对象
    map = new fengmap.FMMap(mapOptions);

    //打开Fengmap服务器的地图数据和主题
    map.openMapById(fmapID, function (error) {
        //打印错误信息
        console.log(error);
    });

    //地图加载完成事件
    map.on('loadComplete', function () {
        //显示自定义控件按钮
        document.getElementById('btnsFloor').style.display = 'block';
        document.getElementById('btnsSwitch').style.display = 'block';

        /**
         * 渲染楼层切换控件
         * map.groupIDs 获取当前模型的所有楼层ID集合
         * */
        // //获取地图楼层数据,循环数据，创建dom
        // var groupIDs = map.groupIDs.reverse();
        // //F1索引值
        // defaultIndex = groupIDs.indexOf(defaultFocusID);

        var listGroups = map.listGroups.reverse();
        //F1索引值
        listGroups.map(function(item,index){
            if(item.gid === defaultFocusID){
                defaultIndex = index;
            }
        });
        console.log('defaultIndex', defaultIndex);
        
        var ulHtml = '';
        listGroups.map(function (item, index) {
            var className = item.gid === defaultFocusID ? "active" : "";
            ulHtml += '<li class="' + className + '" onClick="changeFloor(this,' + item.gid + ', ' +
                index + ')">' + item.gname + '</li>';
        });

        //楼层组件Dom
        var ulDom = document.getElementById('floors');
        ulDom.innerHTML = ulHtml;
    });

    //地图点击事件，需要在地图加载完成之后操作
    map.on('mapClickNode', function (event) {
        console.log(event);
        if (!event.nodeType) {
            if (selectedModel) {
                selectedModel.selected = false;
            }
        }

        //鼠标左右键点击事件
        /*var buttonType = event.domEvent.button;
        var buttonTypeText = '';
        if (buttonType === 0) {
            buttonTypeText = '我是鼠标左键点击';
            console.log('我是鼠标左键点击');
        } else if (buttonType === 2) {
            buttonTypeText = '我是鼠标右键点击';
            console.log('我是鼠标右键点击');
        }*/

        //地图模型
        var target = event.target;
        if (!target) {
            return;
        }

        //筛选点击类型,打印拾取信息
        switch (target.nodeType) {
            //地面模型
            /*case fengmap.FMNodeType.FLOOR:
                if (clickedPOI && event.eventInfo.eventID === eventID) return;
                var info = '拾取对象类型： 地图 \n' +
                    '地图位置坐标：x: ' + event.eventInfo.coord.x + '，y:' + event.eventInfo.coord.y;
                if (selectedModel) {
                    selectedModel.selected = false;
                }
                //弹出信息框
                alert(info);
                break;*/

                //model模型
            case fengmap.FMNodeType.MODEL:
                if (clickedPOI && event.eventInfo.eventID === eventID) {
                    clickedPOI = false;
                    return;
                }
                //过滤类型为墙的model
                if (target.typeID === 300000) {
                    //其他操作
                    return;
                }
                var info = '拾取对象类型： 模型 \n' +
                    'FID：' + target.FID + '\n' +
                    'model中心点坐标：x: ' + target.mapCoord.x + '，y:' + target.mapCoord.y + '\n' +
                    '地图位置坐标：x: ' + event.eventInfo.coord.x + '，y:' + event.eventInfo.coord.y;

                //模型高亮
                if (selectedModel && selectedModel.FID != target.FID) {
                    selectedModel.selected = false;
                }
                target.selected = true;
                selectedModel = target;

                setTimeout(function () {
                    //弹出信息框
                    //alert(info);
                    renderMap(target.FID);
                }, 300);
                break;

                //公共设施、图片标注模型
            /*case fengmap.FMNodeType.FACILITY:
            case fengmap.FMNodeType.IMAGE_MARKER:
                clickedPOI = true;
                eventID = event.eventInfo.eventID;
                var info = '拾取对象类型： 公共设施 \n' +
                    '地图位置坐标：x: ' + event.eventInfo.coord.x + '，y:' + event.eventInfo.coord.y;
                if (selectedModel) {
                    selectedModel.selected = false;
                }
                //弹出信息框
                alert(info);
                break;*/
        }
    });

    //过滤是否可触发点击事件mapClickNode方法的地图元素，返回true为可触发
    map.pickFilterFunction = function (event) {
        //如设置点击墙模型时不高亮
        if (event.typeID === 300000) {
            return false;
        }
        return true;
    };
}

function getShopFloorInfo(fc) {
    var mallCodes;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
            mallCodes = v.moduleCode;
            return false;
        } else {
            mallCodes = $.cookie('mallSelected').split(':::')[1];
        }
    })
    
    var map = {
        "floorCode": fc,
        "mallCodes": mallCodes,
        "userCode": $.cookie('uid')
    };
        
    $.ajax({
        url: $.api.baseLotus+"/api/vshop/lotus/findAllByCondition?page=0&size=100",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                sessionStorage.setItem("coords_"+fc, JSON.stringify(response.data.content) );
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function renderMap(fnid) {
    if(sessionStorage.getItem("coords_"+deFC) && sessionStorage.getItem("coords_"+deFC) != null && sessionStorage.getItem("coords_"+deFC) != '') {
        var store = $.parseJSON(sessionStorage.getItem("coords_"+deFC));
        $.each(store, function(i,v){
            if(v.fnId == fnid){
                GetShopInfo(v.code);
                return false;
            }
        })
   }  
}

function GetShopInfo(sc){
    $.ajax({
        url: $.api.baseLotus+"/api/user/contract/lotus/findAllByMallCodeAndShopCode?mallCode="+$.cookie('mallSelected').split(':::')[1]+"&shopCode="+sc,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                                
                var state = "空铺";
                var shopStateClass = 'badge-danger';
                    
                if(response.data.length > 0){
                    var shop = response.data[response.data.length - 1];
                    var shopStateClass = 'badge-default';
                    switch(shop.vshopLotus.shopStatus){
                        case '0':
                            state = shop.contractName;
                            break;
                        case '1':
                            state = "空铺";
                            shopStateClass = 'badge-danger';
                            break;
                        default:
                            state = "在租";
                            shopStateClass = 'badge-default';
                            break;
                    }
                } else {
                    
                }
                
                $('.figure').text(0);
                
                $('#contractName').html('<span class="badge '+shopStateClass+'">'+state+': '+(response.data.length > 0 ? shop.contractStatus : '未签约')+'</span>');
                $('#contractType').text(response.data.length > 0 ? shop.contractType : '-' );
                $('#startDate').text(response.data.length > 0 ? shop.startDate : '-' );
                $('#endDate').text(response.data.length > 0 ? shop.endDate : '-' );
                $('#tenantName').text(response.data.length > 0 ? shop.tenantName : '-' );
                $('#totalAmount').text(response.data.length > 0 ? numberWithCommas(shop.totalAmount.toFixed(2)) : 0);
                $('#totalAmountDay').text(response.data.length > 0 ? shop.totalAmountDay.toFixed(2) : 0 );
                $('#B011_amount').text(response.data.length > 0 ? numberWithCommas(shop.rentAmount.toFixed(2)) : 0);
                $('#B021_amount').text(response.data.length > 0 ? ((shop.managerAmount == 0 || shop.managerAmount == null) ? 0 : numberWithCommas(shop.managerAmount.toFixed(2))) : 0);
                $('#G021_amount').text(response.data.length > 0 ? ((shop.promotionAmount == 0 || shop.promotionAmount == null) ? 0 : numberWithCommas(shop.promotionAmount.toFixed(2))) : 0);
                if(response.data.length > 0) {
                    if(shop.promotionAmount >= 10){
                        $('#G011_amount').text(numberWithCommas(shop.promotionAmount.toFixed(2)));
                        $('#G021_amount').text(0);
                    } else if (shop.promotionAmount > 0 && shop.promotionAmount < 10){
                        $('#G011_amount').text(0);
                        $('#G021_amount').text(parseFloat(shop.promotionAmount * 100).toFixed(2));
                    } else {
                        $('#G011_amount').text(0);
                        $('#G021_amount').text(0);
                    }
                } else {
                    $('#G011_amount').text(0);
                    $('#G021_amount').text(0);
                }
                
                $('#E02_amount').text(response.data.length > 0 ? ((shop.depositAmount == 0 || shop.depositAmount == null) ? 0 : numberWithCommas(shop.depositAmount.toFixed(2))) : 0);
                $('#D011_amount').text(response.data.length > 0 ? ((shop.deduct == 0 || shop.deduct == null) ? 0 : parseFloat(shop.deduct * 100).toFixed(2)) : 0);
                $('#contactName').text(response.data.length > 0 ? shop.contactName : '-' );
                $('#contactPhone').text(response.data.length > 0 ? shop.contactPhone : '-' );
                $('#modality1').text(response.data.length > 0 ? shop.brandLotus.modality1 : '-' );
                $('#modality2').text(response.data.length > 0 ? shop.brandLotus.modality2 : '-' );
                $('#modality3').text(response.data.length > 0 ? shop.brandLotus.modality3 : '-' );

                $('#shop_detail').css('opacity', 1);
                $('#shop_detail').modal('toggle');

                $('#store_img').html('');
                var coords = $.parseJSON(sessionStorage.getItem("coords_"+deFC));
                if(coords.length > 0) {
                    $.each(coords, function(i,v){
                        if(v.code == sc){
                            if(v.shopBudgetList.length > 0){
                                GetShopBudget(JSON.stringify(v.shopBudgetList));
                            } else {
                                $('#budgetL').html('');
                            }
                    
                            if(v.images != null && v.images.length > 0) {
                                $('#store_img').html('<img src="'+v.images[0].image+'" style="width: 100%;" />');
                            } else {
                                $('#store_img').html('<img src="/views/assets/base/img/content/lotus-admin/noImage.jpg" style="width: 100%;" />');
                            }
                            
                            $('#unitName').text(v.unitName);
                            $('#unitCode').text(v.unitCode);
                            $('#unitArea').text(v.unitArea + 'm²');
                            $('#floorName').text(v.floorName);
                            return false;
                        }

                        if(v.coords != null && v.coords != '' && v.state != 0){
                            $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.code+'" data-full="'+v.shopStatus+'" data-area="'+v.unitArea+'" data-shop-name="'+v.unitName+'" name="'+(v.remarkFirst || '')+'" href=\'javascript: JumpToShopList("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                        }
                    });
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}

function GetShopBudget(b){
    var budget = $.parseJSON(b);
    $.each(budget, function(i,v){
        $('#'+v.termType).text((v.december == 0 || v.december == null) ? 0 : numberWithCommas(v.december.toFixed(2)));
        if($('#'+v.termType+'_amount').text() != '' && $('#'+v.termType+'_amount').text() != 0){
            if(numberWithoutCommas($('#'+v.termType+'_amount').text()) >= numberWithoutCommas($('#'+v.termType).text())){
                $('#'+v.termType+'_grade').html('<div class="green-light"></div>');
            } else {
                $('#'+v.termType+'_grade').html('<div class="red-light"></div>');
            }
        }
    })
}

/**
* 二维/三维模式切换
* fengmap.FMViewMode FMViewMode 模型视图模式枚举
* https://developer.fengmap.com/docs/js/v2.7.1/fengmap.FMViewMode.html
* */
function changeMode(domObj) {
   if (planarFlag) {
       //切换地图为三维模式
       if (map) {
           map.viewMode = fengmap.FMViewMode.MODE_3D;
           domObj.classList.remove('planar');
       }
   } else {
       //切换地图为二维模式
       if (map) {
           map.viewMode = fengmap.FMViewMode.MODE_2D;
           domObj.classList.add('planar');
       }
   }
   //更改状态
   planarFlag = !planarFlag;
}

/**
* 单层/多层楼层切换
* showSingerOrMultiGroup(boolean)，true-多层， false-单层
* */
function changeViews(domObj) {
    if (multiFlag) {
        //切换为单楼层展示
        domObj.classList.remove('multi');
    } else {
        //切换为多楼层展示
        domObj.classList.add('multi');
    }

    //切换地图单层-false/多层展示-true
    multiFlag = !multiFlag;
    //设置单/多楼层切换
    map.showSingerOrMultiGroup(multiFlag);
}

/**
* 楼层切换
* visibleGroupIDs,设置可见的楼层集合Array
* focusGroupID,设置聚焦层
* */
function changeFloor(domObj, floorId, index) {
   if (map) {
       //设置地图显示楼层
       if (multiFlag) {
           //展示全部楼层
           map.visibleGroupIDs = map.groupIDs;
       } else {
           //展示单个楼层
           map.visibleGroupIDs = [floorId];
       }
       //设置地图聚焦楼层
       map.focusGroupID = floorId;
       //修改楼层样式
       //取消选中上一次选中楼层
       domObj.parentNode.children[defaultIndex].classList.remove('active');
       //选中当前楼层
       domObj.classList.add('active');

       //更新选中楼层id及索引
       defaultFocusID = floorId;
       defaultIndex = index;
   }
}