$.order = {
    shopName: ""
};

$(document).ready(function(){
    getOrderByTradeNO();
    
    $('input[name=payment]').each(function(){
        $(this).click(function () {
            var radio = $(this).find(':radio');
            radio.prop('checked', !radio.prop('checked'));
        })
    })
});

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
                
                $('#amount').text(numberWithCommas(amount));
                $('#unitDesc').text(response.data[0].contractInfos[0].unitDesc);
                if(response.data[0].remarkSecond == 'leasing') {
                    $('.leasing-terms').show();
                    $('#unitDesc').text('商铺: '+response.data[0].contractInfos[0].unitDesc);
                } else if(response.data[0].remarkSecond == 'event') {
                    $('.leasing-terms').show();
                    $('#unitDesc').text('场地: '+response.data[0].contractInfos[0].unitDesc);
                } else if(response.data[0].remarkSecond == 'advertising') {
                    $('#unitDesc').text('广告位: ');
                    $.each(response.data[0].contractInfos, function(i,v){
                        taxAmount = parseFloat((taxAmount + v.depositAmount).toFixed(2));
                        amount = taxAmount;
                        $('#unitDesc').append(''+v.unitDesc+'<br>');
                    })
                }
                
                $('#startPay').click(function(){
                    sendMail(numberWithCommas(amount),response.data[0].contractInfos[0].unitDesc, $('#unionPayEmail').val());
                })
                
                $('#confirm').click(function(){
                    updateOrderToPayed(response.data[0].id,response.data[0].remarkSecond,response.data[0].outTradeNo,response.data[0].contractInfos[0].unitCode);
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
                
                saveMsgLog('已完成订单','订单【陆家嘴正大广场】'+types+$.order.shopName+'，我们已收到您的付款，您可联系我们的进场对接负责人Kobe,沟通现场设计交底会的时间，我们会在您选择的时间安排会面。',trade, '我的消息',unit,'/v2/to-pay');
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function sendMail(a,b,c) {
    $.ajax({
        url: "/controllers/api/2.0/ApiInformPayment.php",
        type: "POST",
        data: {
            amount: a,
            unit: b,
            email: c
        },
        async: false,
        beforeSend: function(request) {
            showLoading();
        },
        complete: function(){},
        success: function (response, status, xhr) {
            hideLoading();
            $('.page__bd').hide();
            $('.page').fadeIn();

            if($("input[id=offline]").prop("checked")){
                //startOfflinePay();
            } else if($("input[id=unionPay]").prop("checked")){
                //startUnionPay();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}