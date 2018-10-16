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
        var register_contact_name_1_required = "First and last name can't be empty";
        var register_contact_name_1_minlength = "Please give correct first and last names";
        var register_mobile_required = "Mobile can't be empty";
        var register_mobile_rangelength = "Please give a correct mobile number";
        var register_mobile_digits = "Please give a correct mobile number";
        var register_mobile_remoteValidate = "Mobile number already exists";
        var register_email_required = "Email address can't be empty";
        var register_email_email = "Please give a correct email address";
        var register_email_remoteValidate = "Email address already exists";
        var register_international_required = "Please choose a verification method";
        var register_international_verify_required = "Verification code can't be empty";
        var register_international_verify_rangelength = "Verification code must be {0} digits or letters";
        var register_international_verify_numChar = "Verification code comprises digits or letters";
        var register_name_required = "Company name can't be empty";
        var register_name_minlength = "Please give a correct company name";
        var register_brand_name_required = "Brand name can't be empty";
        var register_brand_name_minlength = "Please give a correct brand name";
        var register_uscc_numchar = "USCC comprises digits and letters only";
        var register_uscc_required = "USCC can't be empty";
        var register_uscc_rangelength = "USCC must be {0} digits or letters";
        var register_modality_0_required = "Please choose category level 1";
        var register_modality_1_required = "Please choose category level 2";
        var register_modality_2_required = "Please choose category level 3";
        var register_modality_3_required = "Please choose category level 4";
        var register_terms = "Please accept and tick the box";
    } else {
        var register_contact_name_1_required = "姓名为必填项";
        var register_contact_name_1_minlength = "请输入完整姓名";
        var register_mobile_required = "手机为必填项";
        var register_mobile_rangelength = "请输入正确手机号码";
        var register_mobile_digits = "请输入正确手机号码";
        var register_mobile_remoteValidate = "手机号已存在";
        var register_email_required = "公司邮箱为必填项";
        var register_email_email = "请输入有效邮箱地址";
        var register_email_remoteValidate = "公司邮箱已存在";
        var register_international_required = "请选择验证方式";
        var register_international_verify_required = "验证码为必填项";
        var register_international_verify_rangelength = "验证码须为{0}位及{0}位以上数字或字母";
        var register_international_verify_numChar = "验证码为数字或字母组合";
        var register_name_required = "公司名称为必填项";
        var register_name_minlength = "请输入正确公司名称";
        var register_brand_name_required = "请输入品牌名称";
        var register_brand_name_minlength = "请输入完整品牌名称";
        var register_uscc_numchar = "统一社会信用代码由数字及字母组成";
        var register_uscc_required = "请输入统一社会信用代码";
        var register_uscc_rangelength = "统一社会信用代码长度必须为{0}位";
        var register_modality_0_required = "请选择一级业态";
        var register_modality_1_required = "请选择二级业态";
        var register_modality_2_required = "请选择三级业态";
        var register_modality_3_required = "请选择四级业态";
        var register_terms = "请同意并勾选该协议";
    }
    
    $("#step1 form").validate({
        onkeyup: false,
        rules: {
            contact_name_1: {
                required: true,
                minlength: 1
            },
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
            email: {
                required: true,
                email: true,
                remoteValidate: {
                    url: $.api.baseNew+"/common-authorization/api/passport/check/isNotExist/email",
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
            international: {
                required: true
            },
            international_verify: {
                required: true,
                rangelength: [6,6],
                numChar: true
            },
            name: {
                required: true,
                minlength: 3
            },
            brand_name: {
                required: true,
                minlength: 2
            },
            uscc: {
                numChar: true,
                required: true,
                rangelength: [18,18]
            },
            modality_0: {
                required: true
            },
            modality_1: {
                required: true
            },
            modality_2: {
                required: true
            },
            modality_3: {
                required: true
            },
            terms: "required"
        },
        messages: {
            contact_name_1: {
                required: register_contact_name_1_required,
                minlength:register_contact_name_1_minlength
            },
            mobile: {
                required: register_mobile_required,
                rangelength: register_mobile_rangelength,
                digits: register_mobile_digits,
                remoteValidate: register_mobile_remoteValidate
            },
            email: {
                required: register_email_required,
                email: register_email_email,
                remoteValidate: register_email_remoteValidate
            },
            international: {
                required: register_international_required
            },
            international_verify: {
                required: register_international_verify_required,
                rangelength: register_international_verify_rangelength,
                numChar: register_international_verify_numChar
            },
            name: {
                required: register_name_required,
                minlength: register_name_minlength
            },
            brand_name: {
                required: register_brand_name_required,
                minlength: register_brand_name_minlength
            },
            uscc: {
                numChar: register_uscc_numchar,
                required: register_uscc_required,
                rangelength: register_uscc_rangelength
            },
            modality_0: {
                required: register_modality_0_required
            },
            modality_1: {
                required: register_modality_1_required
            },
            modality_2: {
                required: register_modality_2_required
            },
            modality_3: {
                required: register_modality_3_required
            },
            terms: register_terms
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var brand_name = $('#brand_name').val();
            var email = $('#email').val();
            var international = $('#international').val();
            var merchant_name = $('#name').val();
            var modality = $('#modality_3').val();
            var uscc = $('#uscc').val();
            var mobile = $('#mobile').val();
            var user_name = $('#contact_name_1').val();
            
            var key, vt;
            if($('#international').children('option:selected').val() == "verify_email"){
                key = $.api.emailVC;
                vt = 'email';
            } else if($('#international').children('option:selected').val() == "verify_mobile"){
                key = $.api.mobileVC;
                vt = 'mobile';
            }

            var map = {
                brand : {
                    modality_3: modality,
                    name: brand_name
                },
                email: email,
                international: 0,
                lang: 0,
                merchant: {
                    name: merchant_name,
                    uscc: uscc
                },
                mobile: mobile,
                password: null,
                verificationCodeCheck: {
                    code: $('#international_verify').val(),
                    key: key,
                    keyword: $('#international_verify').val(),
                    verifyType: vt
                },
                userName: user_name
            };
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/v2/register/register",
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
                        $.cookie('international', response.data.settings.international);
                        $.cookie('newlogin',1);
                        $.cookie('merchantmodality', response.data.brandModality);
                        
                        $.post("controllers/api/1.0/ApiRegisterSession.php", {
                            user_code: response.data.code,
                            user_email: response.data.email,
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
    
    ///////////////////// File Uploading /////////////////////////////////////
    /*$('#file').on("change", function () {
        var formData = new FormData();
        formData.append('vo.userCode',  'register');
        formData.append('vo.containerName', 'test');
        formData.append('vo.prefix', 'register/file/file');
        formData.append('files', $('#file')[0].files[0]);
        $.ajax({
            type: "POST",
            url: $.api.baseNew+"/zuul/onlineleasing-file/api/upload/multi",
            data: formData,
            async: false,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(){},
            success: function(response, status, xhr) {
                $('#loader').hide();
                if(response.code === 'C0') {
                    $('#hidden_file').val(response.data[0].uri);
                } else {
                    interpretBusinessCode(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    });*/
    
    ///////////////////// Brand name tag suggestions /////////////////////////
    var tagSuggestion = new Bloodhound({
    datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
            url: $.api.baseNew+"/onlineleasing-customer/api/brand/findAllByNameContaining?name=QUERY",
            wildcard: 'QUERY',
            transform: function(response) {
                return $.map(response.data, function(brand) {
                    return {
                        value: brand.name,
                        code: brand.code
                    };
                });
            }
        }
    });
    
    $('#brand_name').typeahead(null,{
        display: 'value',
        source: tagSuggestion
    }).bind("typeahead:selected", function(obj, datum, name) {
        $('#hidden_brand_code').val(datum.code);
        GetBrandByCode(datum.code);
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
        if(setResult === true) {
            valid = true;
            break;
        }
    }
    
    // Return the validation result
    return this.optional(el) || valid;
}, "The value entered is invalid");

$.validator.addMethod('numChar',function(text){
    var regex = /^[0-9a-zA-Z\ ]+$|(^$)/;
    return regex.test(text);
}, "The value entered is invalid");

function getBrandModality0() {
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if($.inArray(v.code,['00','01','02']) != -1){
            if($.cookie('lang') === 'en-us'){
                $('#modality_0').append('<option value="'+v.code+'">'+v.remark+'</option>');
            } else {
                $('#modality_0').append('<option value="'+v.code+'">'+v.name+'</option>');
            }
        }
    });
}
    
function getBrandModality1(mod) {
    var m = mod;
	$('#modality_1').children().not(':first').remove();
    
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if(v.code == m) {
            if($.inArray(v.code,['00','01','02']) != -1){
                $.each(v.children, function(j,w) {
                    if($.cookie('lang') === 'en-us'){
                        $('#modality_1').append('<option value="'+w.code+'">'+w.remark+'</option>');
                    } else {
                        $('#modality_1').append('<option value="'+w.code+'">'+w.name+'</option>');
                    }
                });
            }
        }
    });
}

function getBrandModality2(mod) {
	var m = mod;
	$('#modality_2').children().not(':first').remove();
  
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if($.inArray(v.code,['00','01','02']) != -1){
            $.each(v.children, function(j,w) {
                if(w.code == m) {
                    $.each(w.children, function(k,x) {
                        if($.cookie('lang') === 'en-us'){
                            $('#modality_2').append('<option value="'+x.code+'">'+x.remark+'</option>');
                        } else {
                            $('#modality_2').append('<option value="'+x.code+'">'+x.name+'</option>');
                        }
                    });
                }
            });
        }
    });
}

