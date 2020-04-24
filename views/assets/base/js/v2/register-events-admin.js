$(document).ready(function(){
    $('#contact_name_1').val($.cookie('contact_name_1'));
    $('#email').val($.cookie('email'));
    $('#sign_body').val($.cookie('sign_body'));
    $('#contact_address').val($.cookie('contact_address'));
    $('#event_name').val($.cookie('event_name'));
    
    $("#register_form").validate({
        rules: {
            contact_name_1: {
                required: true
            },
            email: {
                required: true
            },
            sign_body: {
                required: true
            },
            category_1: {
                required: true
            },
            contact_address: {
                required: true
            },
            event_name: {
                required: true
            }
            
        },
        messages: {
            contact_name_1: {
                required: "姓名为必填项"
            },
            email: {
                required: "邮箱为必填项"
            },
            sign_body: {
                required: "签约主体为必填项"
            },
            contact_address: {
                required: "联系地址为必填项"
            },
            event_name: {
                required: "活动名称为必填项"
            }
            
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $.cookie('contact_name_1', $('#contact_name_1').val());
            $.cookie('email', $('#email').val());
            $.cookie('sign_body', $('#sign_body').val());
            $.cookie('contact_address', $('#contact_address').val());
            $.cookie('event_name', $('#event_name').val());
            
            window.location.href = '/v2/choose-event?id='+getURLParameter('id');
        }
    })
    
});