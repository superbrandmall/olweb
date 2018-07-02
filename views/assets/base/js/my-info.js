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
    
    getBrandModality1();
    
    $.ajax({
        url: $.api.baseNew+"/onlineleasing-customer/api/user/info/simple/"+$.cookie('uid')+"",
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
                    if(v.code == response.data.modality.substr(0,2)) {
                        $.each(v.children, function(j,w) {
                            if(w.code == response.data.modality.substr(0,4)) {
                                $('#modality_1').val(w.code);
                                getBrandModality2(w.code);
                                $.each(w.children, function(k,x) {
                                    if(x.code == response.data.modality.substr(0,6)) {
                                        $('#modality_2').val(x.code);
                                        getBrandModality3(x.code);
                                        $.each(x.children, function(l,y) {
                                            if(y.code == response.data.modality) {
                                                $('#modality_3').val(y.code);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
                
                $('#website').val(response.data.website);
                
                if(response.data.file != null && response.data.file != ''){
                    $('#hidden_file').val(response.data.file);
                    getPDF(response.data.file);     
                }
                
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
        var profile_merchant_name_required = "Company name can't be empty";
        var profile_merchant_name_minlength = "Please give a correct company name";
        var profile_brand_name_required = "Brand name can't be empty";
        var profile_brand_name_minlength = "Please give a correct brand name";
        var profile_modality_1_required = "Please choose a primary category";
        var profile_modality_2_required = "Please choose a secondary category";
        var profile_modality_3_required = "Please choose a teriary category";
        var profile_website_url = "Please give a correct website url";
    } else {
        var profile_contact_name_1_required = "姓名为必填项";
        var profile_contact_name_1_minlength = "请输入完整姓名";
        var profile_contact_phone_1_required = "手机为必填项";
        var profile_contact_phone_1_rangelength = "请输入正确手机号码";
        var profile_contact_phone_1_digits = "请输入正确手机号码";
        var profile_email_required = "公司邮箱为必填项";
        var profile_email_email = "请输入有效邮箱地址";
        var profile_merchant_name_required = "公司名称为必填项";
        var profile_merchant_name_minlength = "请输入正确公司名称";
        var profile_brand_name_required = "请输入品牌名称";
        var profile_brand_name_minlength = "请输入完整品牌名称";
        var profile_modality_1_required = "请选择一级业态";
        var profile_modality_2_required = "请选择二级业态";
        var profile_modality_3_required = "请选择三级业态";
        var profile_website_url = "请输入有效网址";
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
            },
            merchant_name: {
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
            },
            merchant_name: {
                required: profile_merchant_name_required,
                minlength: profile_merchant_name_minlength
            },
            brand_name: {
                required: profile_brand_name_required,
                minlength: profile_brand_name_minlength
            },
            modality_1: {
                required: profile_modality_1_required
            },
            modality_2: {
                required: profile_modality_2_required
            },
            modality_3: {
                required: profile_modality_3_required
            },
            website: {
                url: profile_website_url
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            var brand_name = $('#brand_name').val();
            var email = $('#email').val();
            var file = $('#hidden_file').val();
            var merchant_name = $('#merchant_name').val();
            var mobile = $('#contact_phone_1').val();
            var modality = $('#modality_3').val();
            var website = $('#website').val();
            $.settings.name = $('#contact_name_1').val();
            
            var map = {
                brandName: brand_name,
                code: $.cookie('uid'),
                email: email,
                file: file,
                merchantName: merchant_name,
                mobile: mobile,
                modality: modality,
                settings: $.settings,
                website: website            };
            $.ajax({
                url: $.api.baseNew+"/onlineleasing-customer/api/user/save/simple",
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
    $('#file').on("change", function () {
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
    });
});

function getBrandModality1() {
    $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,v) {
        if($.inArray(v.code,['00','01','02']) != -1){
            $.each(v.children, function(j,w) {
                if($.cookie('lang') === 'en-us'){
                    $('#modality_1').append('<option value="'+w.code+'">'+w.remark+'</option>');
                } else {
                    $('#modality_1').append('<option value="'+w.code+'">'+w.name+'</option>');
                }
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