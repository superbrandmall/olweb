$(document).ready(function(){
    if(!sessionStorage.getItem("BRAND_ATTRIBUTE") || sessionStorage.getItem("BRAND_ATTRIBUTE") == null || sessionStorage.getItem("BRAND_ATTRIBUTE") == '') {
        findDictCodeByDictTypeCode('BRAND_ATTRIBUTE');
    }

    $("#create-form").validate({
        rules: {
            brand_name: {
                required: true,
                minlength: 2
            },
            modality_1: {
                required: true
            },
            modality_2: {
                required: true
            }
        },
        messages: {
            brand_name: {
                required: "请输入品牌名称",
                minlength: "请输入完整品牌名称"
            },
            modality_1: {
                required: "请选择一级业态"
            },
            modality_2: {
                required: "请选择二级业态"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            checkBrandName($('#brand_name').val());
        }
    });
    
    updateBrandAttribute();
    
    $('#modality_1').on('change',function(){
        if($(this).val() != '') {
            findBizByBiz1($(this).val());
        }
    })
    
    if($('#modality_1').val() != '' && $('#modality_2').val() == '') {
        findBizByBiz1($('#modality_1').val());
    }
})

function updateBrandAttribute() {
    $('#brandAttribute').html('<option value="">未选择</option>');
    var brandAttribute  = JSON.parse(sessionStorage.getItem("BRAND_ATTRIBUTE"));
    if(brandAttribute.length > 0){
        $.each(brandAttribute, function(i,v) {
            $('#brandAttribute').append('<option value="'+v.dictCode+'">'+v.dictName+'</option>');
        })
    }
}

function findBizByBiz1(biz) {
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAllByModality1?modality1="+encodeURIComponent(biz),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
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
                
                if(response.data.length > 0){
                    $('#modality_2').html('<option value="">未选择</option>');
                    $.each(response.data, function(i,v) {
                        $('#modality_2').append('<option value="'+v.modality2+'">'+v.modality2+'</option>');
                        if ($("#modality_2 option:contains('"+v.modality2+"')").length > 1){
                            $("#modality_2 option:contains('"+v.modality2+"'):gt(0)").remove();
                        }
                    })
                }
                
                $('#modality_2').on('change',function(){
                    if($(this).val() != '') {
                        findBizByBiz2($(this).val());
                    }
                })
                
                if($('#modality_2').val() != '' && $('#modality_3').val() == '') {
                    findBizByBiz2($('#modality_2').val());
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
}

function findBizByBiz2(biz) {
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAllByModality2?modality2="+encodeURIComponent(biz),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
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
                
                if(response.data.length > 0){
                    $('#modality_3').html('<option value="">未选择</option>');
                    $.each(response.data, function(i,v) {
                        $('#modality_3').append('<option value="'+v.modality3+'">'+v.modality3+'</option>');
                        if ($("#modality_3 option:contains('"+v.modality3+"')").length > 1){
                            $("#modality_3 option:contains('"+v.modality3+"'):gt(0)").remove();
                        }
                    })
                }
                
                 $('#modality_3').on('change',function(){
                    if($(this).val() != '') {
                        findBizByBiz3($(this).val());
                    }
                })
                
                if($('#modality_3').val() != '' && $('#modality_4').val() == '') {
                    findBizByBiz3($('#modality_3').val());
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
}

function findBizByBiz3(biz) {
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAllByModality3?modality3="+encodeURIComponent(biz),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
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
                
                if(response.data.length > 0){
                    $('#modality_4').html('<option value="">未选择</option>');
                    $.each(response.data, function(i,v) {
                        $('#modality_4').append('<option value="'+v.modality4+'">'+v.modality4+'</option>');
                        if ($("#modality_4 option:contains('"+v.modality4+"')").length > 1){
                            $("#modality_4 option:contains('"+v.modality4+"'):gt(0)").remove();
                        }
                    })
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
}

function checkBrandName(name) {
    $.ajax({
        url: $.api.baseLotus+"/api/brand/lotus/findAllByName?name="+name,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
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
                
                if(response.data.length > 0){
                    var duplicate = false;
                    $.each(response.data, function(i,x) {
                        if(x.name == name){
                            duplicate = true;
                        }
                    })
                    
                    if(duplicate == true) {
                        alertMsg('9999','该品牌已经存在！');
                    } else {
                        addBrand();
                    }
                } else {
                    addBrand();
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                               
        }
    }); 
}

function addBrand() {
    Ewin.confirm({ message: "确定要提交保存该品牌信息吗？" }).on(function (e) {
        if (!e) {
            return;
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var brand_name = $('#brand_name').val();
        var modality_1 = $('#modality_1').val();
        var modality_2 = $('#modality_2').val();
        var modality_3 = $('#modality_3').val();
        var modality_4 = $('#modality_4').val();
        var brandAttribute = null, brandAttributeText = null;
        if($('#brandAttribute').val() != null && $('#brandAttribute').val() != ''){
            brandAttribute = $('#brandAttribute').val();
            brandAttributeText = $('#brandAttribute').find('option:selected').text();
        }
        var title = $('#title').val() || null;
        var contact_name_1 = $('#contact_name_1').val();
        var contact_phone_1 = $('#contact_phone_1').val();

        if(brand_name != '' && modality_1!= '' && modality_2 != ''){
            var map = {
                "creatorOpenId": openId,
                "updateOpenId": openId,
                "contactName": contact_name_1,
                "contactPhone": contact_phone_1,
                "modality1": modality_1,
                "modality2": modality_2,
                "modality3": modality_3,
                "modality4": modality_4,
                "name": brand_name,
                "logo": "",
                "status": 1,
                "title": title,
                "brandAttribute": brandAttribute,
                "remarkFirst": brandAttributeText
            };

            $.ajax({
                url: $.api.baseLotus+"/api/brand/lotus/saveOrUpdate",
                type: "POST",
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
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie('login', xhr.getResponseHeader("Login"));
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }

                        window.location.href = '/lotus-admin/brands?s=succeed';
                    } else {
                        alertMsg(response.code,response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }
    })
}