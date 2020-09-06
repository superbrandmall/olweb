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
                required: true,
                email: true
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
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            email: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            sign_body: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            contact_address: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            event_name: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
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