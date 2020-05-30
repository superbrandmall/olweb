$.order = {
    copy: ""
};

var first_year_bond = '';
var second_year_bond = '';

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var time = d.getTime();
var date = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    
$(document).ready(function(){
    GetShopPriceInfo();
    
    $('#negotiate').click(function(){
        window.location.href = '/v2/negotiation?id='+getURLParameter('id')+'#contract_info';
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

                var settle_date = '';
                var open_date = '';
                var free_of_ground_rent = '';
                
                var first_year_unit_price = '';
                var first_year_rent = '';
                var first_year_deduction_rate = '';
                var first_year_property_maintenance = '';
                
                var second_year_unit_price = '';
                var second_year_rent = '';
                var second_year_deduction_rate = '';
                var second_year_property_maintenance = '';
                
                $.each($.parseJSON(sessionStorage.getItem("shopsMoreInfo")), function(j,w){
                    if(response.data.unit == w.unit_no){
                        free_of_ground_rent = w.free_of_ground_rent;
                        
                        first_year_unit_price = w.first_year.first_year_unit_price;
                        first_year_rent = w.first_year.first_year_rent;
                        first_year_deduction_rate = w.first_year.first_year_deduction_rate;
                        first_year_property_maintenance = w.first_year.first_year_property_maintenance;
                        first_year_bond = w.first_year.first_year_bond;
                        
                        second_year_unit_price = w.second_year.second_year_unit_price;
                        second_year_rent = w.second_year.second_year_rent;
                        second_year_deduction_rate = w.second_year.second_year_deduction_rate;
                        second_year_property_maintenance = w.second_year.second_year_property_maintenance;
                        second_year_bond = w.second_year.second_year_bond;
                    }
                })
                
                if(response.data.shopState === 1 || response.data.shopState === 3) { // 空铺
                    settle_date = IncrDates(date,15);
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

                    settle_date = IncrDate(contractExpireYear+'-'+contractExpireMonth+'-'+contractExpireDate) || '-';

                }

                if(free_of_ground_rent != ''){
                    open_date = IncrDates(settle_date,parseInt(free_of_ground_rent)) || '';
                }
                
                $('#room_name').text(response.data.shopName || '');
                $.cookie('room_name',$('#room_name').text());
                $('#area').text(response.data.area || '');
                $.cookie('area',$('#area').text());
                $('#free_of_ground_rent').text(free_of_ground_rent);
                $.cookie('free_of_ground_rent',free_of_ground_rent);
                $('#settle_date').text(settle_date);
                $.cookie('settle_date',settle_date);
                $('#open_date').text(open_date);
                $.cookie('open_date',open_date);
                
                $('#first_year_unit_price').text(first_year_unit_price);
                $.cookie('first_year_unit_price',first_year_unit_price);
                $('#first_year_rent').text(first_year_rent);
                $.cookie('first_year_rent',first_year_rent);
                $('#first_year_deduction_rate').text(first_year_deduction_rate);
                $.cookie('first_year_deduction_rate',first_year_deduction_rate);
                $('#first_year_property_maintenance').text(first_year_property_maintenance);
                $.cookie('first_year_property_maintenance',first_year_property_maintenance);
                
                $('#second_year_unit_price').text(second_year_unit_price);
                $.cookie('second_year_unit_price',second_year_unit_price);
                $('#second_year_rent').text(second_year_rent);
                $.cookie('second_year_rent',second_year_rent);
                $('#second_year_deduction_rate').text(second_year_deduction_rate);
                $.cookie('second_year_deduction_rate',second_year_deduction_rate);
                $('#second_year_property_maintenance').text(second_year_property_maintenance);
                $.cookie('second_year_property_maintenance',second_year_property_maintenance);
                
                $('#bond').text(first_year_bond);
                $.cookie('bond',first_year_bond);
                
                $('#confirm_price').click(function(){
                    getOrderByTradeNO();
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

function getShopsMoreInfo() {
    $.ajax({
        url: "/views/assets/base/js/v2/json/shopAll.json",
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
            if(response.code == '200') {
                hideLoading();
                sessionStorage.setItem("shopsMoreInfo", JSON.stringify(response.data.shop_info) );
            }
        }
    })
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
                SaveOrder();
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
    order.mobileNo = $.cookie('settle_date');
    order.brandName = $.cookie('brand_1');
    order.remarkFirst = getURLParameter('id');
    order.orderStates = '预览合同已生成';
    
    $.each(order.contractInfos, function(i,v){
        v.depositAmount = $.cookie('bond');
        v.enterDate = $.cookie('settle_date');
        v.openDate = $.cookie('open_date');
        v.startDate = $.cookie('open_date');
        v.unitDesc = $.cookie('shop_name');
    });

    $.each(order.contractTermInfos, function(i,v){
        if(v.termTypeName == '固定租金' && v.code == 1){
            v.endDate = IncrYear($.cookie('open_date'));
            v.amount = Math.round($.cookie('first_year_rent')*1.05),
            v.rentAmount = $.cookie('first_year_unit_price');
            v.taxAmount = $.cookie('first_year_rent');
            v.startDate = $.cookie('open_date');
            v.area = $.cookie('area');
        } else if(v.termTypeName == '物业管理费' && v.code == 1){
            v.endDate = IncrYear($.cookie('open_date'));
            v.amount = Math.round($.cookie('first_year_property_maintenance')*1.06),
            v.taxAmount = $.cookie('first_year_property_maintenance');
            v.startDate = $.cookie('open_date');
            v.area = $.cookie('area');
        } else if(v.termTypeName == '推广费' && v.code == 1){
            v.endDate = IncrYear($.cookie('open_date'));
            v.startDate = $.cookie('open_date');
            v.area = $.cookie('area');
        } else if(v.termTypeName == '提成扣率' && v.code == 1){
            v.endDate = IncrYear($.cookie('open_date'));
            v.amount = Math.round($.cookie('first_year_deduction_rate')*1.05);
            v.taxAmount = $.cookie('first_year_deduction_rate');
            v.startDate = $.cookie('open_date');
            v.area = $.cookie('area');
        }
        
    });
    
    var secondYearPrice = {
        "amount": Math.round($.cookie('second_year_rent')*1.05),
        "code": "2",
        "endDate": IncrYears($.cookie('open_date'),2),
        "name": "",
        "orgCode": "100001",
        "outTradeNo": order.outTradeNo,
        "rentAmount": $.cookie('second_year_unit_price'),
        "startDate": IncrYear($.cookie('open_date')),
        "taxAmount": $.cookie('second_year_rent'),
        "termType": "B011",
        "termTypeName": "固定租金",
        "unitCode": order.contractTermInfos[0].unitCode,
        "unitId": "sfsdfsfasfsfasdfasdf",
        "area": $.cookie('area'),
        "id": 0
    }
    
    var secondYearRate = {
        "amount": Math.round($.cookie('second_year_deduction_rate')*1.05),
        "code": "2",
        "endDate": IncrYears($.cookie('open_date'),2),
        "name": "",
        "orgCode": "100001",
        "outTradeNo": order.outTradeNo,
        "rentAmount": "",
        "startDate": IncrYear($.cookie('open_date')),
        "taxAmount": $.cookie('second_year_deduction_rate'),
        "termType": "D011",
        "termTypeName": "提成扣率",
        "unitCode": order.contractTermInfos[0].unitCode,
        "unitId": "sfsdfsfasfsfasdfasdf",
        "area": $.cookie('area'),
        "id": 0
    }

        
    /*var thirdYearRate = {
        "amount": Math.round($.cookie('third_year_deduction_rate')*1.05),
        "code": "3",
        "endDate": IncrYears($.cookie('open_date'),3),
        "name": "",
        "orgCode": "100001",
        "outTradeNo": order.outTradeNo,
        "rentAmount": "",
        "startDate": IncrYears($.cookie('open_date'),2),
        "taxAmount": $.cookie('third_year_deduction_rate'),
        "termType": "D011",
        "termTypeName": "提成扣率",
        "unitCode": order.contractTermInfos[0].unitCode,
        "unitId": "sfsdfsfasfsfasdfasdf",
        "area": $.cookie('area'),
        "id": 0
    }*/    
    
    if(order.contractTermInfos.length == 4 && order.orderStates == '待确认订单'){
        order.contractTermInfos.push(secondYearPrice,secondYearRate);
    }
    
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
                window.location.href = '/v2/engineering?id='+getURLParameter('id');
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}