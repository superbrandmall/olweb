$.selectedAds = new Array();
$.favorites = new Array();
$.favoritesId = new Array();
$.order = {
    copy: ""
};

var outTradeNo = '';

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    showLoading();
    GetMyFavorites();
    var floorDesc, floor;
    if(getURLParameter('f') && getURLParameter('f') != '') {
        switch (getURLParameter('f')) {
            case '0':
                floorDesc = '负一楼';
                floor = 'B1';
                break;
            case '1':
                floorDesc = '一楼';
                floor = 'L1';
                break;
            case '2':
                floorDesc = '二楼';
                floor = 'L2';
                break;
            case '3':
                floorDesc = '三楼';
                floor = 'L3';
                break;
            case '4':
                floorDesc = '四楼';
                floor = 'L4';
                break;
            case '5':
                floorDesc = '五楼';
                floor = 'L5';
                break;
            case '6':
                floorDesc = '六楼';
                floor = 'L6';
                break;
            case '7':
                floorDesc = '七楼';
                floor = 'L7';
                break;
            case '8':
                floorDesc = '八楼';
                floor = 'L8';
                break;
            case '9':
                floorDesc = '九楼';
                floor = 'L9';
                break;
            default:
                floorDesc = [];
                floor = 'L1';
                break;
        }

        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/shanghai-sbm/'+getURLParameter('f')+'F.png',
            'alt'   : getURLParameter('f')+'F',
            'usemap': '#Map_'+getURLParameter('f')+'F'
        });
        $('map').attr({
            'name'  : 'Map_'+getURLParameter('f')+'F',
            'id'    : '"Map_'+getURLParameter('f')+'F'
        });
        getAdFloorInfo(getURLParameter('f'));
    } else {
        $('#map').attr({
            'src'   : '/views/assets/base/img/content/floor-plan/shanghai-sbm/1F.png',
            'alt'   : '1F',
            'usemap': '#Map_1F'
        });
        $('map').attr({
            'name'  : 'Map_1F',
            'id'    : '"Map_1F'
        });
        
        getAdFloorInfo(1);
    }
    
    $('#showFloorPicker').on('click', function (){
        weui.picker([{
            label: '黄金大道悬挂分屏LED',
            value: '4'
        }, {
            label: '3F入口全包LED环绕屏',
            value: '3'
        }, {
            label: '户外墙面广告',
            value: '1'
        }], {
            onChange: function (result) {
            },
            onConfirm: function (result) {
                $.cookie('floor',result[0].value);
                window.location.href = '/v2/advertising?f='+result[0].value+'&type=ads';
            },
            title: '请选择广告位所在楼层'
        });
    });
    
    $('#showFloorPicker p').text('已选择'+floorDesc);
});

function getAdFloorInfo(fl) {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/advertising/base/findAllByStoreCode?storeCode=OLMALL180917000003",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                sessionStorage.setItem("ads", JSON.stringify(response.data) );
                $.each(response.data, function(i,v){
                    if(v.remarkSecond == fl && v.coords != null && v.coords != '' && v.state != 0){
                        $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.code+'" href=\'javascript: GetAdInfo("'+v.code+'");\' shape="poly" coords="'+v.coords+'" />'); 
                    }
                });
                
                if(getURLParameter('f') && getURLParameter('id')){
                    renderAdListFromDraw(getURLParameter('id'));
                    drawAdsFromList(getURLParameter('id'));
                } else {
                    drawAds();
                    renderAdList();
                }
                
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
    
function drawAds(){
    var areas = $.map($('area'),function(el) {
        return { 
            key: $(el).attr('data-key'),
            fillColor: 'ffff00',
            fillOpacity: 1,
            stroke: false,
            selected: true 
        }; 
    });
    
    var xOffset;
    var yOffset;

    $('#map').mapster({
        fillColor: 'AFBEDE',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: false,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "bold",
                "color": "#a3aec2",
                "background": "rgba(28,34,56,1)",
                "font-size": "14px",
                "width": "auto"
            });

            $("area").on("mouseenter",  function (data) {
               xOffset = data.pageX;
               yOffset = data.pageY;
               $(".mapster_tooltip").css("left", xOffset);
               $(".mapster_tooltip").css("top", yOffset);
            });
        }
    });
}

