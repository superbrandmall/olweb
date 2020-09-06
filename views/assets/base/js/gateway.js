$(document).ready(function(){
    getOrderByTradeNO();
});

function getOrderByTradeNO() {
    $.ajax({
        url: "https://olapi.superbrandmall.com/comm-wechatol/api/order/findAllByMobileNoAndOutTradeNo?mobileNo="+getURLParameter('mobileNo')+"&outTradeNo="+getURLParameter('trade'),
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
                var Gamount = 0, Wamount = 0;
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
                        
                        if(v.termTypeName == '固定租金' && v.code == 1){
                            Gamount = v.amount;
                        }
                        
                        if(v.termTypeName == '物业管理费' && v.code == 1){
                            Wamount = v.amount;
                        }
                    })

                    if(response.data.remarkSecond == 'leasing'){
//                        amount = parseFloat((amount + 3000).toFixed(2));
//                        taxAmount = parseFloat((taxAmount + 3000).toFixed(2));
                   }
                    tax = parseFloat((amount - taxAmount).toFixed(2));
                    qty = 1;
                    
                } else if(response.data.remarkSecond == 'advertising'){
                    amount = response.data.amount;
                    tax = (response.data.amount*0.06).toFixed(2);
                    qty = response.data.remarkThird || response.data.contractInfos.length;
  
                }
                
                $('#amount').text(numberWithCommas(amount));
                $('#tax').text(numberWithCommas(tax));
                $('#outTradeNo').text(response.data.outTradeNo);
                $('#unitDesc').text(response.data.contractInfos[0].unitDesc);
                $('#Gamount').text(numberWithCommas(Gamount));
                $('#Wamount').text(numberWithCommas(Wamount));
                $('#depositAmount').text(numberWithCommas(response.data.contractInfos[0].depositAmount));

                $('.portfolio-item').find('a').click(function(){
                    $('.portfolio-item').find('a').removeClass('active');
                    $('#bankChosen').hide();
                    $(this).addClass('active');
                    $('#bankChosen').text('已选择: '+$(this).attr('data-name')).fadeIn();
                })
                
                $('#redirect').on("click",function() {
                    if($('.portfolio-item .active').length){
                        $('#myModal').modal('hide');
                        $('#freezing').modal('show');
                        netPay($('a.active').attr('data-id'));
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

function netPay(bankCode){
    $.ajax({
        url: "https://olapi.superbrandmall.com/comm-wechatol/api/unionpay/netPay?outTradeNo="+getURLParameter('trade')+"&bankCode="+bankCode+"&mobileNo="+getURLParameter('mobileNo'),
        type: "GET",
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
                
                if(response.data.resultCode == 'ERROR'){
                    alert(response.data.resultInfo);
                } else {
                    window.open(response.data.bankUrl);
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

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function showLoading() {
    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') != 'none') return;
    $loadingToast.fadeIn();
}

function hideLoading() {
    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') == 'none') return;
    $loadingToast.fadeOut();
}

function interpretBusinessCode(msg) {
    if(msg !== ''){
        $('#ui_alert').text(msg).slideDown().delay(2000).slideUp(0);
        $('html, body').animate({
            scrollTop: $('#ui_alert').offset().top
        }, 0);
    }
}

function numberWithCommas(x) {
    if(x == null){
        return '-';
    } else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}