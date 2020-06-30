var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    ContentOwlcarousel.init();
    
    GetShopInfo();
    
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

function GetShopInfo(){
    var shopCode = getURLParameter('id') || null;
    var userCode = $.cookie('uid');
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shop/"+shopCode+"?userCode="+userCode+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            showLoading();
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
                
                $('#choose_event').click(function(){
                    AddtoCart(response.data.hdCode,response.data.code,response.data.shopName,response.data.area);
                });
                        
                $('#room_name').text(response.data.shopName || '-');
                $('#area').text(response.data.area+'m²' || '-');
                $('#area_spesifc').text(response.data.remark_1 || '-');
                $('#height').text(response.data.remark_2 || '-');
                $('#electricity').text(response.data.remark_3 || '-');
                $('#wire_towing').text(response.data.remark_4 || '-');
                $('#elevator_size').text(response.data.remark_5 || '-');
                $('#network_type').text(response.data.remark_6 || '-');
                
                var floorName;
                $.each($.parseJSON(sessionStorage.getItem("floors")), function(i,v) {
                    if(v.floorCode == response.data.floorCode) {
                        floorName = v.description;
                        return false;
                    }
                });
                
                $('#floor').text(floorName || '-');              

                if(response.data.unit != null) {
                    GetMap(floorName,response.data.mallCode);
                }
                
                $.each(response.data.images, function(i,v){
                    $('#slide1 ul').append('<li><a href="javascript:;"><img src='+v.image+' alt=""></a></li>');
                    $('#slide1 .dot').append('<span></span>');
                });
                
                if(response.data.vr !== null) {
                    $('#vr').attr('src','/'+response.data.vr);
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

function AddtoCart(uc,sc,un,ar){
    var unit = uc;
    var shopCode = sc;
    var unitName = un;
    var area = ar;
    var outTradeNo = '100001' + d.getFullYear() +
                (month<10 ? '0' : '') + month +
                (day<10 ? '0' : '') + day + time
                + '0000' + parseInt(Math.random()*10);

    /* 
     * @订单状态  
     *  待确认订单
     *  合同已生成
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
            "remarkFirst": "",
            "remarkFourth": "",
            "remarkSecond": unitName,
            "remarkThird": "",
            "salesFlag": "1",
            "serviceDepositAmount": 3000,
            "size": "", //广告尺寸规格
            "spec": "",
            "startDate": "",
            "unitCode": unit,
            "unitDesc": unitName,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "userId": "10000101",
            "vipFlag": "1",
            "wxCardFlag": "1",
            "area": area //广告默认传1
          }
        ],
        "contractNo": "",
        "contractTermInfos": [
          {
            "amount": "",
            "code": "1",
            "endDate": "",
            "name": "",
            "orgCode": "100001",
            "outTradeNo": outTradeNo,
            "rentAmount": "",
            "startDate": "",
            "taxAmount": "",
            "termType": "B011",
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area
          }
        ],
        "contractType": "R5",//R1租赁 R4广告 R5场地
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
        "remarkSecond": 'events'
    };
    
    
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
                        window.location.href = '/v2/choose-event?id='+sc+'&trade='+outTradeNo;
                    } else {
                        window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=events';
                    }
                } else {
                    window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=events';
                }
            }
        }
    })
}


function GetMap(fn,mc){
    var fc;
    switch (fn) {
        case '十楼':
            fc = '10';
            break;
        case '九楼':
            fc = '9';
            break;
        case '八楼':
            fc = '8';
            break;
        case '七楼':
            fc = '7';
            break;    
        case '六楼':
            fc = '6';
            break;
        case '五楼':
            fc = '5';
            break;
        case '四楼':
            fc = '4';
            break;
        case '三楼':
            fc = '3';
            break;
        case '二楼':
            fc = '2';
            break;
        case '一楼':
            fc = '1';
            break;
        case '负一楼':
            fc = '0';
            break;
        default:
            fc = '1';
            break;
    }
    
    $('#map').attr({
        'src': '/views/assets/base/img/content/floor-plan/shanghai-sbm/'+fc+'F.png',
        'alt': fc+'F',
        'usemap': '#Map_'+fc+'F_s'
     });
     
    $('#map').parent().append('<map name="Map_'+fc+'F_s" id="Map_'+fc+'F_s"></map>');
    
    getCoords(mc,fn);
}

function getCoords(mc,fn) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/base/coords/"+mc+"/"+fn+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                $.each(response.data, function(i,v){
                    if(v.state != 0 && v.coords != null && v.coords != ''){
                        if(v.subType == '固定场地' || v.subType == '临时场地'){
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" name="'+v.brandName+'" href="event?id='+v.code+'" shape="poly" coords="'+v.coords+'" />');
                        } else {
                            $('map').append('<area data-key="'+v.unit+'" alt="'+v.code+'" data-full="'+v.shopState+'" data-modality="'+v.modality+'" name="'+v.brandName+'" href="#!" shape="poly" coords="'+v.coords+'" />');                           
                        }
                    }
                });
                
                drawShops();
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function drawShops(){
    var areas = $.map($('area'),function(el) {
        if(getURLParameter('id') === $(el).attr('alt')){
            return { 
                key: $(el).attr('data-key'),
                toolTip: "本场地",
                fillColor: 'c34343',
                fillOpacity: 1,
                stroke: false,
                selected: true 
            };
        } else {
            if($(el).attr('data-full') != 1 && $(el).attr('data-full') != 3){
                return { 
                    key: $(el).attr('data-key'),
                    toolTip: $(el).attr('name'),
                    fillColor: 'cdcdcd'
                };
            }
            
        }
    });

    $('#map').mapster({
        fillColor: 'c9ae89',
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