$.info = {
    company: ""
};

$(document).ready(function(){
    findUserCompanyByMobileNo();
    
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
            saveUserCompany();
        }
    })
    
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
                    $('#company_name').val(response.data[0].name);
                    $('#uscc').val(response.data[0].uscc);
                    $('#business_scope').val(response.data[0].businessScope);
                    $('#contact_name_1').val(response.data[0].contactName);
                    $('#contact_phone_1').val(response.data[0].contactPhone);
                    $('#contact_email').val(response.data[0].contactEmail);
                }
            }
        }
    })
}

function saveUserCompany() {
    var map = {
        "mobileNo": $.cookie('uid'),
        "name": $('#company_name').val(),
        "uscc": $('#uscc').val(),
        "businessScope": $('#business_scope').val(),
        "contactName": $('#contact_name_1').val(),
        "contactPhone": $('#contact_phone_1').val(),
        "contactEmail": $('#contact_email').val(),
    }
    
    if($.info.company != "") {
        map.id = $.info.company;
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
                        if(getURLParameter('id') && getURLParameter('id') != '') {
                            if(getURLParameter('type') && getURLParameter('type') == 'leasing'){
                                if(getURLParameter('trade') && getURLParameter('trade') != ''){
                                    window.location.href = '/v2/price?id='+getURLParameter('id')+'&trade='+getURLParameter('trade');
                                } else {
                                    window.location.href = '/v2/price?id='+getURLParameter('id');
                                }
                            } else if(getURLParameter('type') && getURLParameter('type') == 'ads'){
                                if(getURLParameter('trade') && getURLParameter('trade') != ''){
                                    window.location.href = '/v2/advertising-shopping-cart?id='+getURLParameter('id')+'&trade='+getURLParameter('trade');
                                } else {
                                    window.location.href = '/v2/advertising-shopping-cart?id='+getURLParameter('id');
                                }
                            } else if(getURLParameter('type') && getURLParameter('type') == 'events'){
                                if(getURLParameter('trade') && getURLParameter('trade') != ''){
                                    window.location.href = '/v2/choose-event?id='+getURLParameter('id')+'&trade='+getURLParameter('trade');
                                } else {
                                    window.location.href = '/v2/choose-event?id='+getURLParameter('id');
                                }
                            }
                        } else {
                            location.reload();
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