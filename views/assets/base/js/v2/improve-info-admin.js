$.info = {
    company: "",
    name: ""
};

$(document).ready(function(){
    findUserCompanyByMobileNo();
    
    $("#improve_form").validate({
        rules: {
            invoice_company_name: {
                required: true
            },
            invoice_tax_no: {
                required: true
            },
            mailing_address: {
                required: true
            },
            invoice_address: {
                required: true
            },
            invoice_phone: {
                required: true
            },
            street_address: {
                required: true
            },
            billing_address: {
                required: true
            },
            id_card: {
                required: true
            },
            tax_payer_type: {
                required: true
            },
            invoice_type: {
                required: true
            },
            bank_name: {
                required: true
            },
            bank_account: {
                required: true
            }
        },
        messages: {
            invoice_company_name: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            invoice_tax_no: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            mailing_address: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            invoice_address: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            invoice_phone: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            street_address: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            billing_address: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            id_card: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            tax_payer_type: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            invoice_type: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            bank_name: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            bank_account: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveUserCompany();
        }
    });
});

function findUserCompanyByMobileNo() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/company/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.info.company = response.data[0].id;
                    $.info.name = response.data[0].name;
                    $('#invoice_company_name').val(response.data[0].invoiceCompanyName);
                    $('#invoice_tax_no').val(response.data[0].invoiceTaxNo);
                    $('#mailing_address').val(response.data[0].mailingAddress);
                    $('#invoice_address').val(response.data[0].invoiceAddress);
                    $('#invoice_phone').val(response.data[0].invoicePhone);
                    $('#street_address').val(response.data[0].streetAddress);
                    $('#billing_address').val(response.data[0].billingAddress);
                    $('#id_card').val(response.data[0].idCard);
                    $('#tax_payer_type').val(response.data[0].taxPayerType);
                    $('#invoice_type').val(response.data[0].invoiceType);
                    $('#bank_name').val(response.data[0].bankName);
                    $('#bank_account').val(response.data[0].bankAccount);
                }
            }
        }
    })
}

function saveUserCompany() {
    var map = {
        "mobileNo": $.cookie('uid'),
        "invoiceCompanyName": $('#invoice_company_name').val(),
        "invoiceTaxNo": $('#invoice_tax_no').val(),
        "mailingAddress": $('#mailing_address').val(),
        "invoiceAddress": $('#invoice_address').val(),
        "invoicePhone": $('#invoice_phone').val(),
        "streetAddress": $('#street_address').val(),
        "billingAddress": $('#billing_address').val(),
        "idCard": $('#id_card').val(),
        "taxPayerType": $('#tax_payer_type').val(),
        "invoiceType": $('#invoice_type').val(),
        "bankName": $('#bank_name').val(),
        "bankAccount": $('#bank_account').val()
    }
    
    if($.info.company != "") {
        map.id = $.info.company;
        map.name = $.info.name;
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/company/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null) {
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                $(function(){
                    var $toast = $('#js_toast');
                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.fadeOut(100);
                        if(getURLParameter('id') && getURLParameter('id') != ''){
                            window.location.href = '/v2/stamping';
                        } else {
                            window.location.href = '/v2/info';
                        }
                    }, 2000);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}