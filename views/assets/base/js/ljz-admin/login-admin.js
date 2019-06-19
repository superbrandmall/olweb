$(document).ready(function(){
    ///////////////////// Validate login form /////////////////////////
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
            login_password: {
                required: true,
                minlength: 8
            }
        },
        messages: {
            login_username: {
                required: "请输入手机号码或者邮箱地址",
                xor: "请输入正确的手机号码或者邮箱地址"
            },
            login_password: {
                required: "请输入密码",
                minlength: "密码须为{0}位及{0}位以上字母和数字"
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
                                    $.cookie('uid', ucode);
                                    $.ajax({
                                        type: 'POST',
                                        url: '/controllers/api/1.0/ApiAdminLoginSession.php',
                                        data: {
                                            user_code: ucode
                                        },
                                        dataType: "json",
                                        beforeSend: function(request) {
                                            $('#loader').show();
                                            request.setRequestHeader("Lang", $.cookie('lang'));
                                            request.setRequestHeader("Source", "onlineleasing");
                                        },
                                        complete: function(){
                                            $('#loader').hide();
                                            window.location.href = "home";
                                        }
                                    });
                                } else {
                                    $('#loader').hide();
                                    $('.login-failed').show().delay(10000).hide(0);
                                }                               
                            }
                        }); 
                    } else {
                        $('#loader').hide();
                        $('.login-failed').show().delay(10000).hide(0);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
            
        }
    });
});

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