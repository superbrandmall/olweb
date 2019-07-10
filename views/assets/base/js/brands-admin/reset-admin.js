$(document).ready(function(){
    ///////////////////// Validate login form /////////////////////////
    $("#reset_form").validate({
        rules: {
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
            var map = {
                username: $('#login_username').val(),
                password: $('#login_password').val()
            };
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/login/login",
                type: "POST",
                data: map,
                async: false,
                beforeSend: function(request) {
                    $('#loader').show();
                    request.setRequestHeader("Lang", 1);
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
                        
                        var ucode = response.data.code;
                        
                        $.ajax({
                            url: $.api.baseNew+"/common-authorization/api/passport/check/exist/userrole?userCode="+ucode+"&role=admin",
                            type: "GET",
                            async: false,
                            beforeSend: function(request) {
                                request.setRequestHeader("Lang", $.cookie('lang'));
                                request.setRequestHeader("Source", "onlineleasing");
                            },
                            success: function (response, status, xhr) {
                                if(response.code === 'C0') {
                                    if(xhr.getResponseHeader("Login") !== null){
                                        $.cookie('login', xhr.getResponseHeader("Login"));
                                    }
                                    if(xhr.getResponseHeader("Authorization") !== null){
                                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                                    }
                                    $('#loader').hide();
                                    window.location.href = "reset";
                                } else {
                                    $('#loader').hide();
                                    $('.reset-failed').show().delay(10000).hide(0);
                                }                               
                            }
                        }); 
                    } else {
                        $('#loader').hide();
                        $('.reset-failed').show().delay(10000).hide(0);
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