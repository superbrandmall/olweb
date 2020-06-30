$(document).ready(function(){
    getOrderByTradeNO();
    
    $('#facial').click(function(){
        $('#facial img').attr('src','/views/assets/base/img/content/backgrounds/890000-2.jpg');
        $('#pay_1').css('background','#BABABA');
        setTimeout(function () {
            window.location.href = '/v2/pay-done?type=wechatPay&trade='+getURLParameter('trade');
        },500);
    });
    
    $('input[name=payment]').each(function(){
        $(this).click(function () {
            var radio = $(this).find(':radio');
            radio.prop('checked', !radio.prop('checked'));
        })
    })
    
    $('#startPay').click(function(){
       if($("input[id=unionPay]").prop("checked")){
           startUnionPay();
       } else if($("input[id=wechatPay]").prop("checked")){
           startWechatPay();
       }
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
                } else if(response.data[0].remarkSecond == 'advertising'){
                    amount = response.data[0].amount;
                    tax = (response.data[0].amount*0.06).toFixed(2);
                    qty = response.data[0].remarkThird || response.data[0].contractInfos.length;
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
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function startWechatPay(){
    $("#pay_1").show();
}

function startUnionPay(){
    window.location.href = '/v2/unionpay?type=unionPay&trade='+getURLParameter('trade');
}