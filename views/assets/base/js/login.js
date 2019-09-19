$(document).ready(function(){
    $('#login_verify').val('');
    ///////////////////// Validate login form /////////////////////////
    if($.cookie('lang') === 'en-us'){
        var login_username_required = "Please give a mobile number";
        var login_username_xor = "Please give a correct mobile number";
        var login_verify_required = "Verification code can't be empty";
        var login_verify_rangelength = "Verification code must be {0} digits";
        var login_verify_numChar = "Verification code comprises letters and digits";
    } else {
        var login_username_required = "请输入手机号码";
        var login_username_xor = "请输入正确的手机号码";
        var login_verify_required = "验证码为必填项";
        var login_verify_rangelength = "验证码须为{0}位字母和数字";
        var login_verify_numChar = "验证码为字母和数字组合";
    }
    
    $("#login_form").validate({
        rules: {
            login_username: {
                required: true,
                digits: true,
                rangelength: [11,11]
            },
            login_verify: {
                required: true,
                rangelength: [6,6],
                numChar: true
            }
        },
        messages: {
            login_username: {
                required: login_username_required,
                digits: login_username_xor,
                rangelength: login_username_xor
            },
            login_verify: {
                required: login_verify_required,
                rangelength: login_verify_rangelength,
                numChar: login_verify_numChar
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var key;
            key = $.api.mobileVC;           
            
            var map = {
                username: $('#login_username').val(),
                verificationCodeCheck: {
                    code: $('#login_verify').val(),
                    key: key,
                    keyword: $('#login_username').val()
                }
            };
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/v2/login/login",
                type: "POST",
                data: JSON.stringify(map),
                async: false,
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(request) {
                    $('#loader').show();
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                complete: function(){},
                success: function (response, status, xhr) {
                    $('#loader').hide();
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie('login', xhr.getResponseHeader("Login"));
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        $.cookie('uid', response.data.code);
                        $.cookie('newlogin',1);
                        
                        $.ajax({
                            type: 'POST',
                            url: 'controllers/api/1.0/ApiLoginSession.php',
                            data: {
                                user_code: response.data.code,
                                merchant_mobile: response.data.mobile
                            },
                            dataType: "json",
                            beforeSend: function(request) {
                                $('#loader').show();
                            },
                            complete: function(){
                                $('#loader').hide();
                                window.location.reload(false);
                            }
                        });
                    } else {
                        interpretBusinessCode(response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
            
        }
    });
});

var countdownLogin=60;

function VeryficationCodeLogin() {
    var obj = $("#login_verify_link");
    var userName = $('#login_username').val();
    var loginError = $('#errorcontainer-login_verify').html();
    
    if(userName != '') {
        var map, url, checkExist;
        map = {
            mobile : userName
        };
        checkExist = $.api.baseNew+"/common-authorization/api/passport/check/exist/mobile?mobile="+userName+"";
        url = $.api.baseNew+"/onlineleasing-customer/api/verify/sms";
        
        
        $.ajax({
            url: checkExist,
            type: "GET",
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: map,
                        async: false,
                        beforeSend: function(request) {
                            $('#loader').show();
                            request.setRequestHeader("Lang", $.cookie('lang'));
                            request.setRequestHeader("Source", "onlineleasing");
                        },
                        complete: function(){},
                        success: function (response, status, xhr) {
                            $('#loader').hide();
                            interpretBusinessCode1(response.customerMessage);
                            
                            $.api.mobileVC = response.data;

                            setTimeLogin(obj);
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                           console.log(textStatus, errorThrown);
                        }
                    });
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            }
        });
    }
}

function setTimeLogin(obj) {
    if (countdownLogin == 0) { 
        obj.attr('href','javascript: VeryficationCodeLogin()');
        obj.html($.lang.sendVerificationCode);
        countdownLogin = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html($.lang.resendCode+"(" + countdownLogin + ")s");
        countdownLogin--; 
    } 
setTimeout(function() { 
    setTimeLogin(obj); }
    ,1000); 
}

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");