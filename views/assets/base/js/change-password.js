$(document).ready(function(){
    if(getURLParameter('k')){
        switch (getURLParameter('k')) {
            case "changed":
                $('.cpwd-succeed').show().delay(2000).hide(0);
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/"+refineUrl() );
        },1000);
    }
    
    $("#change_password_form").validate({
        rules: {
            old_password: {
                required: true
            },
            password: {
                required: true,
                minlength: 8,
                numChar: true
            },
            password_confirm: {
                required: true,
                minlength: 8,
                numChar: true,
                equalTo: "#password"
            },
            phone_verify: {
                required: true,
                rangelength: [6,6],
                numChar: true
            }
        },
        messages: {
            old_password: {
                required: translateToEng("原密码为必填项")
            },
            password: {
                required: translateToEng("新密码为必填项"),
                minlength: translateToEng("新密码须为8位及8位以上字母和数字"),
                numChar: translateToEng("新密码须为8位及8位以上字母和数字")
            },
            password_confirm: {
                required: translateToEng("请重复一遍密码"),
                minlength: translateToEng("新密码须为8位及8位以上字母和数字"),
                numChar: translateToEng("新密码须为8位及8位以上字母和数字"),
                equalTo: translateToEng("两遍新密码输入不一致")
            },
            phone_verify: {
                required: "验证码为必填项",
                rangelength: "验证码须为{0}位及{0}位以上字母和数字",
                numChar: "验证码为字母和数字组合"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var old_password = $('#old_password').val();
            var password = $('#password').val();
            var key = $.api.mobileVC;
            var value = $('#phone_verify').val();
            
            
            var map = {
                code: $.cookie('login'),
                newPassword: password,
                oldPassword: old_password,
                verificationCodeCheck: {
                    code: value,
                    key: key
                }
            };
            
            $.ajax({
                url: $.api.baseNew+"/common-authorization/api/passport/change/password",
                type: "PUT",
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
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        window.location.href = "change-password?k=changed";
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

var countdown2=60;

function VeryficationCodePhone() {
    var obj = $("#phone_verify_link");
    var mobile = $('#mobile').val();
	
    if(mobile) {
        var map = {
            mobile : mobile
        };
        $.ajax({
            url: $.api.baseNew+"/onlineleasing-customer/api/verify/sms",
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
                interpretBusinessCode(response.customerMessage);
                
                $.api.mobileVC = response.data;
                setTime2(obj);
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function setTime2(obj) {
    if (countdown2 == 0) { 
        obj.attr('href','javascript: VeryficationCodePhone()'); 
        obj.html("发送验证码");
        countdown2 = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html("重新发送(" + countdown2 + ")");
        countdown2--; 
    } 
setTimeout(function() { 
    setTime2(obj); }
    ,1000); 
}

function translateToEng(c) {
    switch(c){
        case '原密码为必填项':
            c = "Current password is mandatory to fill";
            break;
        case '新密码为必填项':
            c = "New password is mandatory to fill";
            break;
        case '新密码须为8位及8位以上字母和数字':
            c = "New password must contain at least 8 letters and digits";
            break;
        case '请重复一遍密码':
            c = "Please repeat the password";
            break;
        case '两遍新密码输入不一致':
            c = "Given passwords don't match";
            break;
    }
    
    return c;
}

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");