function drawAdsFromList(sc){
    var areas = $.map($('area'),function(el) {
        if($(el).attr('alt') == sc){
            return { 
                key: $(el).attr('data-key'),
                fillColor: 'e12330',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } else if($.inArray($(el).attr('alt'),$.selectedAds) != -1) {
            return { 
                key: $(el).attr('data-key'),
                fillColor: 'ffff00',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } 
    });
    
    var xOffset;
    var yOffset;

    $('#map').mapster({
        fillColor: 'AFBEDE',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: true,
        mapKey: 'data-key',
        showToolTip: false,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "bold",
                "color": "#a3aec2",
                "background": "rgba(28,34,56,1)",
                "font-size": "22px",
                "width": "auto"
            });

            $("area").on("mouseenter",  function (data) {
               xOffset = data.pageX;
               yOffset = data.pageY;
               $(".mapster_tooltip").css("left", xOffset);
               $(".mapster_tooltip").css("top", yOffset);
            });
        }
    });
}

function renderAdList(){
    $('.weui-panel__bd').html('');
    
    $.selectedAds = [];
    
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(i,v){
        if(v.remarkSecond == getURLParameter('f') && v.coords != null && v.coords != '' && v.state != 0 && $.inArray(v.code, $.selectedAds) == -1){
            $.selectedAds.push(v.code);
            var src = '/views/assets/base/img/content/mall/1s.jpg';
            if(v.advertisingImagesWxList != null && v.advertisingImagesWxList.length > 0){
                src = v.advertisingImagesWxList[0].imagePath;
            }
            
            var fav = '<a href=\'javascript: AddToFavorite("'+v.buildingCode+'","'+v.code+'","'+v.storeCode+'","'+v.unitCode+'");\' style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">加入关注</a>';
            if($.inArray(v.code, $.favorites) != -1){
                fav = '<a href=\'javascript: RemoveFavorite("'+$.favoritesId[$.inArray(v.code, $.favorites)]+'","'+v.buildingCode+'","'+v.code+'","'+v.storeCode+'","'+v.unitCode+'");\' style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">取消关注</a>';
            }

            $('.weui-panel__bd').append('<div onclick="window.location=#" class="weui-media-box weui-media-box_appmsg" style="background-color: #fff; padding: 15px; margin: 20px;">\n\
<div class="weui-media-box__bd" onclick=\'javascript: drawAdsFromList("'+v.code+'");\'>\n\
<div style="position: relative; float: left; width: 142px;">\n\
<a href=\'javascript: showGallery("'+src+'");\'><img class="weui-media-box__thumb" src="'+src+'" alt="" style="height: 84px; width: 126px;"></a>\n\
<div style="padding: 5px 0;">\n\
<a href=\'javascript: showVR("'+v.vr+'");\' style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">VR</a>\n\
'+fav+'\n\
<a href="/v2/ad?id='+v.code+'" style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">广告位详情</a>\n\
<a href=\'javascript: getOrderByOrderStates("'+v.unitCode+'","'+v.code+'","'+v.size+'","'+v.material+'","'+v.unitDescChs+'","'+v.dailyPrice+'","'+src+'","'+v.remarkFirst+'");\' style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">加入购物车</a>\n\
</div>\n\
</div>\n\
<div style="margin-left: 142px;">\n\
<small>'+v.unitDescChs+'</small>\n\
<p class="weui-media-box__desc" style="-webkit-line-clamp: 5;">'+v.descChs+'</p>\n\
<p class="weui-media-box__desc">价格: ¥'+numberWithCommas(v.dailyPrice)+'<small>/'+v.remarkFirst+'</small></p>\n\
</div>\n\
</div>\n\
</div>');
        }
    });
}

function showVR(url){
    $("#vr_viewer iframe").attr('src',url);
    $("#vr_viewer").show();
}

