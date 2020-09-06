$.order = {
    shopName: ""
};

$(document).ready(function(){
    getOrderByTradeNO();
    
    $('input[name=payment]').each(function(){
        $(this).click(function () {
            var radio = $(this).find(':radio');
            radio.prop('checked', !radio.prop('checked'));
            
            if($("input[id=unionPay]").prop("checked")){
                $('#unionPayDetail').slideUp();
                $('#unionPayDetail').slideDown();
            } else if($("input[id=transfer]").prop("checked")){
                $('#unionPayDetail').slideUp();
                $('#transferDetail').slideDown();
            } 
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
                if(response.data.remarkSecond == 'leasing' || response.data.remarkSecond == 'events'){
                    //应缴金额=保证金+首月固定租金与物业管理费(含税)
                    $.each(response.data.contractInfos, function(i,v){
                        taxAmount = parseFloat((taxAmount + v.depositAmount).toFixed(2));
                        amount = taxAmount;
                    })

                    $.each(response.data.contractTermInfos, function(i,v){
                        if((v.termTypeName == '固定租金' || v.termTypeName == '物业管理费') && v.code == 1){
                            taxAmount = parseFloat((taxAmount + v.taxAmount).toFixed(2));
                            amount = parseFloat((amount + v.amount).toFixed(2));
                        }
                    })
                    
                    if(response.data.remarkSecond == 'leasing'){
                        amount = parseFloat((amount + 3000).toFixed(2));
                        taxAmount = parseFloat((taxAmount + 3000).toFixed(2));
                    }
                    tax = parseFloat((amount - taxAmount).toFixed(2));
                    qty = 1;
                    
                    $.order.shopName = '【'+response.data.contractInfos[0].unitDesc+'】';
                } else if(response.data.remarkSecond == 'advertising'){
                    amount = response.data.amount;
                    tax = (response.data.amount*0.06).toFixed(2);
                    qty = response.data.remarkThird || response.data.contractInfos.length;
                    
                    $.each(response.data.contractInfos, function(i,v){
                        $.order.shopName = $.order.shopName + '【' + v.unitDesc + '】 ';
                    });
                }
                
                $('#amount').text(numberWithCommas(amount));
                $('#tax').text(numberWithCommas(tax));
                $('#unitDesc').text(response.data.contractInfos[0].unitDesc);
                if(response.data.remarkSecond == 'leasing') {
                    $('.leasing-terms').show();
                    $('#unitDesc').text('商铺: '+response.data.contractInfos[0].unitDesc);
                } else if(response.data.remarkSecond == 'events') {
                    $('#unitDesc').text('场地: '+response.data.contractInfos[0].unitDesc);
                } else if(response.data.remarkSecond == 'advertising') {
                    $('#unitDesc').text('广告位: ');
                    $.each(response.data.contractInfos, function(i,v){
                        taxAmount = parseFloat((taxAmount + v.depositAmount).toFixed(2));
                        amount = taxAmount;
                        $('#unitDesc').append(''+v.unitDesc+'<br>');
                    })
                }
                
                $('#startPay').click(function(){
                    if($("input[id=unionPay]").prop("checked")){
                        sendMail($('#unionPayEmail').val());
                    } else if($("input[id=transfer]").prop("checked")){
                        sendMail($('#unionPayEmail').val());
                    }
                })
                
                $('#confirm').click(function(){
                    updateOrderToPayed(response.data.id,response.data.remarkSecond,response.data.outTradeNo,response.data.contractInfos[0].unitCode);
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

function sendMail(email) {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/mail/sendBillMail?mobileNo="+$.cookie('uid')+"&outTradeNo="+getURLParameter('trade')+"&email="+email,
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
                hideLoading();
                $('.page__bd').hide();
                $('.page').fadeIn();
            }
        }
    })
}