$(document).ready(function(){
    getBrandModality0();
    
  ///////////////////// Validate contact form /////////////////////////
  if($.cookie('lang') === 'en-us'){
        var contact_contact_name_1_required = "First and last name can't be empty";
        var contact_contact_name_1_minlength = "Please give correct first and last names";
        var contact_phone_required = "Phone can't be empty";
        var contact_phone_rangelength = "Please give a correct phone number";
        var contact_phone_digits = "Please give a correct phone number";
        var contact_email_required = "Email address can't be empty";
        var contact_email_email = "Please give a correct email address";
        var contact_name_required = "Company name can't be empty";
        var contact_name_minlength = "Please give a correct company name";
        var contact_brand_name_required = "Brand name can't be empty";
        var contact_brand_name_minlength = "Please give a correct brand name";
        var contact_modality_0_required = "Please choose category level 1";
        var contact_modality_1_required = "Please choose category level 2";
        var contact_modality_2_required = "Please choose category level 3";
        var contact_modality_3_required = "Please choose category level 4";
        var contact_msg_required = "Message can't be empty";
        var contact_msg_sent = "Message sent successfully";
        var contact_msg_max_length = "Text length is too long";
    } else {
        var contact_contact_name_1_required = "姓名为必填项";
        var contact_contact_name_1_minlength = "请输入完整姓名";
        var contact_phone_required = "电话为必填项";
        var contact_phone_rangelength = "请输入正确电话号码";
        var contact_phone_digits = "请输入正确电话号码";
        var contact_email_required = "邮箱为必填项";
        var contact_email_email = "请输入有效邮箱地址";
        var contact_name_required = "公司名称为必填项";
        var contact_name_minlength = "请输入正确公司名称";
        var contact_brand_name_required = "请输入品牌名称";
        var contact_brand_name_minlength = "请输入完整品牌名称";
        var contact_modality_0_required = "请选择一级业态";
        var contact_modality_1_required = "请选择二级业态";
        var contact_modality_2_required = "请选择三级业态";
        var contact_modality_3_required = "请选择四级业态";
        var contact_msg_required = "讯息为必填项";
        var contact_msg_sent = "讯息发送成功";
        var contact_msg_max_length = "讯息文字太长";
    }
    
    $("#contact form").validate({
        onkeyup: false,
        rules: {
            contact_name_1: {
                required: true,
                minlength: 1
            },
            phone: {
                required: true,
                rangelength: [1,11],
                digits: true
            },
            email: {
                required: true,
                email: true
            },
            name: {
                required: true,
                minlength: 3
            },
            brand_name: {
                required: true,
                minlength: 2
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
            contact_msg: {
                required: true,
                maxlength: 255
            }
        },
        messages: {
            contact_name_1: {
                required: contact_contact_name_1_required,
                minlength: contact_contact_name_1_minlength
            },
            phone: {
                required: contact_phone_required,
                rangelength: contact_phone_rangelength,
                digits: contact_phone_digits
            },
            email: {
                required: contact_email_required,
                email: contact_email_email
            },
            name: {
                required: contact_name_required,
                minlength: contact_name_minlength
            },
            brand_name: {
                required: contact_brand_name_required,
                minlength: contact_brand_name_minlength
            },
            modality_0: {
                required: contact_modality_0_required
            },
            modality_1: {
                required: contact_modality_1_required
            },
            modality_2: {
                required: contact_modality_2_required
            },
            modality_3: {
                required: contact_modality_3_required
            },
            contact_msg: {
                required: contact_msg_required,
                maxlength: contact_msg_max_length
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            $('#loader').show();
            var brand_name = $('#brand_name').val();
            var email = $('#email').val();
            var merchant_name = $('#name').val();
            var phone = $('#phone').val();
            var modality_3;
            
            $.each($.parseJSON(sessionStorage.getItem("modalities")), function(i,u) {
                $.each(u.children, function(j,w) {
                    $.each(w.children, function(k,x) {
                        $.each(x.children, function(l,y) {
                            if($.cookie('lang') === 'en-us'){
                                if(y.code == $('#modality_3').val()) {
                                    modality_3 = y.remark || '-';
                                    return false;
                                }
                            } else {
                                if(y.code == $('#modality_3').val()) {
                                    modality_3 = y.name || '-';
                                    return false;
                                }
                            }
                        });
                    });
                });
            });
            
            var user_name = $('#contact_name_1').val();
            var msg = $('#contact_msg').val();

            var map = {
                brandName: brand_name,
                brandModality: modality_3,
                email: email,
                merchantName: merchant_name,
                msg: msg,
                phone: phone,
                userName: user_name
            };
            
            /*$.ajax({
                url: $.api.baseNew+"/onlineleasing-admin/api/contacts/save",
                type: "PUT",
                data: JSON.stringify(map),
                async: false,
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(request) {
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                success: function (response, status, xhr) {
                    if(response.code === 'C0') {
                        $.ajax({
                            url: "controllers/api/1.0/ApiMail.php",
                            type: "POST",
                            data: {
                                brand_name: brand_name,
                                email: email,
                                merchant_name: merchant_name,
                                phone: phone,
                                modality_3: modality_3,
                                user_name: user_name,
                                msg: msg
                            },
                            async: false,
                            beforeSend: function(request) {},
                            complete: function(){},
                            success: function (response, status, xhr) {
                                $('#contact .modal-content').append('<div class="alert alert-success" role="alert" style="display: block;margin: 10px; padding: 10px;">'+contact_msg_sent+'</div>');
                                setTimeout(function () {
                                    window.location.reload(false);
                                },3000);
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                               console.log(textStatus, errorThrown);
                            }
                        });
                    } else {
                        interpretBusinessCode(response.customerMessage);
                    }
                }
            });*/
            
            $.ajax({
                url: "controllers/api/1.0/ApiMail.php",
                type: "POST",
                data: {
                    brand_name: brand_name,
                    email: email,
                    merchant_name: merchant_name,
                    phone: phone,
                    modality_3: modality_3,
                    user_name: user_name,
                    msg: msg
                },
                async: false,
                beforeSend: function(request) {},
                complete: function(){},
                success: function (response, status, xhr) {
                    $('#contact .modal-content').append('<div class="alert alert-success" role="alert" style="display: block;margin: 10px; padding: 10px;">'+contact_msg_sent+'</div>');
                    setTimeout(function () {
                        window.location.reload(false);
                    },3000);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(textStatus, errorThrown);
                }
            });
        }
    });
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