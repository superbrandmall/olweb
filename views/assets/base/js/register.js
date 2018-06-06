$(document).ready(function(){
    $('#international_verify').val('');
    getBrandModality1();
    
    /*setInterval(function(){
        $("header").load(location.href+" header>*","");
    }, 60000);*/
    
  ///////////////////// Validate login form /////////////////////////
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
            modality_1: {
                required: true
            },
            modality_2: {
                required: true
            },
            modality_3: {
                required: true
            },
            website: {
                url: true
            },
            terms: "required"
        },
        messages: {
            contact_name_1: {
                required: "姓名为必填项",
                minlength: "请输入完整姓名"
            },
            mobile: {
                required: "手机为必填项",
                rangelength: "请输入正确手机号码",
                digits: "请输入正确手机号码",
                remoteValidate: "手机号已存在"
            },
            email: {
                required: "公司邮箱为必填项",
                email: "请输入有效邮箱地址",
                remoteValidate: "公司邮箱已存在"
            },
            international: {
                required: "请选择验证方式"
            },
            international_verify: {
                required: "验证码为必填项",
                rangelength: "验证码须为{0}位及{0}位以上字母和数字",
                numChar: "验证码为字母和数字组合"
            },
            name: {
                required: "公司名称为必填项",
                minlength: "请输入正确公司名称"
            },
            brand_name: {
                required: "请输入品牌名称",
                minlength: "请输入完整品牌名称"
            },
            modality_1: {
                required: "请选择一级业态"
            },
            modality_2: {
                required: "请选择二级业态"
            },
            modality_3: {
                required: "请选择三级业态"
            },
            website: {
                url: "请输入有效网址"
            },
            terms: "请同意并勾选该协议"
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var brand_name = $('#brand_name').val();
            var email = $('#email').val();
            var file = $('#hidden_file').val();
            var international = $('#international').val();
            var merchant_name = $('#name').val();
            var mobile = $('#mobile').val();
            var modality = $('#modality_3').val();
            var website = $('#website').val();
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
                brandName: brand_name,
                email: email,
                file: file,
                international: 0,
                lang: 0,
                merchantName: merchant_name,
                mobile: mobile,
                modality: modality,
                password: '',
                verificationCodeCheck: {
                    code: $('#international_verify').val(),
                    key: key,
                    keyword: $('#international_verify').val(),
                    verifyType: vt
                },
                website: website,
                userName: user_name
            };
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/register/step/simple",
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
                        $.cookie('international', response.data.international);
                        $.cookie('newlogin',1);
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
    $('#file').on("change", function () {
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

    
function getBrandModality1() {
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if($.inArray(v.code,['00','01','02']) != -1){
            $.each(v.children, function(j,w) {
                $('#modality_1').append('<option value="'+w.code+'">'+w.name+'</option>');
            });
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
                        $('#modality_2').append('<option value="'+x.code+'">'+x.name+'</option>');
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
                            $('#modality_3').append('<option value="'+y.code+'">'+y.name+'</option>');
                        });
                    }
                });
            });
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
        obj.html("发送验证码");
        countdownInternational = 60; 
        return;
    } else { 
        obj.attr('href','javascript: void(0)');
        obj.html("重新发送(" + countdownInternational + ")");
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