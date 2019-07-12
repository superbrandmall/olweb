$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                $('.reset-succeeded').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('.login-box-body').offset().top
                }, 0);
                break;
            case "fail":
                $('.reset-failed').show().delay(2000).hide(0);
                $('html, body').animate({
                    scrollTop: $('.login-box-body').offset().top
                }, 0);
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/brands-admin/"+refineUrl() );
        },1000);
    }
    
    ///////////////////// Validate login form /////////////////////////
    $("#reset_form").validate({
        rules: {
            old_password: {
                required: true
            },
            login_password: {
                required: true,
                minlength: 8
            },
            login_password_2: {
                required: true,
                minlength: 8,
                numChar: true,
                equalTo: "#login_password"
            }
        },
        messages: {
            old_password: {
                required: "请输入原密码"
            },
            login_password: {
                required: "请输入新密码",
                minlength: "新密码须为{0}位及{0}位以上字母和数字"
            },
            login_password_2: {
                required: "请再输一遍新密码",
                minlength: "新密码须为{0}位及{0}位以上字母和数字",
                numChar: "新密码须为{0}位及{0}位以上字母和数字",
                equalTo: "两遍新密码输入不一致"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {            
            var old_password = $('#old_password').val();
            var password = $('#login_password').val();
    
            var map = {
                code: $.cookie('login'),
                newPassword: password,
                oldPassword: old_password,
                verificationCodeCheck: {
                    code: '1',
                    key: '1',
                    keyword: '1',
                    verifyType: '1'
                }
            };
            
            $.ajax({
                url: $.api.baseNew+"/common-authorization/api/passport/change/password2",
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
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie('login', xhr.getResponseHeader("Login"));
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        
                        $('#loader').hide();
                        window.location.href = "reset?s=succeed";
                    } else {
                        $('#loader').hide();
                        window.location.href = "reset?s=fail";
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
            
        }
    });
});

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");