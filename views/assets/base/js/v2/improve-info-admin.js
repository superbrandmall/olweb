$(document).ready(function(){
    $('#fapiao_company_name').val($.cookie('fapiao_company_name'));
    $('#tax_no').val($.cookie('tax_no'));
    $('#contact_address').val($.cookie('contact_address'));
    $('#fapiao_address').val($.cookie('fapiao_address'));
    $('#fapiao_phone').val($.cookie('fapiao_phone'));
    $('#register_address').val($.cookie('register_address'));
    $('#invoice_address').val($.cookie('invoice_address'));
    $('#identity_card_no').val($.cookie('identity_card_no'));
    $('#taxpayer_type').val($.cookie('taxpayer_type'));
    $('#fapiao_type').val($.cookie('fapiao_type'));
    $('#bank_name').val($.cookie('bank_name'));
    $('#bank_card_no').val($.cookie('bank_card_no'));
    
    $("#improve_form").validate({
        rules: {
            fapiao_company_name: {
                required: true
            },
            tax_no: {
                required: true
            },
            contact_address: {
                required: true
            },
            fapiao_address: {
                required: true
            },
            fapiao_phone: {
                required: true
            },
            register_address: {
                required: true
            },
            invoice_address: {
                required: true
            },
            identity_card_no: {
                required: true
            },
            taxpayer_type: {
                required: true
            },
            fapiao_type: {
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
            fapiao_company_name: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            tax_no: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            contact_address: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            fapiao_address: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            fapiao_phone: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            register_address: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            invoice_address: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            identity_card_no: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            taxpayer_type: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            fapiao_type: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            bank_name: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            bank_card_no: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $.cookie('fapiao_company_name', $('#comfapiao_company_nameany_name').val());
            $.cookie('tax_no', $('#tax_no').val());
            $.cookie('contact_address', $('#contact_address').val());
            $.cookie('fapiao_address', $('#fapiao_address').val());
            $.cookie('fapiao_phone', $('#fapiao_phone').val());
            $.cookie('register_address', $('#register_address').val());
            $.cookie('invoice_address', $('#invoice_address').val());
            $.cookie('identity_card_no', $('#identity_card_no').val());
            $.cookie('taxpayer_type', $('#taxpayer_type').val());
            $.cookie('fapiao_type', $('#fapiao_type').val());
            $.cookie('bank_name', $('#bank_name').val());
            $.cookie('bank_card_no', $('#bank_card_no').val());
            
            if(getURLParameter('id') && getURLParameter('id') != ''){
                window.location.href = '/v2/stamping';
            } else {
                window.location.href = '/v2/info';
            }
        }
    })
    
});