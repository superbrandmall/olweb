$.order = {
    copy: ""
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    ContentOwlcarousel.init();
    
    GetAdInfo();
    
    $('#slide1').swipeSlide({
        autoSwipe:true,//自动切换默认是
        speed:3000,//速度默认4000
        continuousScroll:true,//默认否
        transitionType:'cubic-bezier(0.22, 0.69, 0.72, 0.88)',//过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
        lazyLoad:true,//懒加载默认否
        firstCallback : function(i,sum,me){
            me.find('.dot').children().first().addClass('cur');
        },
        callback : function(i,sum,me){
            me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });
});

function GetAdInfo(){
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
                    if(v.code == getURLParameter('id') && v.coords != null && v.coords != '' && v.state != 0){
                        var src = '/views/assets/base/img/content/mall/1s.jpg';
                        if(v.advertisingImagesWxList != null && v.advertisingImagesWxList.length > 0){
                            src = v.advertisingImagesWxList[0].imagePath;
                        }
                        $('#add_ad').click(function(){
                            getOrderByOrderStates(v.unitCode,v.code,v.size,v.material,v.unitDescChs,v.dailyPrice,src,v.remarkFirst);
                        });
    
                        $('#ad_name').text(v.unitDescChs|| '');
                        $('#ad_type').text(v.typeChs || '');
                        $('#ad_size').text(v.size || '');
                        $('#ad_material').text(v.material || '');
                        $('#ad_floor').text(v.floor || '');
                        $('#ad_price').text('¥'+numberWithCommas(v.dailyPrice) || '');
                        $('#ad_frequency').text('/'+v.remarkFirst || '');
                        $('#ad_desc').text(v.descChs || '');
                        
                        var floor = v.floor.substring(0,1);
                        if(v.unitCode != null) {
                            $('#map').attr({
                                'src': '/views/assets/base/img/content/floor-plan/shanghai-sbm/'+floor+'F.png',
                                'alt': floor+'F',
                                'usemap': '#Map_'+floor+'F_s'
                             });

                            $('#map').parent().append('<map name="Map_'+floor+'F_s" id="Map_'+floor+'F_s"></map>');

                            $('map').append('<area data-key="'+v.unitCode+'" alt="'+v.code+'" href="ad?id='+v.code+'" shape="poly" coords="'+v.coords+'" />');

                            drawShops();
                        }

                        $.each(v.advertisingImagesWxList, function(j,w){
                            $('#slide1 ul').append('<li><a href="javascript:;"><img src='+w.imagePath+' alt=""></a></li>');
                            $('#slide1 .dot').append('<span></span>');
                        });

                        if(v.vr !== null) {
                            $('#vr').attr('src',v.vr);
                        }
                        return false; 
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
    var outTradeNo = '100001' + d.getFullYear() +
                (month<10 ? '0' : '') + month +
                (day<10 ? '0' : '') + day + time
                + '0000' + parseInt(Math.random()*10);

    var exist = 0;
        
    if($.order.copy == '') {
        /* 
         * @订单状态  
         *  待确认订单
         *  预览合同已生成
         *  合同待用印
         *  合同用印中
         *  待付款订单
         *  已完成订单
         *  已关闭订单
         */

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

function drawShops(){
    var areas = $.map($('area'),function(el) {
        if(getURLParameter('id') === $(el).attr('alt')){
            return { 
                key: $(el).attr('data-key'),
                toolTip: "本场地",
                fillColor: 'e12330',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } else {
            return { 
                key: $(el).attr('data-key'),
                fillColor: 'ffff00',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        }
    });

    $('#map').mapster({
        fillColor: 'AFBEDE',
        fillOpacity: 0.8,
        strokeColor: 'ffd62c',
        strokeWidth: 0,
        clickNavigate: false,
        mapKey: 'data-key',
        showToolTip: true,
        areas:  areas,
        onShowToolTip: function () {
            $(".mapster_tooltip").css({
                "font-weight": "bold",
                "color": "#fff",
                "background": "rgba(0,0,0,0.8)",
                "font-size": "26px",
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

var ContentOwlcarousel = function() {
    
    var _initInstances = function() {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 0,
            dots: true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                }
            }
        })
    };

    return {

         //main function to initiate the module
        init: function() {
            
            _initInstances();
        }

    };
}();