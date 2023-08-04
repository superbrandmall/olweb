$.request = {
    id: ''
}

$(document).ready(function(){
    var auth = 0;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
            auth = 1;
            return false;
        } else if(v.roleCode == 'CROLE211008000001' && v.moduleName == '门店对接人') {
            if($.inArray(v.moduleCode, $.api.mallCodeSH) != -1){
                auth = 1;
                return false;
            }
        }
    })
    
    if(auth == 0){
        alertMsg('9999','没有访问授权，请联系系统管理员。');
        return false;
    }
    
    $('#create-form')[0].reset();
    getBizId();
    
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            $('#mobileNo').val(v.mobile);
            return false;
        }
    })
        
    $('input.form-control, .select2-selection').click(function(){
        $(this).css('borderColor','#3c8dbc');
    })
    
    $('input.form-control, .select2-selection').blur(function(){
        $(this).css('borderColor','#d2d6de');
    })
    
    $('.input-group input').focus(function(){
        $(this).siblings('.input-group-addon:first').css('borderColor','#3c8dbc');
    })
    
    $('.input-group input').blur(function(){
        $(this).siblings('.input-group-addon:first').css('borderColor','#d2d6de');
    })
    
    if(!sessionStorage.getItem('roleYZJ') || sessionStorage.getItem('roleYZJ') == null || sessionStorage.getItem('roleYZJ') == ''){
        findRoleYZJByParentId();
    } else {
        updateRoleYZJLabel();
    }

    // 初始化
    $('#investmentContractModelMallSelect').val($.cookie('mallSelected').split(':::')[0]+'['+$.cookie('mallSelected').split(':::')[1]+']');
    
    $('input.money').on('focus',function(){
        $(this).val(accounting.unformat($(this).val()));
        $(this).css('backgroundColor','#fff');
        $(this).select();
        $(this).parent().parent().addClass('success');
    });
    
    $('input.money').on('blur',function(){
        $(this).val(accounting.formatNumber($(this).val()));
        $(this).css('backgroundColor','transparent');
        $(this).parent().parent().removeClass('success');
    });
    
    updateDictDropDownByDictTypeCode('SIGN_APPROVE_TYPE','applyType','立项/定标','1'); // 签呈类型
    findDictCodeByDictTypeCode('LOTUS_SIGN_APPROVE_FLOW_STEP'); // 云之家流程
    findDictCodeByDictTypeCode('FORM_STATUS'); // 表单状态
        
    $("#saveDraft").click(function(){
        mandatoryCheck('save');
    })
    
    $("#submitForm").click(function(){
        mandatoryCheck('submit');
    })
    
    $("div[id*='uploadFile_']").on('click',function(){
        fileUpload($(this).attr('id').split('_')[1]);
    })
    
    if(getURLParameter('id') && getURLParameter('id') != ''){
        findSignRequestbyBizId();
    }
})

function findSignRequestbyBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/sign/approve/form/findAllByBizId?bizId="+getURLParameter('id'),
        type: "GET",
        async: true,
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
            }
        }
    })
}

function updateUserRoleYZJDropDownByRoleId(id) {
    $('#'+id).find('select').select2({
        placeholder: '未选择',
        dropdownAutoWidth: true,
        allowClear: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseCommYZJ+"/api/user/role/yzj/findAllByRoleId",
            type: 'GET',
            dataType: 'json',
            delay: 250,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            data: function (params) {         
                return {
                    search: params.term,
                    roleId: id
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'];
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            if((item.mallCode == $.cookie('mallSelected').split(':::')[1] || item.mallCode == null) && item.state == 1){
                                data = {
                                    id: item.openId,
                                    text: item.name
                                }

                                var returnData = [];
                                returnData.push(data);
                                return returnData;
                            }
                        })
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    })
}

