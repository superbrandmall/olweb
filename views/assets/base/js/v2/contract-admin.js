$(document).ready(function(){
    //if(!getURLParameter('type') || getURLParameter('type') == ''){
        $.ajax({
            type: 'POST',
            url: '/controllers/api/2.0/ApiTCPDF.php',
            data: {
                'name': 'leasing_contract',
                'company_name': $.cookie('company_name'),
                'uscc': $.cookie('uscc'),
                'register_address': $.cookie('register_address'),
                'identity_card_no': $.cookie('identity_card_no'),
                'contact_address': $.cookie('contact_address'),
                'contact_phone_1': $.cookie('contact_phone_1'),
                'bank_name': $.cookie('bank_name'),
                'bank_card_no': $.cookie('bank_card_no')
            },
            dataType: "json",
            beforeSend: function(request) {
                showLoading();
            },
            complete: function(){
                hideLoading();
                $('#pdfContainer').attr('src','/views/assets/plugins/pdfjs/web/viewer.html?file=/pdf/leasing_contract.pdf');
            }
        });
    //}
    
    
    $(function(){
        var $iosDialog2 = '<div class="js_dialog" id="iosDialog2" style="display: none;">\n\
<div class="weui-mask">\n\
</div><div class="weui-dialog">\n\
<div class="weui-dialog__bd">您好，用印链接稍后将发送到您的手机，请注意查收！</div>\n\
<div class="weui-dialog__ft">\n\
<a href="javascript: updateOrderToStamping();" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\n\
</div>\n\
</div> \n\
</div>';

        $('#confirm_contract').on('click', function(){
            if($('#iosDialog2').length > 0){
                $('#iosDialog2').remove();
            }
            $('body').append($iosDialog2);
            $('#iosDialog2').fadeIn(200);
        });
    });
});

function updateOrderToStamping(){
    showLoading();
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/order/updateOrderStates?id="+getURLParameter('id')+"&orderStates=合同用印中",
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
            window.location.href = '/v2/stamping';
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                //window.location.href = '/v2/stamping';
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}