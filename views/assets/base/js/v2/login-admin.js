$(document).ready(function(){
    $('#login_username').val($.cookie('uid_temp'));
    $('#login_verify').val('');
    
    $("#login_form").validate({
        rules: {
            login_username: {
                required: true,
                digits: true,
                rangelength: [11,11]
            },
            login_verify: {
                required: true,
                rangelength: [4,4],
                digits: true
            }
        },
        messages: {
            login_username: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                digits: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                rangelength: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            },
            login_verify: {
                required: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                rangelength: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>',
                digits: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            showLoading();
            var userName = $('#login_username').val();
            var key = $('#login_verify').val();

            $.ajax({
                url: $.api.baseNew+"/comm-wechatol/api/sms/checkIdentifyCode?mobileNo="+userName+"&code="+key,
                type: "GET",
                async: false,
                beforeSend: function(request) {
                    showLoading();
                    $('#login').attr('disabled','disabled');
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                complete: function(){
                },
                success: function (response, status, xhr) {
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie('login', xhr.getResponseHeader("Login"));
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        
                        $.cookie('uid_temp', userName);
                        if(response.data.resultCode === '00') {
                            var map = {
                                "mobileNo": userName
                            }
                            
                            $.ajax({
                                url: $.api.baseNew+"/comm-wechatol/api/user/login/wx/saveOrUpdate",
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
                                        if(xhr.getResponseHeader("Authorization") !== null){
                                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                                        }
                                        
                                        $.ajax({
                                            url: $.api.baseNew+"/comm-wechatol/api/user/info/wx/findAllByMobileNo?mobileNo="+userName,
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
                                                    
                                                    $.cookie('uid', userName);
                                                    $.cookie('uname', userName);
                                                    $.cookie('uemail', userName);
                                                    
                                                    findUserBrandByMobileNo();
                                                    
                                                    $.ajax({
                                                        type: 'POST',
                                                        url: '/controllers/api/2.0/ApiLoginSession.php',
                                                        data: {
                                                            uid: userName
                                                        },
                                                        dataType: "json",
                                                        beforeSend: function(request) {
                                                        },
                                                        complete: function(){
                                                            hideLoading();
                                                            if(getURLParameter('id') && getURLParameter('id') != ''){
                                                                if(getURLParameter('type') && getURLParameter('type') != ''){
                                                                    if(getURLParameter('type') == 'leasing') {
                                                                        window.location.href = '/v2/shop?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                                                                    } else if(getURLParameter('type') == 'events') {
                                                                        window.location.href = '/v2/event?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                                                                    } else if(getURLParameter('type') == 'ad') {
                                                                        window.location.href = '/v2/ad?id='+getURLParameter('id')+'&type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                                                                    } else {
                                                                        window.location.href = '/v2/info';
                                                                    }
                                                                } else {
                                                                    window.location.href = '/v2/info';
                                                                }
                                                            } else {
                                                                if(getURLParameter('type') == 'ads') {
                                                                    window.location.href = '/v2/advertising-shopping-cart?type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                                                                } if(getURLParameter('type') == 'ad-package') {
                                                                    window.location.href = '/v2/advertising-package?type='+getURLParameter('type')+'&storeCode='+getURLParameter('storeCode');
                                                                } else {
                                                                    window.location.href = '/v2/info';
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        })
                                    } else {
                                        loginError('系统错误');
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                   console.log(textStatus, errorThrown);
                                }
                            });
                        } else {
                            loginError('验证码错误');
                        }
                        
                    } else {
                        loginError('系统错误');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
            
        }
    });
    
    
});

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
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.length > 0){
                    $.cookie('brand_1',response.data[0].brandName);
                }
            }
        }
    })
}

var countdownLogin=60;

function VeryficationCodeLogin() {
    var obj = $("#login_verify_link");
    var userName = $('#login_username').val();
    
    if(userName != '') {
        showLoading();
        $.ajax({
            url: $.api.baseNew+"/comm-wechatol/api/sms/sendIdentifyCode?mobileNo="+userName,
            type: "GET",
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){
            },
            success: function (response, status, xhr) {
                hideLoading();
                setTimeLogin(obj);
            },
            error: function(jqXHR, textStatus, errorThrown) {
               hideLoading();
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function setTimeLogin(obj) {
    if (countdownLogin == 0) { 
        obj.attr({
            'href':'javascript: VeryficationCodeLogin()',
            'disabled': false
        });
        obj.html("获取验证码");
        countdownLogin = 60; 
        return;
    } else {
        obj.attr({
            'href':'javascript: void(0)',
            'disabled': true
        });
        obj.html("重新获取(" + countdownLogin + ")");
        countdownLogin--; 
    }
    
    setTimeout(function() { 
        setTimeLogin(obj); 
    },1000); 
}

function loginError() {
    $('body').append('<div id="js_toast" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">验证码错误</p></div></div>');
    var $toast = $('#js_toast');

    $('.page.cell').removeClass('slideIn');

    $toast.fadeIn(100);
    setTimeout(function () {
        $toast.fadeOut(100);
        window.location.reload();
    }, 2000);
}