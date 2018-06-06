$(document).ready(function(){
    ///////////////////// Validate change mobile form /////////////////////////
    if($("#change_mobile_form").length > 0){
        $("#change_mobile_form").validate({
            rules: {
                contact_phone_1: {
                    required: true,
                    rangelength: [11,11],
                    digits: true
                },
                phone_verify: {
                    required: true,
                    remoteVerificationCodeMobile: {
                        url: $.api.base+"/verificationcode/check",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        dataFilter: function(data,type) {
                            var very = JSON.parse(data).code;
                            if (very === 'C0'){
                                $('#contact_phone_1').attr('disabled','disabled');
                                $('#phone_verify').attr('disabled','disabled');
                                $('#phone_verify_link').hide();
                                return true;
                            } else {
                                return false;
                            }
                        } 
                    }
                }
            },
            messages: {
                contact_phone_1: {
                    required: "新手机号为必填项",
                    rangelength: "请输入正确手机号码",
                    digits: "请输入正确手机号码"
                },
                phone_verify: {
                    required: "验证码为必填项",
                    remoteVerificationCodeMobile: "验证码错误"
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo('#errorcontainer-' + element.attr('id'));
            },
            submitHandler: function() {
                var phone = $('#contact_phone_1').val();
                var key = $.api.mobileVC;
                var value = $('#phone_verify').val();
            
                var map = {
                    userCode: $.cookie('login'),
                    username: phone,
                    verificationCode: {
                        key: key,
                        value: value
                    }
                };

                $.ajax({
                    url: $.api.base+"/userinfo/change/mobile",
                    type: "POST",
                    data: JSON.stringify(map),
                    async: false,
                    dataType: "json",
                    contentType: "application/json",
                    beforeSend: function(request) {
                        $('#loader').show();
                        request.setRequestHeader("Login", $.cookie('login'));
                        request.setRequestHeader("Authorization", $.cookie('authorization'));
                        request.setRequestHeader("Lang", $.cookie('lang'));
                        request.setRequestHeader("Source", "onlineleasing");
                    },
                    complete: function(){},
                    success: function (response, status, xhr) {
                        $('#loader').hide();
                        interpretBusinessCode(response.code);
                        
                        if(response.code === 'C0') {
                            if(xhr.getResponseHeader("Authorization") !== null){
                                $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                            }
                            window.location.href = "logout?mobile-changed";
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                       console.log(textStatus, errorThrown);
                    }
                });
            }
        });
    }
    
    ///////////////////// Validate change email form /////////////////////////
    
    $("#change_email_form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            email_verify: {
                required: true,
                remoteVerificationCode: {
                    url: $.api.base+"/verificationcode/check",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    dataFilter: function(data,type) {
                        var very = JSON.parse(data).code;
                        if (very === 'C0'){
                            $('#email').attr('disabled','disabled');
                            $('#email_verify').attr('disabled','disabled');
                            $('#email_verify_link').hide();
                            return true;
                        } else {
                            return false;
                        }
                    } 
                }
            }
        },
        messages: {
            email: {
                required: "新邮箱地址为必填项",
                email: "请输入有效邮箱地址"
            },
            email_verify: {
                required: "验证码为必填项",
                remoteVerificationCode: "验证码错误"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var email = $('#email').val();
            var key = $.api.emailVC;
            var value = $('#email_verify').val();
            
            var map = {
                userCode: $.cookie('login'),
                username: email,
                verificationCode: {
                    key: key,
                    value: value
                }
            };
            
            $.ajax({
                url: $.api.base+"/userinfo/change/email",
                type: "POST",
                data: JSON.stringify(map),
                async: false,
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(request) {
                    $('#loader').show();
                    request.setRequestHeader("Login", $.cookie('login'));
                    request.setRequestHeader("Authorization", $.cookie('authorization'));
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                complete: function(){},
                success: function (response, status, xhr) {
                    $('#loader').hide();
                    interpretBusinessCode(response.code);
                    
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        window.location.href = "logout?email-changed";
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });

});

var countdown2=60;

function VeryficationCodePhone() {
    var obj = $("#phone_verify_link");
    var phone = $('#contact_phone_1').val();
	
    if(phone) {
        var map = {
            keyword : phone
        };
        $.ajax({
            url: $.api.base+"/verificationcode/mobile",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                $('#loader').hide();
                interpretBusinessCode(response.code);
                $.api.mobileVC = response.data.key;
                setTime2(obj);
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

var countdown=60;

function VeryficationCodeEmail() {
    var obj = $("#email_verify_link");
    var email = $('#email').val();
	
    if(email) {
        var map = {
            keyword : email
        };
        $.ajax({
            url: $.api.base+"/verificationcode/email",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                $('#loader').hide();
                interpretBusinessCode(response.code);
                
                $.api.emailVC = response.data.key;
                setTime(obj);
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function setTime(obj) {
    if (countdown == 0) { 
        obj.attr('href','javascript: VeryficationCodeEmail()'); 
        //obj.removeattr("disabled"); 
        obj.html("发送验证码");
        countdown = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html("重新发送(" + countdown + ")");
        countdown--; 
    } 
setTimeout(function() { 
    setTime(obj) }
    ,1000) 
}

function setTime2(obj) {
    if (countdown2 == 0) { 
        obj.attr('href','javascript: VeryficationCodePhone()'); 
        //obj.removeattr("disabled"); 
        obj.html("发送验证码");
        countdown2 = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html("重新发送(" + countdown2 + ")");
        countdown2--; 
    } 
setTimeout(function() { 
    setTime2(obj) }
    ,1000) 
}