function renderAdListFromDraw(sc){
    $('.weui-panel__bd').html('');
    
    $.selectedAds = [];
    
    $.each($.parseJSON(sessionStorage.getItem("ads")), function(i,v){
        if(v.code == sc && $.inArray(v.code, $.selectedAds) == -1){
            $.selectedAds.push(v.code);
            
            var src = '/views/assets/base/img/content/mall/1s.jpg';
            if(v.advertisingImagesWxList != null && v.advertisingImagesWxList.length > 0){
                src = v.advertisingImagesWxList[0].imagePath;
            }
            
            var fav = '<a href=\'javascript: AddToFavorite("'+v.buildingCode+'","'+v.code+'","'+v.storeCode+'","'+v.unitCode+'");\' style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">加入关注</a>';
            if($.inArray(v.code, $.favorites) != -1){
                fav = '<a href=\'javascript: RemoveFavorite("'+$.favoritesId[$.inArray(v.code, $.favorites)]+'","'+v.buildingCode+'","'+v.code+'","'+v.storeCode+'","'+v.unitCode+'");\' style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">取消关注</a>';
            }

            $('.weui-panel__bd').append('<div onclick="window.location=#" class="weui-media-box weui-media-box_appmsg" style="background-color: #fff; padding: 15px; margin: 20px;">\n\
<div class="weui-media-box__bd" onclick=\'javascript: drawAdsFromList("'+v.code+'");\'>\n\
<div style="position: relative; float: left; width: 142px;">\n\
<a href=\'javascript: showGallery("'+src+'");\'><img class="weui-media-box__thumb" src="'+src+'" alt="" style="height: 84px; width: 126px;"></a>\n\
<div style="padding: 5px 0;">\n\
<a href=\'javascript: showVR("'+v.vr+'");\' style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">VR</a>\n\
'+fav+'\n\
<a href="/v2/ad?id='+v.code+'" style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">广告位详情</a>\n\
<a href=\'javascript: getOrderByOrderStates("'+v.unitCode+'","'+v.code+'","'+v.size+'","'+v.material+'","'+v.unitDescChs+'","'+v.dailyPrice+'","'+src+'","'+v.remarkFirst+'");\' style="display: inline-block; font-size: 12px; color: #000; text-align: center; width: 60px;">加入购物车</a>\n\
</div>\n\
</div>\n\
<div style="margin-left: 142px;">\n\
<small>'+v.unitDescChs+'</small>\n\
<p class="weui-media-box__desc" style="-webkit-line-clamp: 5;">'+v.descChs+'</p>\n\
<p class="weui-media-box__desc">价格: ¥'+numberWithCommas(v.dailyPrice)+'<small>/'+v.remarkFirst+'</small></p>\n\
</div>\n\
</div>\n\
</div>');
        }
        
    });
}

function GetAdInfo(sc){
    drawAdsFromList(sc);
    renderAdListFromDraw(sc);
}

