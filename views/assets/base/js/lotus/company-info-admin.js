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
            checkCredit();
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
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != null && response.data != ''){
                    $.info.company = response.data.id;
                    $('#company_name').val(response.data.name);
                    $('#uscc').val(response.data.uscc);
                    $('#business_scope').val(response.data.businessScope);
                    $('#contact_name_1').val(response.data.contactName);
                    $('#contact_phone_1').val(response.data.contactPhone);
                    $('#contact_email').val(response.data.contactEmail);
                }
            }
        }
    })
}

function checkCredit() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/tianyancha/check?mobileNo="+$.cookie('uid')+"&creditCode="+$('#uscc').val(),
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            showLoading();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            hideLoading();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null){
                    if(response.data.name == $('#company_name').val()){
                        saveUserCompany();
                    } else {
                        CreditError();
                    }
                } else {
                    CreditError();
                }
            } else {
                CreditError();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           CreditError();
        }
    })
}

function saveUserCompany() {
    showLoading();
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
                hideLoading();
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

function CreditError() {
    $('body').append('<div id="js_toast_2" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">公司名与统一社会信用代码不匹配,请修改并重新提交</p></div></div>');
    var $toast = $('#js_toast_2');

    $('.page.cell').removeClass('slideIn');

    $toast.fadeIn(100);
    setTimeout(function () {
        $toast.fadeOut(100);
    }, 2000);
}