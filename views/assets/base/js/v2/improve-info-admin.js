$(document).ready(function(){
    $('#company_name').val($.cookie('company_name'));
    $('#uscc').val($.cookie('uscc'));
    $('#register_address').val($.cookie('register_address'));
    $('#identity_card_no').val($.cookie('identity_card_no'));
    $('#contact_address').val($.cookie('contact_address'));
    $('#contact_phone_1').val($.cookie('contact_phone_1'));
    $('#bank_name').val($.cookie('bank_name'));
    $('#bank_card_no').val($.cookie('bank_card_no'));
    
    $("#improve_form").validate({
        rules: {
            company_name: {
                required: true
            },
            uscc: {
                required: true
            },
            register_address: {
                required: true
            },
            identity_card_no: {
                required: true
            },
            contact_address: {
                required: true
            },
            contact_phone_1: {
                required: true
            },
            bank_name: {
                required: true
            },
            bank_card_no: {
                required: true
            }
        },
        messages: {
            company_name: {
                required: "公司名为必填项"
            },
            uscc: {
                required: "统一社会信用代码为必填项"
            },
            register_address: {
                required: "注册地址为必填项"
            },
            identity_card_no: {
                required: "身份证号码为必填项"
            },
            contact_address: {
                required: "邮寄地址为必填项"
            },
            contact_phone_1: {
                required: "联系电话为必填项"
            },
            bank_name: {
                required: "开户银行为必填项"
            },
            bank_card_no: {
                required: "银行账号为必填项"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $.cookie('company_name', $('#company_name').val());
            $.cookie('uscc', $('#uscc').val());
            $.cookie('register_address', $('#register_address').val());
            $.cookie('identity_card_no', $('#identity_card_no').val());
            $.cookie('contact_address', $('#contact_address').val());
            $.cookie('contact_phone_1', $('#contact_phone_1').val());
            $.cookie('bank_name', $('#bank_name').val());
            $.cookie('bank_card_no', $('#bank_card_no').val());
            
            if(getURLParameter('id') && getURLParameter('id') != ''){
                window.location.href = '/v2/order-to-be-stamped';
            } else {
                window.location.href = '/v2/info';
            }
        }
    })
    
});