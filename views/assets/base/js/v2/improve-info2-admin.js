$.info = {
    company: "",
    name: "",
    brand: ""
};

$(document).ready(function(){
    findUserCompanyByMobileNo();
    findUserBrandByMobileNo();
    
    $("#job_title").change(function() {
        if($(this).val() == 'others'){
            $('#other_jobs').slideDown();
        }; 
    }); 

    $("#basic").validate({
        rules: {
            company_name: {
                required: true
            },
            uscc: {
                required: true,
                rangelength: [18,18],
                numChar: true
            },
            brand_1: {
                required: true
            },
            business_scope: {
                required: true
            },
            contact_name_1: {
                required: true
            },
            id_card: {
                required: true
            },
            contact_phone_1: {
                required: true
            },
            contact_email: {
                required: true,
                email: true
            },
            job_title: {
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
            brand_1: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            business_scope: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            contact_name_1: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            id_card: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            contact_phone_1: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            contact_email: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            job_title: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            checkCredit();
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
                    $('#id_card').val(response.data.idCard);
                    $('#contact_phone_1').val(response.data.contactPhone);
                    $('#contact_email').val(response.data.contactEmail);
                    if(response.data.title != '业务拓展负责人' && response.data.title != '公司负责人/总经理' && response.data.title != '中介') {
                        $('#job_title').val('others');
                        $('#other_job').val(response.data.title);
                        $('#other_jobs').css('display','flex');
                    } else {
                        $('#job_title').val(response.data.title);
                    }
                    
                    $('#mailing_address').val(response.data.mailingAddress);
                    $('#invoice_address').val(response.data.invoiceAddress);
                    $('#invoice_phone').val(response.data.invoicePhone);
                    $('#street_address').val(response.data.streetAddress);
                    $('#billing_address').val(response.data.billingAddress);
                    if(response.data.taxPayerType != '' && response.data.taxPayerType != null){
                        $('#tax_payer_type').val(response.data.taxPayerType);
                    }
                    if(response.data.invoiceType != '' && response.data.invoiceType != null){
                        $('#invoice_type').val(response.data.invoiceType);
                    }
                    
                    $('#bank_account').val(response.data.bankAccount);
                    $('#bank_name').val(response.data.bankName);
                    
                    $('#authName').val(response.data.authName);
                    $('#authPhone').val(response.data.authPhone);
                    $('#authIdentity').val(response.data.authIdentity);
                    $('#authEmail').val(response.data.authEmail);
                }
            }
        }
    })
}

function findUserBrandByMobileNo() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/brand/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
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
                hideLoading();
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.info.brand = response.data[0].id;
                    $('#brand_1').val(response.data[0].brandName);
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

function CreditError() {
    $('body').append('<div id="js_toast_2" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">公司名与统一社会信用代码不匹配,请修改并重新提交</p></div></div>');
    var $toast = $('#js_toast_2');

    $('.page.cell').removeClass('slideIn');

    $toast.fadeIn(100);
    setTimeout(function () {
        $toast.fadeOut(100);
    }, 2000);
}

function saveUserCompany() {
    showLoading();
    var title = '';
    if($('#job_title').val() == 'others') {
        title = $('#other_job').val();
    } else {
        title = $('#job_title').val();
    }
    
    var openid = '';
    if(sessionStorage.getItem('wechat_user_info') != undefined && sessionStorage.getItem('wechat_user_info') != null && sessionStorage.getItem('wechat_user_info') != '') {
        openid = $.parseJSON(sessionStorage.getItem("wechat_user_info")).openid;
    }

    var map = {
        "openid": openid,
        "mobileNo": $.cookie('uid'),
        "name": $('#company_name').val(),
        "uscc": $('#uscc').val(),
        "businessScope": $('#business_scope').val(),
        "contactName": $('#contact_name_1').val(),
        "idCard": $('#id_card').val(),
        "contactPhone": $('#contact_phone_1').val(),
        "contactEmail": $('#contact_email').val(),
        "title": title
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
                        
                        saveUserBrand();
                    }, 2000);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function saveUserBrand() {
    var map = {
        "mobileNo": $.cookie('uid'),
        "brandName": $('#brand_1').val(),
        "categoryCode": '',
        "businessModeName": ''
    }
    
    if($.info.brand != "") {
        map.id = $.info.brand;
    }
    
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/brand/wx/saveOrUpdate",
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
                $.cookie('brand_1',$('#brand_1').val());
                
                $(function(){
                    var $toast = $('#js_toast');
                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.fadeOut(100);
                        if(getURLParameter('type') && getURLParameter('type') != ''){
                            if(getURLParameter('type') == 'leasing') {
                                window.location.href = '/v2/shop?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode')+'&info=done&payment=deposit';
                            } else {
                                window.location.href = '/v2/info';
                            }
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