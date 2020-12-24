$.info = {
    company: "",
    name: "",
    brand: ""
};

$(document).ready(function(){
    findUserCompanyByMobileNo();
    findUserBrandByMobileNo();
    
    $(function(){
        TagNav('#tagnav',{
            type: 'scrollToNext',
            curClassName: 'weui-state-active',
            index: 0
        });
    });
    
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
    
    $('#improve_invoice').click(function(){
        if($('#mailing_address').val() == '' && $('#mailing_address').attr('placeholder') != ''){
            $('#mailing_address').val($('#mailing_address').attr('placeholder'));
        }

        if($('#invoice_address').val() == '' && $('#invoice_address').attr('placeholder') != ''){
            $('#invoice_address').val($('#invoice_address').attr('placeholder'));
        }

        if($('#street_address').val() == '' && $('#street_address').attr('placeholder') != ''){
            $('#street_address').val($('#street_address').attr('placeholder'));
        }

        if($('#billing_address').val() == '' && $('#billing_address').attr('placeholder') != ''){
            $('#billing_address').val($('#billing_address').attr('placeholder'));
        }
    })
    
    $("#invoice").validate({
        rules: {
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
            tax_payer_type: {
                required: true
            },
            invoice_type: {
                required: true
            }
        },
        messages: {
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
            tax_payer_type: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            invoice_type: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveUserInvoice();
        }
    });
    
    $("#bank_account").blur(function(){
        if($(this).val() != '' && $(this).val().length >= 16){
            var bank = bankCardAttribution($(this).val());
            var bankN = bank.bankName;
            $('#bank_name').val(bankN);
        }
    });
    
    $("#bank").validate({
        rules: {
            bank_name: {
                required: true
            },
            bank_account: {
                required: true
            }
        },
        messages: {
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
            saveUserBank();
        }
    });
    
    $('#improve_authorization').click(function(){
        if($('#authName').val() == '' && $('#authName').attr('placeholder') != ''){
            $('#authName').val($('#authName').attr('placeholder'));
        }
        
        if($('#authPhone').val() == '' && $('#authPhone').attr('placeholder') != ''){
            $('#authPhone').val($('#authPhone').attr('placeholder'));
        }

        if($('#authIdentity').val() == '' && $('#authIdentity').attr('placeholder') != ''){
            $('#authIdentity').val($('#authIdentity').attr('placeholder'));
        }
        
        if($('#authEmail').val() == '' && $('#authEmail').attr('placeholder') != ''){
            $('#authEmail').val($('#authEmail').attr('placeholder'));
        }
    })
    
    $("#authorization").validate({
        rules: {
            authName: {
                required: true
            },
            authPhone: {
                required: true,
                digits: true
            },
            authIdentity: {
                required: true
            },
            authEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            authName: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            authPhone: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                digits: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            authIdentity: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            authEmail: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveAuthorizationPerson();
        }
    });
});

function showForm(form) {
    $('.weui-form__control-area').hide();
    $('#'+form).fadeIn();
}

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
                
                if(response.data.length > 0){
                    $.info.company = response.data[0].id;
                    $('#company_name').val(response.data[0].name);
                    $('#uscc').val(response.data[0].uscc);
                    $('#business_scope').val(response.data[0].businessScope);
                    $('#contact_name_1').val(response.data[0].contactName);
                    $('#id_card').val(response.data[0].idCard);
                    $('#contact_phone_1').val(response.data[0].contactPhone);
                    $('#contact_email').val(response.data[0].contactEmail);
                    if(response.data[0].title != '业务拓展负责人' && response.data[0].title != '公司负责人/总经理' && response.data[0].title != '中介') {
                        $('#job_title').val('others');
                        $('#other_job').val(response.data[0].title);
                        $('#other_jobs').css('display','flex');
                    } else {
                        $('#job_title').val(response.data[0].title);
                    }
                    
                    $('#mailing_address').val(response.data[0].mailingAddress);
                    $('#invoice_address').val(response.data[0].invoiceAddress);
                    $('#invoice_phone').val(response.data[0].invoicePhone);
                    $('#street_address').val(response.data[0].streetAddress);
                    $('#billing_address').val(response.data[0].billingAddress);
                    if(response.data[0].taxPayerType != '' && response.data[0].taxPayerType != null){
                        $('#tax_payer_type').val(response.data[0].taxPayerType);
                    }
                    if(response.data[0].invoiceType != '' && response.data[0].invoiceType != null){
                        $('#invoice_type').val(response.data[0].invoiceType);
                    }
                    
                    $('#bank_account').val(response.data[0].bankAccount);
                    $('#bank_name').val(response.data[0].bankName);
                    
                    $('#authName').val(response.data[0].authName);
                    $('#authPhone').val(response.data[0].authPhone);
                    $('#authIdentity').val(response.data[0].authIdentity);
                    $('#authEmail').val(response.data[0].authEmail);
                }
            }
        }
    })
}

