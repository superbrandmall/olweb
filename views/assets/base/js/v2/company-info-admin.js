$(document).ready(function(){
    $('#company_name').val($.cookie('company_name'));
    $('#uscc').val($.cookie('uscc'));
    $('#business_scope').val($.cookie('business_scope'));
    $('#contact_name_1').val($.cookie('contact_name_1'));
    $('#contact_phone_1').val($.cookie('contact_phone_1'));
    $('#contact_email').val($.cookie('contact_email'));
    
    $("#company_form").validate({
        rules: {
            company_name: {
                required: true
            },
            uscc: {
                required: true,
                rangelength: [18,18],
                numChar: true
            },
            business_scope: {
                required: true
            },
            contact_name_1: {
                required: true
            },
            contact_phone_1: {
                required: true
            },
            contact_email: {
                required: true,
                email: true
            }
        },
        messages: {
            company_name: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            uscc: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                rangelength: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                numChar: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            business_scope: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            contact_name_1: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            contact_phone_1: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            contact_email: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $.cookie('company_name', $('#company_name').val());
            $.cookie('uscc', $('#uscc').val());
            $.cookie('business_scope', $('#business_scope').val());
            $.cookie('contact_name_1', $('#contact_name_1').val());
            $.cookie('contact_phone_1', $('#contact_phone_1').val());
            $.cookie('contact_email', $('#contact_email').val());
            
            $(function(){
                var $toast = $('#js_toast');
                $toast.fadeIn(100);
                setTimeout(function () {
                    $toast.fadeOut(100);
                    location.reload();
                }, 2000);
            });
        }
    })
    
});