function fileUpload(id) {
    if($('#uploadFile_'+id).parent().find("input[type=file]").val() != ''){
        var type;
        switch (id) {
            default:
                type = 'OF';
                break;
        }
    
        var formData = new FormData();
        var file = $('#uploadFile_'+id).parent().find("input[type=file]")[0].files[0];
        formData.append('file', file);

        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })

        var upload = $.ajax({
            type: "POST",
            url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+$('#bizId').val()+"&creatorOpenId="+openId+"&activityName=&bizType=SIGN_"+type,
            data: formData,
            async: true,
            cache: false,
            timeout: 15000,
            processData: false,
            contentType: false,
            beforeSend: function(request) {
                $('#loader').show();
                request.setRequestHeader("Login", $.cookie('login'));
                request.setRequestHeader("Authorization", $.cookie('authorization'));
                request.setRequestHeader("Lang", $.cookie('lang'));
                request.setRequestHeader("Source", "onlineleasing");
            },
            complete: function(jqXHR, textStatus, errorThrown) {
                if(textStatus == 'timeout'){
                     upload.abort();
                     upload();
                 }
            },
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
                    default:
                        type = 'otherFiles';
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

function getBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/sign/approve/form/getNextBizId/",
        type: "GET",
        async: true,
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
                
                $('#bizId').val(response.data);
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function mandatoryCheck(s) {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#approveInfo').val() == ''){
        flag = 0;
        $('#approveInfo').parent().prepend(error);
    }
    
    if($('#applyReason').val() == ''){
        flag = 0;
        $('#applyReason').parent().prepend(error);
    }
    
    if(flag == 1){
        if(s == 'submit'){
            submitCheck();
        } else {
            saveSignForm('save');
        }
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function submitCheck() {
    $('.mandatory-error').remove();
    var flag = 1;
    var error = '<i class="fa fa-exclamation-circle mandatory-error" aria-hidden="true"></i>';
    
    if($('#remarks').val() == ''){
        flag = 0;
        $('#remarks').parent().prepend(error);
    }
    
    if($('#signLeasingApprove select').val() == null) {
        flag = 0;
        $('#signLeasingApprove select').parent().append(error);
    }
    
    if($('#signFinPreApprove select').val() == null) {
        flag = 0;
        $('#signFinPreApprove select').parent().append(error);
    }
    
    if($('#signLegalPreApprove select').val() == null) {
        flag = 0;
        $('#signLegalPreApprove select').parent().append(error);
    }
    
    if($('#signFinApprove select').val() == null) {
        flag = 0;
        $('#signFinApprove select').parent().append(error);
    }
    
    if($('#signLegalApprove select').val() == null) {
        flag = 0;
        $('#signLegalApprove select').parent().append(error);
    }
    
    if($('#signHqLeasingApprove select').val() == null) {
        flag = 0;
        $('#signHqLeasingApprove select').parent().append(error);
    }
    
    if(flag == 1 && $('.mandatory-error').length == 0){
        saveSignForm('submit');
    } else {
        $('html, body').animate({
            scrollTop: $('.mandatory-error').offset().top - 195
        }, 0);
    }
}

function saveSignForm(s) {
    var msg;
    var formStatus = '保存';
    if(s == 'submit'){
        msg = '确定要将此内容提交审批吗？';
    } else {
        msg = '确定要将此内容保存为草稿吗？';
    }
    Ewin.confirm({ message: msg }).on(function (e) {
        if (!e) {
            return;
        } else {
            $('.modal.in').hide().remove();
        }
        
        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })
        
        var bizId = $('#bizId').val();
        
        var processApproveList = [];
        var lotusSignFlowStep = JSON.parse(sessionStorage.getItem('LOTUS_SIGN_APPROVE_FLOW_STEP'));
        if(lotusSignFlowStep.length > 0){
            $.each(lotusSignFlowStep, function(i,v) {
                var processApprove = {};
                processApprove.activityCode = v.dictCode;
                processApprove.activityName = v.dictName;
                processApprove.approveName = $('#'+v.dictCode+' select').find('option:selected').text();
                processApprove.approveOpenId = $('#'+v.dictCode+' select').find('option:selected').val();
                processApprove.bizId = bizId;
                processApprove.state = 1;
                
                if(processApprove.approveOpenId != null){
                    processApproveList.push(processApprove);
                }
            })
        }
        
        var fs = JSON.parse(sessionStorage.getItem('FORM_STATUS'));
        if(fs.length > 0){
            $.each(fs, function(i,v) {
                if(v.dictName == formStatus){
                    formStatus = v.dictCode;
                    return false;
                }
            })
        }
        
        var map = {
            "amount": numberWithoutCommas($('#overdueBizAmount').val()) || 0,
            "applyReason": $('#applyReason').val(),
            "applyType": $('#applyType').find('option:selected').val(),
            "approveInfo": $('#approveInfo').val(),
            "bizId": bizId,
            "code": "",
            "companyName": "",
            "corporationName": "",
            "creatorName": $('#creatorName').val(),
            "creatorOpenId": openId,
            "creatorOrgId": "",
            "creatorOrgName": "",
            "formStatus": formStatus,
            "id": $.request.id,
            "mallCode": $.cookie('mallSelected').split(':::')[1],
            "mallName": $.cookie('mallSelected').split(':::')[0],
            "mobileNo": $('#mobileNo').val(),
            "processApproveList": processApproveList,
            "remarks": $('#remarks').val(),
            "signFileName": "",
            "signName": "",
            "signNum": 0,
            "signRelationList": [],
            "tenantCode": "",
            "tenantName": "",
            "updateOpenId": openId,
            "urgencyDegree": $('input[name=urgencyDegree]:checked').val()
        };
        
        if(s == 'submit') {
            var submitSignForm = $.ajax({
                url: $.baseLotus+"/api/sign/approve/form/submit",
                type: "POST",
                data: JSON.stringify(map),
                async: true,
                timeout: 15000,
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(request) {
                    $('#loader').show();
                    request.setRequestHeader("Login", $.cookie('login'));
                    request.setRequestHeader("Authorization", $.cookie('authorization'));
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                complete: function(jqXHR, textStatus, errorThrown) {
                    if(textStatus == 'timeout'){
                         submitSignForm.abort();
                         submitSignForm();
                     }
                },
                success: function (response, status, xhr) {
                    $('#loader').hide();
                    if(response.code === 'C0') {
                        if(response.data.resultCode == "ERROR" && response.data.id != ""){
                            $.request.id = response.data.id;
                            alertMsg(response.data.resultCode,response.data.resultMsg);
                        } else if(response.data.id != "" && response.data.formStatus == "2"){
                            //window.location.href = '/lotus-admin/request-summary?id='+response.data.bizId+'&s=succeed';
                        } else {
                            alertMsg(response.data.resultCode,response.data.resultMsg);
                        }
                    } else {
                        alertMsg(response.code,response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        } else {
            var saveSignDraft = $.ajax({
                url: $.api.baseLotus+"/api/sign/approve/form/saveOrUpdate",
                type: "POST",
                data: JSON.stringify(map),
                async: true,
                dataType: "json",
                contentType: "application/json",
                beforeSend: function(request) {
                    $('#loader').show();
                    request.setRequestHeader("Login", $.cookie('login'));
                    request.setRequestHeader("Authorization", $.cookie('authorization'));
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                complete: function(jqXHR, textStatus, errorThrown) {
                    if(textStatus == 'timeout'){
                         saveSignDraft.abort();
                         saveSignDraft();
                     }
                },
                success: function (response, status, xhr) {
                    $('#loader').hide();
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie('login', xhr.getResponseHeader("Login"));
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                        }

                        if(response.data.id != ""){
                            //window.location.href = '/lotus-admin/request-summary?id='+response.data.bizId+'&s=succeed';
                        } else {
                            alertMsg(response.data.resultCode,response.data.resultMsg);
                        }
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