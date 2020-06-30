$(document).ready(function(){
    $('#company_name').val($.cookie('company_name'));
    $('#uscc').val($.cookie('uscc'));
    $('#business_scope').val($.cookie('business_scope'));
    
    $("#authentication_form").validate({
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
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $.cookie('company_name', $('#company_name').val());
            $.cookie('uscc', $('#uscc').val());
            $.cookie('business_scope', $('#business_scope').val());
            
            if(getURLParameter('trade') && getURLParameter('trade') != ''){
                window.location.href = '/v2/price?id='+getURLParameter('id')+'&trade='+getURLParameter('trade');
            } else {
                window.location.href = '/v2/price?id='+getURLParameter('id');
            }
        }
    })
});