function findUserCompanyByMobileNo1() {
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
                
                if(response.data.length > 0){
                    $.info.company = response.data[0].id;
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
                        if($('#mailing_address').val() == ''){
                            $('#mailing_address').attr('placeholder',response.data.regLocation);
                        }
                        
                        if($('#invoice_address').val() == ''){
                            $('#invoice_address').attr('placeholder',response.data.regLocation);
                        }
                        
                        if($('#street_address').val() == ''){
                            $('#street_address').attr('placeholder',response.data.regLocation);
                        }
                        
                        if($('#billing_address').val() == ''){
                            $('#billing_address').attr('placeholder',response.data.regLocation);
                        }
                        
                        $('#legal_person').val(response.data.legalPersonName);
                        
                        if($('#authName').val() == ''){
                            $('#authName').attr('placeholder',response.data.legalPersonName);
                        }
                        
                        if($('#authIdentity').val() == ''){
                            $('#authIdentity').attr('placeholder', $('#id_card').val());
                        }
                        
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
    
    
    var map = {
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
                
                TagNav('#tagnav',{
                    index: 1
                });
                showForm('invoice');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function saveUserInvoice() {
    findUserCompanyByMobileNo1();
    var map = {
        "mobileNo": $.cookie('uid'),
        "mailingAddress": $('#mailing_address').val(),
        "invoiceAddress": $('#invoice_address').val(),
        "invoicePhone": $('#invoice_phone').val(),
        "streetAddress": $('#street_address').val(),
        "billingAddress": $('#billing_address').val(),
        "taxPayerType": $('#tax_payer_type').val(),
        "invoiceType": $('#invoice_type').val()
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
                        
                        TagNav('#tagnav',{
                            index: 2
                        });
                        showForm('bank');
                    }, 2000);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function saveUserBank() {
    findUserCompanyByMobileNo1();
    var map = {
        "mobileNo": $.cookie('uid'),
        "bankName": $('#bank_name').val(),
        "bankAccount": $('#bank_account').val()
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
                        
                        TagNav('#tagnav',{
                            index: 3
                        });
                        showForm('authorization');
                    }, 2000);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function saveAuthorizationPerson() {
    findUserCompanyByMobileNo1();
    var map = {
        "mobileNo": $.cookie('uid'),
        "authName": $('#authName').val(),
        "authPhone": $('#authPhone').val(),
        "authIdentity": $('#authIdentity').val(),
        "authEmail": $('#authEmail').val()
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
                        if(getURLParameter('type') && getURLParameter('type') != ''){
                            if(getURLParameter('type') == 'leasing') {
                                window.location.href = '/v2/shop?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode')+'&info=done';
                            } else if(getURLParameter('type') == 'events') {
                                window.location.href = '/v2/event?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode')+'&info=done';
                            } else if(getURLParameter('type') == 'ads') {
                                window.location.href = '/v2/advertising-shopping-cart?type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode')+'&info=done';
                            } else if(getURLParameter('type') == 'ad') {
                                window.location.href = '/v2/ad?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode')+'&info=done';
                            } else if(getURLParameter('type') == 'ad-package') {
                                window.location.href = '/v2/advertising-package?type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode')+'&info=done';
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