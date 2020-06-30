$.order = {
    copy: "",
    building: "",
    mall: "",
    unit: ""
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    GetShopPriceInfo();
    getOrderByTradeNO();
    
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

function GetShopPriceInfo(){
    getShopsMoreInfo();
    var shopCode = getURLParameter('id') || null;
    
    var userCodeParameter = '';
    if($.cookie('uid') && $.cookie('uid') != ''){
        userCodeParameter = "?userCode="+$.cookie('uid');
    }
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/shop/"+shopCode+userCodeParameter+"",
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
                
                $.each(response.data.images, function(i,v){
                    $('#slide1 ul').append('<li><a href="javascript:;"><img src='+v.image+' alt=""></a></li>');
                    $('#slide1 .dot').append('<span></span>');
                });
                
                var settleDate = '';
                var openDate = '';
                var freeOfGroundRent = '';
                var deposit = '';
                var rentAmount = '';
                var taxAmount = '';
                var deductionTaxAmount = '';
                var propertyMaintenance = '';
                var promotionRate = '';
                var contractLength = '';
                
                $.order.building = response.data.buildingCode;
                $.order.mall = response.data.mallCode;
                $.order.unit = response.data.unit;
                
                $.each($.parseJSON(sessionStorage.getItem("shopsMoreInfo")), function(j,w){
                    if(response.data.unit == w.unitCode){
                        freeOfGroundRent = w.freeOfGroundRent;
                        deposit = w.deposit;
                        contractLength = w.contractLength;
                        $.cookie('contractLength',w.contractLength);
                        $.cookie('shopNo', w.shopNo);
                        
                        for(var x = 1; x <= w.contractLength; x++){
                            $.each(w.shopRentWxs, function(k,y){
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
                    }
                })
                
                if(response.data.shopState === 1 || response.data.shopState === 3) { // 空铺
                    settleDate = IncrDates(date,15);
                } else { // 非空铺
                    var contractExpire = new Date();
                    contractExpire.setTime(response.data.contractExpireDate);
                    var contractExpireYear = contractExpire.getFullYear('yyyy');
                    var contractExpireMonth = contractExpire.getMonth('mm')+1;
                    if(contractExpireMonth < 10){
                        contractExpireMonth = "0"+contractExpireMonth;
                    }
                    var contractExpireDate = contractExpire.getDate('dd');
                    if(contractExpireDate < 10) {
                        contractExpireDate = "0"+contractExpireDate;
                    }

                    settleDate = IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate) || '-';

                }

                if(freeOfGroundRent != ''){
                    openDate = IncrDates(settleDate,parseInt(freeOfGroundRent)) || '';
                }
                
                $.cookie('settleDate',settleDate);
                $.cookie('openDate',openDate);
                
                $('#room_name').text(response.data.shopName || '');
                
                $('#area').text(response.data.area || '');
                $.cookie('area',response.data.area);
                
                $('#free_of_ground_rent').text(freeOfGroundRent);
                $('#settle_date').text(settleDate);
                $('#open_date').text(openDate);
                $('#propertyMaintenance').text(propertyMaintenance);
                $('#promotionRate').text(promotionRate);
                
                $('#deposit').text(deposit);
                $.cookie('deposit',deposit);
                
                $('#contractLength').text(contractLength);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getShopsMoreInfo() {
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
                sessionStorage.setItem("shopsMoreInfo", JSON.stringify(response.data)); 
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
                    SaveOrder();
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

function SaveOrder(){
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