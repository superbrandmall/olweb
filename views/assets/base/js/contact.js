$(document).ready(function(){
    getBrandModality0();
    
  ///////////////////// Validate contact form /////////////////////////
  if($.cookie('lang') === 'en-us'){
        var contact_contact_name_1_required = "First and last name can't be empty";
        var contact_contact_name_1_minlength = "Please give correct first and last names";
        var contact_target_mall_required = "Please choose a shopping mall";
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
        var contact_target_mall_required = "请选择购物广场";
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