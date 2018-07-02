$(document).ready(function(){
    $('#login_verify').val('');
    ///////////////////// Validate login form /////////////////////////
    if($.cookie('lang') === 'en-us'){
        var login_username_required = "Please give a mobile number or email address";
        var login_username_xor = "Please give a correct mobile number or email address";
        var login_verify_required = "Verification code can't be empty";
        var login_verify_rangelength = "Verification code must be {0} digits";
        var login_verify_numChar = "Verification code comprises letters and digits";
    } else {
        var login_username_required = "请输入手机号码或者邮箱地址";
        var login_username_xor = "请输入正确的手机号码或者邮箱地址";
        var login_verify_required = "验证码为必填项";
        var login_verify_rangelength = "验证码须为{0}位字母和数字";
        var login_verify_numChar = "验证码为字母和数字组合";
    }
    
    $("#login_form").validate({
        rules: {
            login_username: {
                required: true,
                xor: [{
                    digits: true,
                    rangelength: [11,11]
                },{
                    email: true
                }]
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
                xor: login_username_xor
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
            if($('#login_username').val().search('@') != '-1'){
                key = $.api.emailVC;
            } else {
                key = $.api.mobileVC;
            }            
            
            var map = {
                username: $('#login_username').val(),
                verificationCodeCheck: {
                    code: $('#login_verify').val(),
                    key: key,
                    keyword: $('#login_username').val()
                }
            };
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/login/login/simple",
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
                        $.cookie('international', response.data.international);
                        $.cookie('newlogin',1);
                        $.ajax({
                            type: 'POST',
                            url: 'controllers/api/1.0/ApiLoginSession.php',
                            data: {
                                user_code: response.data.code,
                                user_email: response.data.email,
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
    
    if(userName && (loginError == '' || $('#errorcontainer-login_verify').text() == '')) {
        var map, url, checkExist;
        if(userName.search('@') != '-1'){
            map = {
                mail : userName
            };
            checkExist = $.api.baseNew+"/common-authorization/api/passport/check/exist/email?email="+userName+"";
            url = $.api.baseNew+"/onlineleasing-customer/api/verify/mail";
        } else {
            map = {
                mobile : userName
            };
            checkExist = $.api.baseNew+"/common-authorization/api/passport/check/exist/mobile?mobile="+userName+"";
            url = $.api.baseNew+"/onlineleasing-customer/api/verify/sms";
        }
        
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

                            if(userName.search('@') != '-1'){
                                $.api.emailVC = response.data;
                            } else {
                                $.api.mobileVC = response.data;
                            }

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

$.validator.addMethod('xor', function(val, el, param) {
    var valid = false;
    
    //loop through sets of nested rules
    for(var i=0;i<param.length;i++){
        var setResult = true;
        
        //loop through nested rules in the set
        for(var x in param[i]){
            var result = $.validator.methods[x].call(this, val, el, param[i][x]);
            
            // If the input breaks one rule in a set we stop and move
            // to the next set...
            if(!result){
                setResult = false;
                break;
            }
        }
    
        // If the value passes for one set we stop with a true result
        if(setResult == true) {
            valid = true;
            break;
        }
    }
    
    // Return the validation result
    return this.optional(el) || valid;
}, "The value entered is invalid");

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");
