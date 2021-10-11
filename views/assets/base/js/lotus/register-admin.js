$.info = {
    user: "",
    company: "",
    brand: ""
};

$(document).ready(function(){
    getBrandCategory();
    findUserInfoByMobileNo();
    
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
                required: true,
                email: true
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
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                email: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveUserInfo();
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
} 

function findUserInfoByMobileNo() {
    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/info/wx/findAllByMobileNo?mobileNo="+$.cookie('uid'),
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
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                findUserCompanyByMobileNo();
                if(response.data != ''){
                    $.info.user = response.data.id;
                    $('#contact_name_1').val(response.data.name);
                    $('#email').val(response.data.email);
                }
            }
        }
    })
}

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
                findUserBrandByMobileNo();
                if(response.data != null && response.data != ''){
                    $.info.company = response.data.id;
                    $('#company_name').val(response.data.name);
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
                    $('#operation_1').val(response.data[0].businessModeName);
                    $('#category_1').val(response.data[0].categoryCode);
                }
            }
        }
    })
}

function saveUserInfo() {
    var map = {
        "email": $('#email').val(),
        "mobileNo": $.cookie('uid'),
        "name": $('#contact_name_1').val()
    }

    if($.info.user != "") {
        map.id = $.info.user;
    }

    $.ajax({
        url: $.api.baseNew+"/comm-wechatol/api/user/info/wx/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(map),
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
                if(xhr.getResponseHeader("Authorization") !== null) {
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                saveUserCompany();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}

function saveUserCompany() {
    var map = {
        "mobileNo": $.cookie('uid'),
        "name": $('#company_name').val()
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
                
                saveUserBrand();
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
        "categoryCode": $('#category_1').find('option:selected').val(),
        "businessModeName": $('#operation_1').find('option:selected').val()
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
                
                if(getURLParameter('type') && getURLParameter('type') != ''){
                    if(getURLParameter('type') == 'leasing') {
                        window.location.href = '/v2/shop?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                    } else if(getURLParameter('type') == 'events') {
                        window.location.href = '/v2/event?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                    } else if(getURLParameter('type') == 'ads') {
                        window.location.href = '/v2/advertising-shopping-cart?type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                    } else if(getURLParameter('type') == 'ad') {
                        window.location.href = '/v2/ad?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                    } else {
                        window.location.href = '/v2/info';
                    }
                } else {
                    window.location.href = '/v2/info';
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    })
}