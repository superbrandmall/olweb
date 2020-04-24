$(document).ready(function(){
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
                required: "请输入手机号码",
                digits: "请输入正确的手机号码",
                rangelength: "请输入正确的手机号码"
            },
            login_verify: {
                required: "验证码",
                rangelength: "验证码须为{0}位数字",
                digits: "验证码须为{0}位数字"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var key = $.api.mobileVC;           
            var userName = $('#login_username').val();

            $.ajax({
                url: $.api.baseNew+"/comm-wechatol/api/sms/checkIdentifyCode?mobileNo="+userName+"&code="+$.api.mobileVC,
                type: "GET",
                async: false,
                beforeSend: function(request) {
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
                        $.cookie('uid', userName);
                        
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
                                $('#login').attr('disabled','disabled');
                                if(getURLParameter('type')){
                                    if(getURLParameter('type') == 'leasing'){
                                        window.location.href = '/v2/register?f='+getURLParameter('f')+'&type=leasing';
                                    } else if(getURLParameter('type') == 'ads'){
                                        window.location.href = '/v2/register?f='+getURLParameter('f')+'&type=ads';
                                    }
                                } else if(getURLParameter('id') != ''){
                                    window.location.href = '/v2/register-events?id='+getURLParameter('id');
                                } else {
                                    window.location.href = '/v2/register';
                                }
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
    
    if(userName != '') {
        $.ajax({
            url: $.api.baseNew+"/comm-wechatol/api/sms/sendIdentifyCode?mobileNo="+userName,
            type: "GET",
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                $.api.mobileVC = response.data.identifyCode;

                setTimeLogin(obj);
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function setTimeLogin(obj) {
    if (countdownLogin == 0) { 
        obj.attr('href','javascript: VeryficationCodeLogin()');
        obj.html("获取验证码");
        countdownLogin = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html("重新获取(" + countdownLogin + ")s");
        countdownLogin--; 
    } 
setTimeout(function() { 
    setTimeLogin(obj); }
    ,1000); 
}