function getBrandModality3(mod) {
	var m = mod;
	$('#modality_3').children().not(':first').remove();
  
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if($.inArray(v.code,['00','01','02']) != -1){
            $.each(v.children, function(j,w) {
                $.each(w.children, function(k,x) {
                    if(x.code == m) {
                        $.each(x.children, function(l,y) {
                            if($.cookie('lang') === 'en-us'){
                                $('#modality_3').append('<option value="'+y.code+'">'+y.remark+'</option>');
                            } else {
                                $('#modality_3').append('<option value="'+y.code+'">'+y.name+'</option>');
                            }
                        });
                    }
                });
            });
        }
    });
}

function GetBrandByCode(n) {
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/brand/findOneByCode/"+n+"",
        type: "GET",
        async: false,
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
            $.register.getBrandByCode = false;
            
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                if(response.data === null){
                    $('#modality_0').val("").attr('disabled',false);
                    $('#modality_1').val("").attr('disabled',false);
                    $('#modality_2').val("").attr("disabled",false);
                    $('#modality_3').val("").attr("disabled",false);
                } else {
                    var brand = response.data;
                    $('#hidden_brand_code').val(brand.code); 
                    $('#brand_name').val(brand.name);     
                    
                    getBrandModality0();
                    getBrandModality1(brand.modality_1.substr(0,2));
                    getBrandModality2(brand.modality_1);
                    getBrandModality3(brand.modality_2);
                    $('#modality_0').val(brand.modality_1.substr(0,2)).attr("disabled",true);
                    $('#modality_1').val(brand.modality_1).attr("disabled",true);
                    $('#modality_2').val(brand.modality_2).attr("disabled",true);
                    $('#modality_3').val(brand.modality_3).attr("disabled",true);
                    
                    $('#brand_name').val(brand.name).attr("disabled",false);
                }
                
                $('#hidden_brand_code').val(null);
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        }
    });
}

