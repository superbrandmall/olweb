$.register = {
    getBrandByCode: true
};

$(document).ready(function(){
    $('#international_verify').val('');
    getBrandModality0();
    
    $('#brand_name').blur(function(){
        if($.register.getBrandByCode === true){
            GetBrandByCode($('#hidden_brand_code').val() || null);
        }
    });
    
    $('#brand_name').change(function(){
        $.register.getBrandByCode = true;
    });
    
  ///////////////////// Validate registratrion form /////////////////////////
  if($.cookie('lang') === 'en-us'){
        var register_mobile_required = "Mobile can't be empty";
        var register_mobile_rangelength = "Please give a correct mobile number";
        var register_mobile_digits = "Please give a correct mobile number";
        var register_mobile_remoteValidate = "Mobile number already exists"; 
        var register_international_verify_required = "Verification code can't be empty";
        var register_international_verify_rangelength = "Verification code must be {0} digits or letters";
        var register_international_verify_numChar = "Verification code comprises digits or letters";
        var register_terms = "Please accept and tick the box";
    } else {
        var register_mobile_required = "手机为必填项";
        var register_mobile_rangelength = "请输入正确手机号码";
        var register_mobile_digits = "请输入正确手机号码";
        var register_mobile_remoteValidate = "手机号已存在";
        var register_international_verify_required = "验证码为必填项";
        var register_international_verify_rangelength = "验证码须为{0}位及{0}位以上数字或字母";
        var register_international_verify_numChar = "验证码为数字或字母组合";
        var register_terms = "请同意并勾选该协议";
    }
    
    $("#step1 form").validate({
        onkeyup: false,
        rules: {
            mobile: {
                required: true,
                rangelength: [11,11],
                digits: true,
                remoteValidate: {
                    url: $.api.baseNew+"/common-authorization/api/passport/check/isNotExist/mobile",
                    type: "GET",
                    dataFilter: function(data,type) {
                        var very = JSON.parse(data).code;
                        if (very === 'C0')
                            return true;
                        else
                            return false;
                    } 
                }
            },
            international_verify: {
                required: true,
                rangelength: [6,6],
                numChar: true
            },
            terms: "required"
        },
        messages: {
            mobile: {
                required: register_mobile_required,
                rangelength: register_mobile_rangelength,
                digits: register_mobile_digits,
                remoteValidate: register_mobile_remoteValidate
            },
            international_verify: {
                required: register_international_verify_required,
                rangelength: register_international_verify_rangelength,
                numChar: register_international_verify_numChar
            },
            terms: register_terms
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var mobile = $('#mobile').val();
            var key = $.api.mobileVC;
            var vt = 'mobile';
            
            var map = {
                email: 'default@domain.com',
                international: 0,
                lang: 0,
                mobile: mobile,
                password: null,
                verificationCodeCheck: {
                    code: $('#international_verify').val(),
                    key: key,
                    keyword: $('#international_verify').val(),
                    verifyType: vt
                },
                userName: '1'
            };
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/v2/register/registerSimple",
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
                        $.cookie('newlogin',1);
                        
                        $.post("controllers/api/1.0/ApiRegisterSession.php", {
                            user_code: response.data.code,
                            merchant_mobile: response.data.mobile
                        }).done(function(data){
                            window.location.reload(false);
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

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");


var countdownInternational=60;

function VeryficationCodeInternational() {
    var obj = $("#international_verify_link");
    var map, url;
    
    if($('#mobile').val() != '') {
        map = {
            mobile : $('#mobile').val()
        };
        url = $.api.baseNew+"/onlineleasing-customer/api/verify/sms";
    
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

                $.api.mobileVC = response.data; 

                setTimeInternational(obj);
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
    
}

function setTimeInternational(obj) {
    if (countdownInternational == 0) { 
        obj.attr('href','javascript: VeryficationCodeInternational()'); 
        obj.html($.lang.sendVerificationCode);
        countdownInternational = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html($.lang.resendCode+"(" + countdownInternational + ")s");
        countdownInternational--; 
    } 
setTimeout(function() { 
    setTimeInternational(obj); }
    ,1000); 
}