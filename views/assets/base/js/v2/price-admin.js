$.favorites = new Array();
$.favoritesId = new Array();
$.order = {
    copy: "",
    building: "",
    mall: "",
    unit: ""
};

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
    getOrderByTradeNO();
    
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
                    marginTop: '-110px'
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
                    $.cookie('area',response.data.area);
                    
                    $.order.building = response.data.buildingCode;
                    $.order.mall = response.data.mallCode;
                    $.order.unit = response.data.unit;
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
                
                var settleDate = '';
                var openDate = '';
                var freeOfGroundRent = '';
                var deposit = '';
                var rentAmount = '';
                var taxAmount = '';
                var deductionTaxAmount = '';
                var propertyMaintenance = '';
                var promotionRate = '';

                $.each(response.data, function(i,v){
                    if(u == v.unitCode){
                        $('#businessFormatChs').text(v.businessFormatChs);
                        $('#desc').text(v.desc);
                        $('#settleDate').text(v.settleDate);
                        $.cookie('settleDate',v.settleDate);
                        $('#openDate').text(v.openDate);
                        $.cookie('openDate',v.openDate);
                        $('#freeOfGroundRent').text(v.freeOfGroundRent);
                        $('#deposit').text(v.deposit);
                        $.cookie('deposit',v.deposit);
                        
                        for(var x = 1; x <= v.contractLength; x++){
                            $.each(v.shopRentWxs, function(k,y){
                                
                                if(y.code == x && y.termTypeName == "固定租金"){
                                    rentAmount = y.rentAmount;
                                    $.cookie('rentAmount_'+x, y.rentAmount);
                                    taxAmount = y.taxAmount;
                                    $.cookie('taxAmount_'+x, y.taxAmount);
                                    $.cookie('amount_'+x, y.amount);
                                    $.cookie('termStartDate_'+x, y.startDate);
                                    $.cookie('termEndDate_'+x, y.endDate);
                                }
                                if(y.code == x && y.termTypeName == "提成扣率"){
                                    deductionTaxAmount = y.taxAmount;
                                    $.cookie('taxDeductionTaxAmount_'+x, y.taxAmount);
                                    $.cookie('deductionTaxAmount_'+x, y.amount);
                                }
                                if(y.code == x && y.termTypeName == "物业管理费"){
                                    propertyMaintenance = y.taxAmount;
                                    $.cookie('taxPropertyMaintenance_'+x, y.taxAmount);
                                    $.cookie('propertyMaintenance_'+x, y.amount);
                                }
                                if(y.code == x && y.termTypeName == "推广费"){
                                    promotionRate = y.taxAmount;
                                    $.cookie('taxPromotionRate_'+x, y.taxAmount);
                                    $.cookie('promotionRate_'+x, y.amount);
                                }
                            })
                            
                            $('#shopRent').append('<tr>\n\
<td>第'+x+'年</td>\n\
<td>¥'+rentAmount+'/m²</td>\n\
<td>¥'+taxAmount+'</td>\n\
<td>'+deductionTaxAmount+'%</td></tr>');
                        }
                        
                        $('#rentAmount').text($.cookie('rentAmount_1'));
                        $('#propertyMaintenance').text(propertyMaintenance);
                        $('#promotionRate').text(promotionRate);
                        
                        if(ss === 1 || ss === 3) { // 空铺
                            settleDate = IncrDates(date,15);
                        } else { // 非空铺
                            settleDate = IncrDates(date,(dbce+1));
                        }

                        if(v.freeOfGroundRent != ''){
                            openDate = IncrDates(settleDate,parseInt(v.freeOfGroundRent)) || '';
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
                            $('#favourite').html('<i class="fa fa-heart" aria-hidden="true"></i><br>取消收藏');
                        }
                        
                        $('#favourite').click(function(){
                            if(index >= 0){
                                removeFavorite($.favoritesId[$.inArray(getURLParameter('id'), $.favorites)],v.buildingCode,getURLParameter('id'),v.storeCode,u);
                            } else {
                                addToFavorite(v.buildingCode,getURLParameter('id'),v.storeCode,u);
                            }
                        })
                        
                        
                        $('#price').click(function(){
                            askPrice(u,getURLParameter('id'),settleDate,openDate,sn,a);
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

function getOrderByTradeNO() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/findAllByMobileNoAndOutTradeNo?mobileNo="+$.cookie('uid')+"&outTradeNo="+getURLParameter('trade'),
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
                $.order.copy = JSON.stringify(response.data[0]);
                
                $('#confirm_price').click(function(){
                    saveOrder();
                });
                
                $('#negotiate').click(function(){
                    window.location.href = '/v2/negotiation?code='+getURLParameter('id')+'&unit='+$.order.unit+'&building='+$.order.building+'&mall='+$.order.mall+'&id='+response.data[0].id;
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

function saveOrder(){
    var order = $.parseJSON($.order.copy);
    order.mobileNo = $.cookie('uid');
    order.brandName = $.cookie('brand_1');
    order.remarkFirst = getURLParameter('id');

    $.each(order.contractInfos, function(i,v){
        v.depositAmount = $.cookie('deposit');
        v.enterDate = $.cookie('settleDate');
        v.openDate = $.cookie('openDate');
        v.startDate = $.cookie('openDate');
        v.unitDesc = $.cookie('shopNo');
    });

    $.each(order.contractTermInfos, function(i,v){
        if(v.termTypeName == '固定租金' && v.code == 1){
            v.endDate = $.cookie('termEndDate_1');
            v.amount = $.cookie('amount_1'),
            v.rentAmount = $.cookie('rentAmount_1');
            v.taxAmount = $.cookie('taxAmount_1');
            v.startDate = $.cookie('termStartDate_1');
            v.area = $.cookie('area');
        } else if(v.termTypeName == '物业管理费' && v.code == 1){
            v.endDate = $.cookie('termEndDate_1');
            v.amount = $.cookie('propertyMaintenance_1');
            v.taxAmount = $.cookie('taxPropertyMaintenance_1');
            v.startDate = $.cookie('termStartDate_1');
            v.area = $.cookie('area');
        } else if(v.termTypeName == '推广费' && v.code == 1){
            v.endDate = $.cookie('termEndDate_1');
            v.amount = $.cookie('promotionRate_1');
            v.taxAmount = $.cookie('taxPromotionRate_1');
            v.startDate = $.cookie('termStartDate_1');
            v.area = $.cookie('area');
        } else if(v.termTypeName == '提成扣率' && v.code == 1){
            v.endDate = $.cookie('termEndDate_1');
            v.amount = $.cookie('deductionTaxAmount_1');
            v.taxAmount = $.cookie('taxDeductionTaxAmount_1');
            v.startDate = $.cookie('termStartDate_1');
            v.area = $.cookie('area');
        }

    });
    
    if($.cookie('contractLength') > 1) {
        var secondYearPrice = {
            "amount": $.cookie('amount_2'),
            "code": "2",
            "endDate": $.cookie('termEndDate_2'),
            "name": "",
            "orgCode": "100001",
            "outTradeNo": order.outTradeNo,
            "rentAmount": $.cookie('rentAmount_2'),
            "startDate": $.cookie('termStartDate_2'),
            "taxAmount": $.cookie('taxAmount_2'),
            "termType": "B011",
            "termTypeName": "固定租金",
            "unitCode": order.contractTermInfos[0].unitCode,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0
        }

        var secondYearMaintenance = {
            "amount": $.cookie('propertyMaintenance_2'),
            "code": "2",
            "endDate": $.cookie('termEndDate_2'),
            "name": "",
            "orgCode": "100001",
            "outTradeNo": order.outTradeNo,
            "rentAmount": "",
            "startDate": $.cookie('termStartDate_2'),
            "taxAmount": $.cookie('taxPropertyMaintenance_2'),
            "termType": "B021",
            "termTypeName": "物业管理费",
            "unitCode": order.contractTermInfos[0].unitCode,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0
        }

        var secondYearPromotion = {
            "amount": $.cookie('promotionRate_2'),
            "code": "2",
            "endDate": $.cookie('termEndDate_2'),
            "name": "",
            "orgCode": "100001",
            "outTradeNo": order.outTradeNo,
            "rentAmount": "",
            "startDate": $.cookie('termStartDate_2'),
            "taxAmount": $.cookie('taxPromotionRate_2'),
            "termType": "G021",
            "termTypeName": "推广费",
            "unitCode": order.contractTermInfos[0].unitCode,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0
        }

        var secondYearRate = {
            "amount": $.cookie('deductionTaxAmount_2'),
            "code": "2",
            "endDate": $.cookie('termEndDate_2'),
            "name": "",
            "orgCode": "100001",
            "outTradeNo": order.outTradeNo,
            "rentAmount": "",
            "startDate": $.cookie('termStartDate_2'),
            "taxAmount": $.cookie('taxDeductionTaxAmount_2'),
            "termType": "D011",
            "termTypeName": "提成扣率",
            "unitCode": order.contractTermInfos[0].unitCode,
            "unitId": "sfsdfsfasfsfasdfasdf",
            "area": $.cookie('area'),
            "id": 0
        }
        
        if(order.contractTermInfos.length == 4 && order.orderStates == '待确认订单'){
            order.contractTermInfos.push(secondYearPrice,secondYearMaintenance,secondYearPromotion,secondYearRate);
        }
        
        if($.cookie('contractLength') > 2) {
            var thirdYearPrice = {
                "amount": $.cookie('amount_3'),
                "code": "3",
                "endDate": $.cookie('termEndDate_3'),
                "name": "",
                "orgCode": "100001",
                "outTradeNo": order.outTradeNo,
                "rentAmount": $.cookie('rentAmount_3'),
                "startDate": $.cookie('termStartDate_3'),
                "taxAmount": $.cookie('taxAmount_3'),
                "termType": "B011",
                "termTypeName": "固定租金",
                "unitCode": order.contractTermInfos[0].unitCode,
                "unitId": "sfsdfsfasfsfasdfasdf",
                "area": $.cookie('area'),
                "id": 0
            }

            var thirdYearMaintenance = {
                "amount": $.cookie('propertyMaintenance_3'),
                "code": "3",
                "endDate": $.cookie('termEndDate_32'),
                "name": "",
                "orgCode": "100001",
                "outTradeNo": order.outTradeNo,
                "rentAmount": "",
                "startDate": $.cookie('termStartDate_3'),
                "taxAmount": $.cookie('taxPropertyMaintenance_3'),
                "termType": "B021",
                "termTypeName": "物业管理费",
                "unitCode": order.contractTermInfos[0].unitCode,
                "unitId": "sfsdfsfasfsfasdfasdf",
                "area": $.cookie('area'),
                "id": 0
            }

            var thirdYearPromotion = {
                "amount": $.cookie('promotionRate_3'),
                "code": "3",
                "endDate": $.cookie('termEndDate_3'),
                "name": "",
                "orgCode": "100001",
                "outTradeNo": order.outTradeNo,
                "rentAmount": "",
                "startDate": $.cookie('termStartDate_3'),
                "taxAmount": $.cookie('taxPromotionRate_3'),
                "termType": "G021",
                "termTypeName": "推广费",
                "unitCode": order.contractTermInfos[0].unitCode,
                "unitId": "sfsdfsfasfsfasdfasdf",
                "area": $.cookie('area'),
                "id": 0
            }

            var thirdYearRate = {
                "amount": $.cookie('deductionTaxAmount_3'),
                "code": "3",
                "endDate": $.cookie('termEndDate_3'),
                "name": "",
                "orgCode": "100001",
                "outTradeNo": order.outTradeNo,
                "rentAmount": "",
                "startDate": $.cookie('termStartDate_3'),
                "taxAmount": $.cookie('taxDeductionTaxAmount_3'),
                "termType": "D011",
                "termTypeName": "提成扣率",
                "unitCode": order.contractTermInfos[0].unitCode,
                "unitId": "sfsdfsfasfsfasdfasdf",
                "area": $.cookie('area'),
                "id": 0
            }

            if(order.contractTermInfos.length == 8 && order.orderStates == '待确认订单'){
                order.contractTermInfos.push(thirdYearPrice,thirdYearMaintenance,thirdYearPromotion,thirdYearRate);
            }
        }
    }
    order.orderStates = '合同已生成';
    
    /* 
     * @订单状态  
     *  待确认订单
     *  合同已生成
     *  合同用印中
     *  待付款订单
     *  已完成订单
     *  已关闭订单
     */

    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(order),
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
                saveMsgLog('订单合同已生成','您的订单【陆家嘴正大广场】商铺单元【'+$.cookie('shopNo')+'】合同已生成，请前往我的订单管理页面查看。',order.outTradeNo, '我的消息',$.order.unit,'/v2/improve-info?id='+getURLParameter('id'));
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}