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
                $('#transferDetail').slideUp();
                $('#emailDialog').slideDown();
            } else if($("input[id=transfer]").prop("checked")){
                $('#emailDialog').slideUp();
                $('#transferDetail').slideDown();
            } 
        })
    })
    
    $("#emailDialogForm").validate({
        rules: {
            unionPayEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            unionPayEmail: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>请填写付款人邮箱',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>邮箱格式不对，请正确填写'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            sendMail($('#unionPayEmail').val());
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
                var qty;
                var deposit = 0;
                
                var mallName,orgName,payeeAccount,payeeBank,type;
                switch (response.data.orgCode) {
                    case '301001':
                        mallName = '河南洛阳正大广场';
                        orgName = '洛阳正大置业有限公司';
                        payeeAccount = '413069600018010009891';
                        payeeBank = '交通银行洛阳分行营业部';
                        $('#unionPayLabel').remove();
                        $("input[id=transfer]").attr("checked", "checked");  
                        break;
                    case '201001':
                        mallName = '上海宝山正大乐城';
                        orgName = '上海正大帝盈商业发展有限公司';
                        payeeAccount = '1001014219006800273';
                        payeeBank = '工商银行顾村支行';
                        $('#unionPayLabel').remove();
                        $("input[id=transfer]").attr("checked", "checked");  
                        break;
                    case '100001':
                        mallName = '上海陆家嘴正大广场';
                        orgName = '上海帝泰发展有限公司';
                        payeeAccount = '310066030018170043300';
                        payeeBank = '交通银行上海虹口支行'; 
                        break;
                    case '204001':
                        mallName = '上海徐汇正大乐城';
                        orgName = '上海正大乐城百货有限公司';
                        payeeAccount = '0243014210002166';
                        payeeBank = '中国民生银行上海吴中支行';
                        $('#unionPayLabel').remove();
                        $("input[id=transfer]").attr("checked", "checked");  
                        break;
                    default:
                        mallName = '上海陆家嘴正大广场';
                        orgName = '上海帝泰发展有限公司';
                        payeeAccount = '310066030018170043300';
                        payeeBank = '交通银行上海虹口支行';
                        break;
                }
                
                if(response.data.remarkSecond == 'leasing' || response.data.remarkSecond == 'events'){                    
                    if(response.data.remarkSecond == 'leasing'){
                        //应缴金额=保证金+首月固定租金与物业管理费(含税)
                        $('#leasing_price').show();
                        type = '租赁';
                        
                        $.each(response.data.contractInfos, function(i,v){
                            taxAmount = parseFloat((taxAmount + v.depositAmount).toFixed(2));
                            amount = taxAmount;
                        })

                        $.each(response.data.contractTermInfos, function(i,v){
                            if((v.termTypeName == '固定租金' || v.termTypeName == '物业管理费') && v.code == 1){
                                taxAmount = parseFloat((taxAmount + v.taxAmount).toFixed(2));
                                amount = parseFloat((amount + v.amount).toFixed(2));
                                if(v.termTypeName == '固定租金'){
                                    $('#rent').text(numberWithCommas(v.amount));
                                }
                                if(v.termTypeName == '物业管理费'){
                                    $('#maintenance').text(numberWithCommas(v.amount));
                                }
                            }
                        })
                       
                        amount = parseFloat((amount + 3000).toFixed(2));
                        taxAmount = parseFloat((taxAmount + 3000).toFixed(2));
                        $('#amount').text(numberWithCommas(amount));
                        $('#deposit').text(numberWithCommas(response.data.contractInfos[0].depositAmount.toFixed(2)));
                        $('#tax').text(numberWithCommas(parseFloat((amount - taxAmount).toFixed(2))));
                    } else {
                        $('#adevent_price').show();
                        type = '场地';
                        
                        $.each(response.data.contractInfos, function(i,v){
                            deposit = parseFloat((deposit + v.depositAmount).toFixed(2));
                        })
                        
                        $.each(response.data.contractTermInfos, function(i,v){
                            taxAmount = parseFloat((taxAmount + v.taxAmount).toFixed(2));
                            amount = parseFloat((amount + v.amount).toFixed(2));
                        })
                        
                        $('#adevent_rent').text(numberWithCommas(amount));
                        $('#adevent_deposit').text(numberWithCommas(deposit));
                        $('#amount').text(numberWithCommas(parseFloat((amount + deposit).toFixed(2))));
                        $('#tax').text(numberWithCommas(parseFloat((amount - taxAmount).toFixed(2))));
                        
                    }
                    tax = parseFloat((amount - taxAmount).toFixed(2));
                    qty = 1;
                    
                    $.order.shopName = '【'+response.data.contractInfos[0].unitDesc+'】';
                } else if(response.data.remarkSecond == 'advertising'){
                    $('#adevent_price').show();
                    type = '广告';
                    
                    $.each(response.data.contractInfos, function(i,v){
                        deposit = parseFloat((deposit + v.depositAmount).toFixed(2));
                    })
                    
                    $.each(response.data.contractTermInfos, function(i,v){
                        taxAmount = parseFloat((taxAmount + v.taxAmount).toFixed(2));
                        amount = parseFloat((amount + v.amount).toFixed(2));
                    })

                    $('#adevent_rent').text(numberWithCommas(amount));
                    $('#adevent_deposit').text(numberWithCommas(deposit));
                    $('#amount').text(numberWithCommas(parseFloat((amount + deposit).toFixed(2))));
                    $('#tax').text(numberWithCommas(parseFloat((amount - taxAmount).toFixed(2))));
                    
                    $.each(response.data.contractInfos, function(j,w){
                        amount = amount + w.amount;
                        tax = parseFloat(tax + (w.amount*0.06).toFixed(2));
                        qty = qty + w.remarkThird;
                    })
                    
                    $.each(response.data.contractInfos, function(i,v){
                        $.order.shopName = $.order.shopName + '【' + v.unitDesc + '】 ';
                    });
                }
                
                $('#type').text(type);
                $('.org').text(orgName);
                $('#mall').text(mallName);
                $('#payeeAccount').text(payeeAccount);
                $('#payeeBank').text(payeeBank);
                $('#outTradeNo').text(response.data.outTradeNo);
                $('#unitDesc').text(response.data.contractInfos[0].unitDesc);
                if(response.data.remarkSecond == 'leasing') {
                    $('.leasing-terms').show();
                    $('#unitDesc').text(response.data.contractInfos[0].unitDesc);
                } else if(response.data.remarkSecond == 'events') {
                    $('#unitDesc').text(response.data.contractInfos[0].unitDesc);
                } else if(response.data.remarkSecond == 'advertising') {
                    $.each(response.data.contractInfos, function(i,v){
                        taxAmount = parseFloat((taxAmount + v.depositAmount).toFixed(2));
                        amount = taxAmount;
                        $('#unitDesc').append(''+v.unitDesc+'<br>');
                    })
                }
                
                $('#startPay').click(function(){
                    showDialog();
                })
                
                $('#confirm').click(function(){
                    window.location.href = '/v2/stamping';
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

function showDialog(){
    var authDialog = $('#emailDialog');
    authDialog.fadeIn(200);
}

function hideDialog(){
    var authDialog = $('#emailDialog');
    authDialog.hide();
}

function sendMail(email) {
    hideDialog();
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