$(document).ready(function(){
    $("#forget_password_email_form").validate({
        rules: {
            email: {
                required: true,
                email: true,
                remoteValidate: {
                    url: $.api.base+"/userinfo/check/exist/email",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    dataFilter: function(data,type) {
                        var very = JSON.parse(data).code;
                        if (very === 'C0')
                            return true;
                        else
                            return false;
                    } 
                }
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
                            $('#forget_email').attr('disabled','disabled');
                            $('#email_verify').attr('disabled','disabled');
                            $('#forget_password_email_verify_link').hide();
                            return true;
                        } else {
                            return false;
                        }
                    } 
                }
            },
            email_password: {
                required: true,
                minlength: 8,
                numChar: true
            },
            email_password_confirm: {
                required: true,
                minlength: 8,
                numChar: true,
                equalTo: "#email_password"
            }
        },
        messages: {
            email: {
                required: "邮箱地址为必填项",
                email: "请输入有效邮箱地址",
                remoteValidate: "该邮箱不存在"
            },
            email_verify: {
                required: "验证码为必填项",
                remoteVerificationCode: "验证码错误"
            },
            email_password: {
                required: "新密码为必填项",
                minlength: "新密码须为8位及8位以上字母和数字",
                numChar: "新密码须为8位及8位以上字母和数字"
            },
            email_password_confirm: {
                required: "请重复一遍密码",
                minlength: "新密码须为8位及8位以上字母和数字",
                numChar: "新密码须为8位及8位以上字母和数字",
                equalTo: "两遍新密码输入不一致"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var email = $('#forget_email').val();
            var password = $('#email_password').val();
            var key = $.api.emailVC;
            var value = $('#email_verify').val();
            
            var map = {
                username: email,
                password: password,
                verificationCode: {
                    key: key,
                    value: value
                }
            };
            
            $.ajax({
                url: $.api.base+"/userinfo/forget/password",
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
                        window.location.href = "home?k=login";
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });

});

var countdown=60;

function VeryficationCode() {
    var obj = $("#forget_password_email_verify_link");
    var email = $('#forget_email').val();
	
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
    if (countdown === 0) { 
        obj.attr('href','javascript: VeryficationCode()'); 
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
    setTime(obj); }
    ,1000); 
}

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");