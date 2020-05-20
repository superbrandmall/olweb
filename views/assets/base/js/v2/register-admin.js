$(document).ready(function(){
    getBrandCategory();
    
    $("#register_form").validate({
        rules: {
            brand_1: {
                required: true
            },
            category_1: {
                required: true
            },
            operation_1: {
                required: true
            },
            contact_name_1: {
                required: true
            },
            company_name: {
                required: true
            },
            email: {
                required: true
            }
        },
        messages: {
            brand_1: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            category_1: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            operation_1: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            contact_name_1: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            company_name: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            email: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $.cookie('brand_1', $('#brand_1').val());
            $.cookie('category_1', $('#category_1').find('option:selected').val());
            $.cookie('operation_1', $('#operation_1').find('option:selected').val());
            $.cookie('contact_name_1', $('#contact_name_1').val());
            $.cookie('company_name', $('#company_name').val());
            $.cookie('email', $('#email').val());
            
            if(getURLParameter('type')){
                if(getURLParameter('type') == 'leasing'){
                    window.location.href = '/v2/floor-plan?f='+getURLParameter('f')+'&type=leasing';
                } else if(getURLParameter('type') == 'ads'){
                    window.location.href = '/v2/advertising?f='+getURLParameter('f')+'&type=ads';
                } else if(getURLParameter('type') == 'events'){
                    window.location.href = '/v2/choose-event?id='+getURLParameter('id')+'&type=events';
                }
            } else {
                window.location.href = '/v2/info';
            }
        }
    })
});

function getBrandCategory() {
    $.each($.parseJSON(sessionStorage.getItem("category")), function(i,v) {
        if($.cookie('lang') === 'en-us'){
            $('#category_1').append('<option value="'+v.code+'">'+v.name+'</option>');
        } else {
            $('#category_1').append('<option value="'+v.code+'">'+v.desc+'</option>');
        }
    });
    
    $('#brand_1').val($.cookie('brand_1'));
    $('#category_1').val($.cookie('category_1'));
    $('#operation_1').val($.cookie('operation_1'));
    $('#contact_name_1').val($.cookie('contact_name_1'));
    $('#company_name').val($.cookie('company_name'));
    $('#email').val($.cookie('email'));
} 