$.favorites = new Array();
$.favoritesId = new Array();
var unitCodes = ["02FL035","03FL084","03FL001","04FL005","04FL008","05FL123","05FL117","07FL069","08FL012","08FL015"];

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$(document).ready(function(){
    getMyFavorites();
    getShopInfo();
    
    $(function(){
        $('.collapse .js-category-1').click(function(){
            $parent = $(this).parent('li');
            if($parent.hasClass('js-show')){
                $parent.removeClass('js-show');
            }else{
                $parent.siblings().removeClass('js-show');
                $parent.addClass('js-show');
            }
            $('.shop-collapse li').animate({
                marginTop: '-25px'
            }, 200);
        });
        
        $('.collapse .js-category-2').click(function(){
            $parent = $(this).parent('li');
            if($parent.hasClass('js-show')){
                $parent.removeClass('js-show');
                $parent.animate({
                    marginTop: '-25px'
                }, 200);
            }else{
                $parent.siblings().removeClass('js-show');
                $parent.addClass('js-show');
                $parent.animate({
                    marginTop: '-110px'
                }, 200);
            }
        });
        
        $('.collapse .js-category-3').click(function(){
            $parent = $(this).parent('li');
            if($parent.hasClass('js-show')){
                $parent.removeClass('js-show');
                $parent.animate({
                    marginTop: '-25px'
                }, 200);
            }else{
                $parent.siblings().removeClass('js-show');
                $parent.addClass('js-show');
                $parent.animate({
                    marginTop: '-140px'
                }, 200);
            }
        });

    });
});

function getShopInfo(){
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
                
                if(response.data.code == shopCode){
                    getShopsMoreInfo(response.data.unit,response.data.shopName,response.data.area,response.data.shopState,response.data.daysBeforeContractExpire);
                        
                    $('#shopName').text(response.data.shopName);
                    $('#area').text(response.data.area);
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

function getShopsMoreInfo(u,sn,a,ss,dbce) {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/shop/base/findAllByStoreCode?storeCode=OLMALL180917000003",
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
                
                $.each(response.data, function(i,v){
                    if(u == v.unitCode){
                        $('#businessFormatChs').text(v.businessFormatChs);
                        $('#desc').text(v.desc);
                        $('#settleDate').text(v.settleDate);
                        $('#openDate').text(v.openDate);
                        var settle_date, opening_date;
                        
                        if(ss === 1 || ss === 3) { // 空铺
                            settle_date = IncrDates(date,15);
                        } else { // 非空铺
                            settle_date = IncrDates(date,(dbce));
                        }

                        if(v.freeOfGroundRent != ''){
                            opening_date = IncrDates(settle_date,parseInt(v.freeOfGroundRent)) || '';
                        }
                        
                        $('#vr').click(function(){
                            //showVR(v.remarkFirst);
                            showVR("https://720yun.com/t/41vksmd9r7b#scene_id=49271840");
                        })
                        
                        $('#engineering_video').click(function(){
                            showVideo("https://www.xinpianchang.com/a10824429");
                        })
                        
                        var index = $.inArray(getURLParameter('id'), $.favorites);
                        if(index >= 0){
                            $('#favourite').html('<i class="fa fa-heart" aria-hidden="true" style="color: #f60;"></i><br>取消收藏');
                        }
                        
                        $('#favourite').click(function(){
                            if(index >= 0){
                                removeFavorite($.favoritesId[$.inArray(getURLParameter('id'), $.favorites)],v.buildingCode,getURLParameter('id'),v.storeCode,u);
                            } else {
                                addToFavorite(v.buildingCode,getURLParameter('id'),v.storeCode,u);
                            }
                        })
                        
                        
                        $('#price').click(function(){
                            askPrice(u,getURLParameter('id'),settle_date,opening_date,sn,a);
                        })
                    }
                })
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getMyFavorites(){
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

function addToFavorite(bc,c,sc,uc){
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
        "unitType": "leasing",
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
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

function removeFavorite(id,bc,c,sc,uc){
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
        "unitType": "leasing"
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/favorites/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
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

function askPrice(ut,sc,ed,od,ud,a){
    showLoading();
    var unit = ut;
    var enterDate = ed;
    var openDate = od;
    var unitDesc = ud;
    var area = a;
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
            "enterDate": enterDate,
            "isCleaning": "1",
            "isSecurity": "1",
            "isService": "1",
            "mobileNo": $.cookie('uid'),
            "name": "test name",
            "num": 1,
            "openDate": openDate,
            "orgCode": "100001",
            "otherFlag": "",
            "outTradeNo": outTradeNo,
            "remarkFifth": "",
            "remarkFirst": "",
            "remarkFourth": "",
            "remarkSecond": "",
            "remarkThird": "",
            "salesFlag": "1",
            "serviceDepositAmount": 3000,
            "size": "", //广告尺寸规格
            "spec": "",
            "startDate": openDate,
            "unitCode": unit,
            "unitDesc": unitDesc,
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
            "startDate": openDate,
            "taxAmount": "",
            "termType": "B011",
            "termTypeName": "固定租金",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area 
          },
          {
            "amount": "",
            "code": "1",
            "endDate": "",
            "name": "",
            "orgCode": "100001",
            "outTradeNo": outTradeNo,
            "rentAmount": "",
            "startDate": openDate,
            "taxAmount": "",
            "termType": "B021",
            "termTypeName": "物业管理费",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area
          },
          {
            "amount": 0.0159,
            "code": "1",
            "endDate": "",
            "name": "",
            "orgCode": "100001",
            "outTradeNo": outTradeNo,
            "startDate": openDate,
            "taxAmount": 0.015,
            "termType": "G021",
            "termTypeName": "推广费",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area
          },
          {
            "amount": "",
            "code": "1",
            "endDate": "",
            "name": "",
            "orgCode": "100001",
            "outTradeNo": outTradeNo, //订单号需动态调用
            "rentAmount": "",
            "startDate": openDate,
            "taxAmount": "",
            "termType": "D011",
            "termTypeName": "提成扣率",
            "unitCode": unit,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": area
          }
        ],
        "contractType": "R1",//R1租赁 R4广告 R5场地
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
        "remarkFirst": sc,
        "remarkSecond": 'leasing'
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
                findUserCompanyByMobileNo(sc,outTradeNo);
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
                        window.location.href = '/v2/price?id='+sc+'&trade='+outTradeNo;
                    } else {
                        window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=leasing';
                    }
                } else {
                    window.location.href = '/v2/company-info?id='+sc+'&trade='+outTradeNo+'&type=leasing';
                }
            }
        }
    })
}