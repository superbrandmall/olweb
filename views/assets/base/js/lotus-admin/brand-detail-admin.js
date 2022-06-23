$.brand = '';

$(document).ready(function(){
    findDictCodeByDictTypeCode('BRAND_ATTRIBUTE');
    
    $("#create-form").validate({
        rules: {
            brand_name: {
                required: true,
                minlength: 2
            },
            brandAttribute: {
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
            modality_4: {
                required: true
            },
            contact_name_1: {
                required: true,
                minlength: 2
            },
            title: {
                required: true,
                minlength: 2
            },
            contact_phone_1: {
                required: true,
                minlength: 6
            },
            trademark_0: {
                required: true
            },
            brandAuthorization_0: {
                required: true
            }
        },
        messages: {
            brand_name: {
                required: "请输入品牌名称",
                minlength: "请输入完整品牌名称"
            },
            brandAttribute: {
                required: "请选择品牌档次"
            },
            modality_1: {
                required: "请选择一级业态"
            },
            modality_2: {
                required: "请选择二级业态"
            },
            modality_3: {
                required: "请输入三级业态"
            },
            modality_4: {
                required: "请输入四级业态"
            },
            contact_name_1: {
                required: "请输入联系人",
                minlength: "请输入完整联系人"
            },
            title: {
                required: "请输入岗位",
                minlength: "请输入完整岗位"
            },
            contact_phone_1: {
                required: "请输入联系电话",
                minlength: "请输入完整联系电话"
            },
            trademark_0: {
                required: "请在附件中上传商标注册证"
            },
            brandAuthorization_0: {
                required: "请在附件中上传品牌授权书"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo('#errorcontainer-' + element.attr('id'));
        },
        submitHandler: function() {
            saveBrand();
        }
    });
    
    updateBrandAttribute();
    findBrandByCode();
    
    $("div[id*='uploadFile_']").on('click',function(){
        fileUpload($(this).attr('id').split('_')[1]);
    })
    
    if($('#modality_3').val() != '' && $('#modality_4').val() == '') {
        findBizByBiz3($('#modality_3').val());
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

function findBizByBiz3(biz) {
    $.ajax({
        url: $.api.baseLotus+"/api/biz/lotus/findAllByModality3?modality3="+biz,
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

function findBrandByCode() {
    $.ajax({
        url: $.api.baseLotus+"/api/brand/lotus/findOneByCode?code="+getURLParameter('id'),
        type: "GET",
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
                
                if(response.data != null && response.data != ''){
                    $.brand = response.data;
                    findFilesByBizId();
                    $('#status').text(response.data.status == 1 ? '使用中' : '已删除');
                    $('#name2').text(response.data.name);
                    
                    $('#brand_name').val(response.data.name);
                    $('#brandAttribute').val(response.data.brandAttribute).trigger('change');
                    $('#modality_1').val(response.data.modality1).trigger('change');
                    
                    var modality_2 = new Option(response.data.modality2, response.data.modality2, true, true);
                    $('#modality_2').append(modality_2).trigger('change');
                    
                    var modality_3 = new Option(response.data.modality3, response.data.modality3, true, true);
                    $('#modality_3').append(modality_3).trigger('change');
                    
                    if(response.data.modality4 != null && response.data.modality4 != ''){
                        var modality_4 = new Option(response.data.modality4, response.data.modality4, true, true);
                        $('#modality_4').append(modality_4).trigger('change');
                    }
                    
                    $('#contact_name_1').val(response.data.contactName);
                    $('#title').val(response.data.title);
                    $('#contact_phone_1').val(response.data.contactPhone);
                }
            }
        }
    })
}

function saveBrand() {
    Ewin.confirm({ message: "确定要保存修改该品牌信息吗？" }).on(function (e) {
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
        
        $.brand.creatorOpenId = openId;
        $.brand.updateOpenId = openId;
        $.brand.brandName = $('#brand_name').val();
        $.brand.modality1 = $('#modality_1').val();
        $.brand.modality2 = $('#modality_2').val();
        $.brand.modality3 = $('#modality_3').val();
        $.brand.modality4 = $('#modality_4').val();
        if($('#brandAttribute').val() != null && $('#brandAttribute').val() != ''){
            $.brand.brandAttribute = $('#brandAttribute').val();
            $.brand.remarkFirst = $('#brandAttribute').find('option:selected').text();
        }
        $.brand.title = $('#title').val() || null;
        $.brand.contactName = $('#contact_name_1').val() || null;
        $.brand.contactPhone = $('#contact_phone_1').val() || null;

        if($.brand.brandName != '' && $.brand.modality1!= '' && $.brand.modality2 != '' && $.brand.modality3 != '' && $.brand.contactName != '' && $.brand.contactPhone != ''){
            $.ajax({
                url: $.api.baseLotus+"/api/brand/lotus/saveOrUpdate",
                type: "POST",
                data: JSON.stringify($.brand),
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

function findFilesByBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/findAllByBizId?bizId="+$.brand.code,
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", $.cookie('lang'));
            request.setRequestHeader("Source", "onlineleasing");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(response.data != null && response.data != '' && response.data.length > 0){
                    $.each(response.data, function(i,v) {
                        sessionStorage.setItem("uploadFile_"+v.id,JSON.stringify(v));
                        
                        var bizType = v.bizType.split('_')[1];
                        var type;
                        switch (bizType) {
                            case "TM":
                                type = 'trademark';
                                break;
                            case "BA":
                                type = 'brandAuthorization';
                                break;
                            default:
                                break;
                        }
                        
                        $("input[id*='"+type+"_']").each(function(j,e){
                            if($('#'+type+'_'+j).val() == ''){
                                $('#'+type+'_'+j).val(v.fileName);
                                var fileSize;
                                if(v.fileSize >= 1024 && v.fileSize < 1048576){
                                    fileSize = Math.round(v.fileSize / 1024 * 100) / 100 + 'Kb';
                                } else if(v.fileSize >= 1048576){
                                    fileSize = Math.round(v.fileSize / 1048576 * 100) / 100 + 'Mb';
                                } else {
                                    fileSize = v.fileSize + 'b';
                                }
                                $('#'+type+'FileSize'+'_'+j).text(fileSize);
                                $('#'+type+'Created'+'_'+j).text(v.created);
                                $('#'+type+'Action'+'_'+j).html('\
    <a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+v.bizId+'&fileId='+v.fileId+'" target="_blank">查看文件</a> | \n\
    <a href="javascript:void(0)" onclick=\'javascript: deleteFile("'+v.id+'")\'>删除文件</a>\n\
    <input type="hidden" id="file_'+v.id+'" />');
                                $('#'+type+'_'+j).parent().parent().show();
                                return false;
                            }
                        })
                    })
                }
            }
        }
    })
}

function fileUpload(id) {
    if($('#uploadFile_'+id).parent().find("input[type=file]").val() != ''){
        var fileName, type;
        switch (id) {
            case "trademark":
                fileName = '商标注册证_'+$.brand.name+'_'+date;
                type = 'TM';
                break;
            case "brandAuthorization":
                fileName = '品牌授权书_'+$.brand.name+'_'+date;
                type = 'BA';
                break;
            default:
                break;
        }
    
        var formData = new FormData();
        var file = $('#uploadFile_'+id).parent().find("input[type=file]")[0].files[0];
        formData.append('file', file,fileName+'.'+file.name.split('.')[file.name.split('.').length - 1]);

        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })

        var upload = $.ajax({
            type: "POST",
            url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+$.brand.code+"&creatorOpenId="+openId+"&activityName=&bizType=BRAND_"+type,
            data: formData,
            async: false,
            cache: false,
            timeout: 30000,
            processData: false,
            contentType: false,
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete : function(){},
            success: function(response, status, xhr) {
                $('#loader').hide();
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Login") !== null){
                        $.cookie('login', xhr.getResponseHeader("Login"));
                    }
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                    }
                    
                    sessionStorage.setItem("uploadFile_"+response.data.id,JSON.stringify(response.data));
                    
                    $('#fileName_'+id).val('');
                    $('#uploadFile_'+id).parent().find("input[type=file]").val('');
                    
                    $("input[id*='"+id+"_']").each(function(i,e){
                        if($('#'+id+'_'+i).val() == ''){
                            $('#'+id+'_'+i).val(response.data.fileName);
                            var fileSize;
                            if(response.data.fileSize >= 1024 && response.data.fileSize < 1048576){
                                fileSize = Math.round(response.data.fileSize / 1024 * 100) / 100 + 'Kb';
                            } else if(response.data.fileSize >= 1048576){
                                fileSize = Math.round(response.data.fileSize / 1048576 * 100) / 100 + 'Mb';
                            } else {
                                fileSize = response.data.fileSize + 'b';
                            }
                            $('#'+id+'FileSize'+'_'+i).text(fileSize);
                            $('#'+id+'Created'+'_'+i).text(response.data.created);
                            $('#'+id+'Action'+'_'+i).html('\
<a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+response.data.bizId+'&fileId='+response.data.fileId+'" target="_blank">查看文件</a> | \n\
<a href="javascript:void(0)" onclick=\'javascript: deleteFile("'+response.data.id+'")\'>删除文件</a>\n\
<input type="hidden" id="file_'+response.data.id+'" />');
                            $('#'+id+'_'+i).parent().parent().show();
                            return false;
                        }
                    })
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
               if(textStatus == 'TIMEOUT'){
                    upload();
                }
            }
        });
    }
}

function deleteFile(id) {
    var file = $.parseJSON(sessionStorage.getItem("uploadFile_"+id));
    file.update = '';
    file.state = 0;
    
    var bizType = file.bizType.split('_')[1];
    
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/saveOrUpdate",
        type: "POST",
        data: JSON.stringify(file),
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
                
                var type;
                switch (bizType) {
                    case "TM":
                        type = 'trademark';
                        break;
                    case "BA":
                        type = 'brandAuthorization';
                        break;
                    default:
                        break;
                }
                

                var row = $('#file_'+id).parent().parent();
                row.hide();
                row.find("input[id*='"+type+"_']").val('');
                row.find("td[id*='"+type+'FileSize'+"_']").text('');
                row.find("td[id*='"+type+'Created'+"_']").text('');
                row.find("td[id*='"+type+'Action'+"_']").html('');
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}