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
                    hideLoading();
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie('login', xhr.getResponseHeader("Login"));
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }
                        
                        $.cookie('uid_temp', userName);
                        if(response.data.resultCode === '00') {
                            $.cookie('uid', userName);

                            $.ajax({
                                type: 'POST',
                                url: '/controllers/api/2.0/ApiLoginSession.php',
                                data: {
                                    uid: userName
                                },
                                dataType: "json",
                                beforeSend: function(request) {
                                    showLoading();
                                },
                                complete: function(){
                                    hideLoading();
                                    if(getURLParameter('type')){
                                        if(getURLParameter('type') == 'leasing'){
                                            window.location.href = '/v2/register?f='+getURLParameter('f')+'&type=leasing';
                                        } else if(getURLParameter('type') == 'ads'){
                                            window.location.href = '/v2/register?f='+getURLParameter('f')+'&type=ads';
                                        }
                                    } else if(getURLParameter('id')){
                                        window.location.href = '/v2/register-events?id='+getURLParameter('id');
                                    } else {
                                        window.location.href = '/v2/register';
                                    }
                                }
                            });
                        } else {
                            $(function(){
                                $('body').append('<div id="js_toast" style="display: none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-icon-cancel weui-icon_toast" style="color: #FA5151;"></i><p class="weui-toast__content">验证码错误</p></div></div>');
                                var $toast = $('#js_toast');

                                $('.page.cell').removeClass('slideIn');

                                $toast.fadeIn(100);
                                setTimeout(function () {
                                    $toast.fadeOut(100);
                                    window.location.reload();
                                }, 2000);
  
                            });
                        }
                        
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
                showLoading();
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function (response, status, xhr) {
                hideLoading();
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
    setTimeLogin(obj); }
    ,1000); 
}