$.settings = '';

$(document).ready(function(){
    if(getURLParameter('k')){
        switch (getURLParameter('k')) {
            case "updated":
                $('.cinfo-succeed').show().delay(2000).hide(0);
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/"+refineUrl() );
        },1000);
    }
    
    getBrandModality0();
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/v2/user/info/"+$.cookie('uid')+"",
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
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                $.settings = response.data.settings;
                $('#contact_name_1').val($.settings.name);
                $('#merchant_name').val(response.data.merchantName);
                $('#brand_name').val(response.data.brandName);
                
                var mod = [];
                mod = $.parseJSON(sessionStorage.getItem("modalities"));
                $.each(mod, function(i,v) {
                    if(v.code == response.data.brandModality.substr(0,2)) {
                        $('#modality_0').val(v.code);
                        getBrandModality1(v.code);
                        $.each(v.children, function(j,w) {
                            if(w.code == response.data.brandModality.substr(0,4)) {
                                $('#modality_1').val(w.code);
                                getBrandModality2(w.code);
                                $.each(w.children, function(k,x) {
                                    if(x.code == response.data.brandModality.substr(0,6)) {
                                        $('#modality_2').val(x.code);
                                        getBrandModality3(x.code);
                                        $.each(x.children, function(l,y) {
                                            if(y.code == response.data.brandModality) {
                                                $('#modality_3').val(y.code);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

                $('#contact_phone_1').val(response.data.mobile);
                $('#email').val(response.data.email);
                
                if(response.data.mobileVerified == 1){
                    $('#contact_phone_1').attr('disabled',true);
                    $('#contact_phone_1_verified').html('<span class="btn-danger btn-xs c-btn-uppercase">'+$.lang.certifiedNonRemodifiable+'</span>');
                } else {
                    $('#contact_phone_1').attr('disabled',false);
                    $('#contact_phone_1_verified').html('');
                }
                
                if(response.data.emailVerified == 1){
                    $('#email').attr('disabled',true);
                    $('#email_verified').html('<span class="btn-danger btn-xs c-btn-uppercase">'+$.lang.certifiedNonRemodifiable+'</span>');
                } else {
                    $('#email').attr('disabled',false);
                    $('#email_verified').html('');
                }
               
            } else {
                interpretBusinessCode(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
                
                
    ///////////////////// Validate my info form /////////////////////////
    if($.cookie('lang') === 'en-us'){
        var profile_contact_name_1_required = "First and last name can't be empty";
        var profile_contact_name_1_minlength = "Please give correct first and last names";
        var profile_contact_phone_1_required = "Mobile can't be empty";
        var profile_contact_phone_1_rangelength = "Please give a correct mobile number";
        var profile_contact_phone_1_digits = "Please give a correct mobile number";
        var profile_email_required = "Email address can't be empty";
        var profile_email_email = "Please give a correct email address";
    } else {
        var profile_contact_name_1_required = "姓名为必填项";
        var profile_contact_name_1_minlength = "请输入完整姓名";
        var profile_contact_phone_1_required = "手机为必填项";
        var profile_contact_phone_1_rangelength = "请输入正确手机号码";
        var profile_contact_phone_1_digits = "请输入正确手机号码";
        var profile_email_required = "公司邮箱为必填项";
        var profile_email_email = "请输入有效邮箱地址";
    }
    
    $("#my_info_form").validate({
        rules: {
            contact_name_1: {
                required: true,
                minlength: 1
            },
            contact_phone_1: {
                required: true,
                rangelength: [11,11],
                digits: true
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            contact_name_1: {
                required: profile_contact_name_1_required,
                minlength: profile_contact_name_1_minlength
            },
            contact_phone_1: {
                required: profile_contact_phone_1_required,
                rangelength: profile_contact_phone_1_rangelength,
                digits: profile_contact_phone_1_digits
            },
            email: {
                required: profile_email_required,
                email: profile_email_email
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var email = $('#email').val();
            var mobile = $('#contact_phone_1').val();
            $.settings.name = $('#contact_name_1').val();
            
            var map = {
                code: $.cookie('uid'),
                email: email,
                mobile: mobile,
                settings: $.settings
            };
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/v2/user/save",
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
                        window.location.href = "my-info?k=updated";
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
        formData.append('vo.userCode',  'myinfo');
        formData.append('vo.containerName', 'test');
        formData.append('vo.prefix', 'myinfo/file/file');
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
});

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

/*
function getPDF(pdf) {
    var map = {
        uri: pdf    
    };
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-file/api/download/pre",
        type: "POST",
        data: map,
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
            if(response.code === 'C0') {
                $('#pdf').html('<a href="'+$.api.baseNew+'/onlineleasing-file/api/download/file?key='+response.data.key+'&type=attachment">'+response.data.detail.originalFilename+'</a>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
*/