function GetMyFavorites(){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                $.each(response.data, function(i,v){
                    if(v.remarkSecond == 1){
                        $.favorites.push(v.remarkFirst);
                        $.favoritesId.push(v.id);
                    }
                });
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function AddToFavorite(bc,c,sc,uc){
    showLoading();
    var map = {
        "buildingCode": bc,
        "code": "",
        "favoritesDate": "",
        "mobileNo": $.cookie('uid'),
        "name": "",
        "remarkFifth": "",
        "remarkFirst": c,
        "remarkFourth": "",
        "remarkSecond": 1,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "advertising",
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                var $toast = $('#js_toast_1');
                $('.page.cell').removeClass('slideIn');

                $toast.fadeIn(100);
                setTimeout(function () {
                    location.reload();
                }, 2000);
    
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function RemoveFavorite(id,bc,c,sc,uc){
    showLoading();
    var map = {
        "id": id,
        "buildingCode": bc,
        "code": "",
        "favoritesDate": "",
        "mobileNo": $.cookie('uid'),
        "name": "",
        "remarkFifth": "",
        "remarkFirst": c,
        "remarkFourth": "",
        "remarkSecond": 0,
        "remarkThird": "",
        "storeCode": sc,
        "unitCode": uc,
        "unitType": "advertising"
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                var $toast = $('#js_toast_2');
                $('.page.cell').removeClass('slideIn');

                $toast.fadeIn(100);
                setTimeout(function () {
                    location.reload();
                }, 2000);
    
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getOrderByOrderStates(ut,sc,sz,sp,ud,pr,img,un) {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOrderStates?mobileNo="+$.cookie('uid')+"&orderStates=待确认订单",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(response.data != '') {
                    $.each(response.data, function(i,v){
                        if(v.remarkSecond == 'advertising'){
                            outTradeNo = v.code;
                            $.order.copy = JSON.stringify(response.data[i]);
                            return false;
                        }
                    });
                }
                
                AddtoCart(ut,sc,sz,sp,ud,pr,img,un);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function AddtoCart(ut,sc,sz,sp,ud,pr,img,un){
    var unit = ut;
    var shopCode = sc;
    var size = sz;
    var spec = sp;
    var unitDesc = ud;
    var dailyPrice = pr;
    var firstImage = img;
    var unitName = un;

    var exist = 0;
        
    if($.order.copy == '') {
        /* 
         * @订单状态  
        *  待确认订单
        *  合同已生成
        *  合同用印中
        *  待付款订单
        *  已完成订单
        *  已关闭订单
         */

        outTradeNo = '100001' + d.getFullYear() +
                (month<10 ? '0' : '') + month +
                (day<10 ? '0' : '') + day + time
                + '0000' + parseInt(Math.random()*10);
        
        var map = {
            "amount": 100000,
            "appid": "test",
            "brandId": "",
            "brandName": $.cookie('brand_1'),
            "code": unit,
            "contractInfos": [
              {
                "amount": "",
                "bizScope": "testss",
                "breachAmount": "",
                "code": unit,
                "depositAmount": "",
                "electricBillFlag": "1",
                "endDate": "",
                "enterDate": "",
                "isCleaning": "1",
                "isSecurity": "1",
                "isService": "1",
                "mobileNo": $.cookie('uid'),
                "name": "test name",
                "num": 1,
                "openDate": "",
                "orgCode": "100001",
                "otherFlag": "",
                "outTradeNo": outTradeNo,
                "remarkFifth": "",
                "remarkFirst": firstImage,
                "remarkFourth": "",
                "remarkSecond": unitName,
                "remarkThird": "",
                "salesFlag": "1",
                "serviceDepositAmount": 3000,
                "size": size, //广告尺寸规格
                "spec": spec,
                "startDate": "",
                "unitCode": unit,
                "unitDesc": unitDesc,
                "unitId": "sfsdfsfasfsfasdfasdf",
                "userId": "10000101",
                "vipFlag": "1",
                "wxCardFlag": "1",
                "area": 1 //广告默认传1
              }
            ],
            "contractNo": "",
            "contractTermInfos": [
              {
                "amount": (dailyPrice*1.06).toFixed(2),
                "code": "1",
                "endDate": "",
                "name": unitDesc,
                "orgCode": "100001",
                "outTradeNo": outTradeNo,
                "rentAmount": dailyPrice,
                "startDate": "",
                "taxAmount": dailyPrice,
                "termType": "B011",
                "termTypeName": "固定租金",
                "unitCode": unit,
                "unitId": "sfsdfsfasfsfasdfasdf",
                "area": 1,
                "remarkFirst": shopCode
              }
            ],
            "contractType": "R4",//R1租赁 R4广告 R5场地
            "mobileNo": $.cookie('uid'),
            "name": "wechatol",
            "orderStates": "待确认订单", //订单状态
            "orgCode": "100001",
            "outTradeNo": outTradeNo,
            "payStates": "未支付", //支付状态
            "tenantId": "海鼎公司uuid",
            "tenantName": "公司名",
            "tenantNo": "海鼎公司编号",
            "tenantOrg": "G12321312312223131", //uscc
            "userId": "sfsdfsfasfsfasdfasdf",
            "remarkFirst": shopCode,
            "remarkSecond": 'advertising'
        };
    } else {
        var map = $.parseJSON($.order.copy);
        $.each(map.contractTermInfos, function(i,v){
            if(v.remarkFirst == shopCode){
                exist = 1;
                findUserCompanyByMobileNo(shopCode,outTradeNo);
            }
        });
        
        if(exist == 0){
            var newInfo = $.extend({}, map.contractInfos[0]);
            newInfo.id = '';
            newInfo.code = unit;
            newInfo.size = size;
            newInfo.spec = spec;
            newInfo.unitCode = unit;
            newInfo.unitDesc = unitDesc;
            newInfo.remarkFirst = firstImage;
            newInfo.remarkSecond = unitName;
            map.contractInfos.push(newInfo);
            
            var newTerm = $.extend({}, map.contractTermInfos[0]);
            newTerm.id = '';
            newTerm.unitCode = unit;
            newTerm.remarkFirst = shopCode;
            newTerm.name = unitDesc;
            newTerm.taxAmount = dailyPrice;
            newTerm.amount = (dailyPrice*1.06).toFixed(2);
            map.contractTermInfos.push(newTerm);
        }
    }
    
    if(exist != 1){
        $.ajax({
            url: $.api.baseNew+"/comm-wechatol/api/order/saveOrUpdate",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    hideLoading();
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }
                    findUserCompanyByMobileNo(shopCode,outTradeNo);
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function findUserCompanyByMobileNo(sc,outTradeNo){
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/company/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    if(response.data[0].name != '' && response.data[0].uscc != ''){
                        window.location.href = '/v2/advertising-shopping-cart?id='+sc+'&trade='+outTradeNo;
                    } else {
                        window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=ads';
                    }
                } else {
                    window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=ads';
                }
            }
        }
    })
}