var countdownInternational=60;

function VeryficationCodeInternational() {
    var obj = $("#international_verify_link");
    var internationalError = $('#errorcontainer-international_verify').html();
    var map, url;
    
    if($('#international').children('option:selected').val() == "verify_mobile"){
        if($('#mobile').val() && (internationalError == '' || $('#errorcontainer-international_verify').text() == '')) {
            map = {
                mobile : $('#mobile').val()
            };
            url = $.api.baseNew+"/onlineleasing-customer/api/verify/sms";
        }
    } else if($('#international').children('option:selected').val() == "verify_email"){
        if($('#email').val() && (internationalError == '' || $('#errorcontainer-international_verify').text() == '')) {
            map = {
                mail : $('#email').val()
            };
            url = $.api.baseNew+"/onlineleasing-customer/api/verify/mail";
        }
    }
    
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
            
            
            if($('#international').children('option:selected').val() == "verify_email"){
                $.api.emailVC = response.data;
            } else if($('#international').children('option:selected').val() == "verify_mobile"){
                $.api.mobileVC = response.data;
            }

            setTimeInternational(obj);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
    
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

function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    if (year < 1700 || year > 2500) return false;
    if (month < 1 || month > 12) return false;
    return true;
}

function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year < 1700 || year > 2500) return false;
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > iaMonthDays[month - 1]) return false;
    return true;
}