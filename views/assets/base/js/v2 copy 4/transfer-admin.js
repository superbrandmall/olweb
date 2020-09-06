$.order = {
    shopName: ""
};

$(document).ready(function(){
    getOrderByTradeNO();
})

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
            hideLoading();
            if(response.code === 'C0') {
                var amount = 0; //含税总额
                var taxAmount = 0; //不含税总额
                var tax = 0; //税费
                var qty,tax;
                if(response.data[0].remarkSecond == 'leasing' || response.data[0].remarkSecond == 'events'){
                    //应缴金额=保证金+首月固定租金与物业管理费(含税)
                    $.each(response.data[0].contractInfos, function(i,v){
                        taxAmount = parseFloat((taxAmount + v.depositAmount).toFixed(2));
                        amount = taxAmount;
                    })

                    $.each(response.data[0].contractTermInfos, function(i,v){
                        if((v.termTypeName == '固定租金' || v.termTypeName == '物业管理费') && v.code == 1){
                            taxAmount = parseFloat((taxAmount + v.taxAmount).toFixed(2));
                            amount = parseFloat((amount + v.amount).toFixed(2));
                        }
                    })

                    tax = parseFloat((amount - taxAmount).toFixed(2));
                    qty = 1;
                    
                    $.order.shopName = '【'+response.data[0].contractInfos[0].unitDesc+'】';
                } else if(response.data[0].remarkSecond == 'advertising'){
                    amount = response.data[0].amount;
                    tax = (response.data[0].amount*0.06).toFixed(2);
                    qty = response.data[0].remarkThird || response.data[0].contractInfos.length;
                    
                    $.each(response.data[0].contractInfos, function(i,v){
                        $.order.shopName = $.order.shopName + '【' + v.unitDesc + '】 ';
                    });
                }
                
                
                
                $('#confirm_pay').click(function(){
                    updateOrderToPayed(response.data[0].id,response.data[0].remarkSecond,response.data[0].outTradeNo,response.data[0].contractInfos[0].unitCode);
                });
                
                $('#amount').text(numberWithCommas(amount));
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function updateOrderToPayed(id,type,trade,unit){
    showLoading();
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updateOrderStates?id="+id+"&orderStates=已完成订单",
        type: "POST",
        async: false,
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
                
                var types;
                if(type == 'leasing') {
                    types = '商铺单元';
                } else if(type == 'advertising') {
                    types = '广告位';
                } else if(type == 'events') {
                    types = '场地单元';
                }
                
                saveMsgLog('已完成订单','恭喜您! 您的订单【陆家嘴正大广场】'+types+$.order.shopName+'已完成付款，可以准备进场了! 我们会在一个工作日内委派专人与您对接，请保持手机信号畅通，谢谢。',trade, '我的消息',unit,'/v2/to-pay');
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}


var countdownLogin=60;

function VeryficationCodeLogin() {
    var obj = $("#login_verify_link");
    var userName = $('#login_username').val();
    
    if(userName != '') {
        $.ajax({
            url: $.api.baseNew+"/comm-wechatol/api/sms/sendIdentifyCode?mobileNo="+userName,
            type: "GET",
            async: false,
            beforeSend: function(request) {
                showLoading();
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                hideLoading();
                setTimeLogin(obj);
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function setTimeLogin(obj) {
    if (countdownLogin == 0) { 
        obj.attr({
            'href':'javascript: VeryficationCodeLogin()',
            'disabled': false
        });
        obj.html("获取验证码");
        countdownLogin = 60; 
        return;
    } else {
        obj.attr({
            'href':'javascript: void(0)',
            'disabled': true
        });
        obj.html("重新获取(" + countdownLogin + ")");
        countdownLogin--; 
    } 
setTimeout(function() { 
    setTimeLogin(obj); }
    ,1000); 
}