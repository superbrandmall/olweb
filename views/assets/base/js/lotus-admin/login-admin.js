$(document).ready(function(){
    ///////////////////// Validate login form /////////////////////////
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
                required: "请输入手机号码",
                digits: "请输入正确的手机号码",
                rangelength: "请输入正确的手机号码"
            },
            login_verify: {
                required: "请输入密码",
                rangelength: "验证码须为{0}位字母和数字",
                digits: "验证码须为数字"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var key = $('#login_verify').val();           
            var userName = $('#login_username').val();
            
            $.ajax({
                url: $.api.base+"/comm-wechatol/api/sms/checkIdentifyCode?mobileNo="+userName+"&code="+key,
                type: "GET",
                async: false,
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(request) {
                    $('#loader').show();
                    request.setRequestHeader("Lang", 1);
                    request.setRequestHeader("Source", "onlineleasing");
                },
                complete: function(){},
                success: function (response, status, xhr) {
                    $('#loader').hide();
                    if(response.code === 'C0' && response.data.resultCode == '00') {
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie('login', xhr.getResponseHeader("Login"));
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        
                        $.ajax({
                            url: $.api.base+"/onlineleasing-customer/api/login/loginByMobile?mobile="+userName,
                            type: "POST",
                            async: false,
                            dataType: "json",
                            contentType: "application/json",
                            beforeSend: function(request) {
                                $('#loader').show();
                                request.setRequestHeader("Lang", 1);
                                request.setRequestHeader("Source", "onlineleasing");
                            },
                            complete: function(){},
                            success: function (response, status, xhr) {
                                $('#loader').hide();
                                if(response.code === 'C0' && $.isEmptyObject(response.data) == false ) {
                                    if(xhr.getResponseHeader("Login") !== null){
                                        $.cookie('login', xhr.getResponseHeader("Login"));
                                    }
                                    if(xhr.getResponseHeader("Authorization") !== null){
                                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                                    }
                                    
                                    var ucode = response.data.code;
                                    var uname = response.data.settings.name;
                                    $.cookie('uid', ucode);
                                    $.ajax({
                                        type: 'POST',
                                        url: '/controllers/api/1.0/ApiLotusAdminLoginSession.php',
                                        data: {
                                            user_code: ucode,
                                            user_name: uname
                                        },
                                        dataType: "json",
                                        beforeSend: function(request) {
                                            $('#loader').show();
                                            request.setRequestHeader("Lang", 1);
                                            request.setRequestHeader("Source", "onlineleasing");
                                        },
                                        complete: function(){
                                            $('#loader').hide();
                                            var flag = 1;
                                            if(response.data.userModules.length > 0){
                                                var userModules = [];
                                                
                                                $.each(response.data.userModules, function(i,v) {
                                                    if(v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE210706000001' || v.roleCode == 'CROLE211008000001' || v.roleCode == 'CROLE220301000001'){
                                                        // 云之家openId v.roleCode == 'CROLE220301000001'
                                                        userModules.push(v);
                                                    }
                                                    
                                                    /*if (v.userCode == 'CUSER200524000004') {
                                                        flag = 0;
                                                    }*/
                                                })
                                                $.cookie('userModules',JSON.stringify(userModules));
                                            }
                                            
                                            if(flag == 1){
                                                window.location.href = "contracts";
                                            }
                                            
                                        }
                                    });
                                } else {
                                    $('#loader').hide();
                                    $('.login-failed').show().delay(10000).hide(0);
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                $('#loader').hide();
                                $('.login-failed').show().delay(10000).hide(0);
                            }
                        });
                    } else {
                        $('#loader').hide();
                        $('.login-failed').show().delay(10000).hide(0);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $('#loader').hide();
                    $('.login-failed').show().delay(10000).hide(0);
                }
            });
            
        }
    });
});

var countdownLogin=60;

function VeryficationCodeLogin() {
    var obj = $("#login_verify_link");
    var userName = $('#login_username').val();
    
    if(userName != '') {
        $.ajax({
            url: $.api.base+"/comm-wechatol/api/sms/sendIdentifyCode?mobileNo="+userName,
            type: "GET",
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Lang", 1);
                request.setRequestHeader("Source", "onlineleasing");
            },
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    $('#loader').hide();
                    setTimeLogin(obj);
                } else {
                    $('#loader').hide();
                    $('.login-failed').show().delay(10000).hide(0);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#loader').hide();
                $('.login-failed').show().delay(10000).hide(0);
            }
        });
    }
}

function setTimeLogin(obj) {
    if (countdownLogin == 0) { 
        obj.attr('href','javascript: VeryficationCodeLogin()');
        obj.html("发送验证码");
        countdownLogin = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html("重新发送(" + countdownLogin + ")秒");
        countdownLogin--; 
    } 
setTimeout(function() { 
    setTimeLogin(obj); }
    ,1000); 
}