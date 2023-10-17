$.request = {
    id: '',
    content: ''
}

$(document).ready(function(){
    var auth = 0;
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
            auth = 1;
            return false;
        } else if(v.roleCode == 'CROLE211008000001' && v.moduleName == '门店对接人') {
            if($.inArray(v.moduleCode, $.api.mallCodeEast) != -1){
                auth = 1;
                return false;
            }
        }
    })
    
    updateDictDropDownByDictTypeCode('SIGN_NAME','signName',null,''); // 印鉴名称
    updateDictDropDownByDictTypeCode('SIGN_APPROVE_TYPE','applyType',null,''); // 申请类型
    findDictCodeByDictTypeCode('LOTUS_SIGN_APPROVE_FLOW_STEP'); // 云之家流程
    findDictCodeByDictTypeCode('FORM_STATUS'); // 表单状态
    updateSelectTenantDropDown(50);
    
    if(auth == 0){
        alertMsg('9999','没有访问授权，请联系系统管理员。');
        return false;
    }
    
    $('#create-form')[0].reset();
    
    $('.date-picker').datepicker({
        'language': 'zh-CN',
        'format': 'yyyy-mm-dd',
        'todayHighlight': true,
        'autoclose': true,
        'clearBtn': true
    });
    
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
    
    findUserRoleYZJByKVCondition($.cookie('mallSelected').split(':::')[1]);
    
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
        findSignRequestByBizId();
        findFilesByBizId();
    } else {
        // 初始化
        $('#investmentContractModelMallSelect').val($.cookie('mallSelected').split(':::')[0]+'['+$.cookie('mallSelected').split(':::')[1]+']');
        getBizId();
        findMainSigningBody($.cookie('mallSelected').split(':::')[1]);
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                $('#mobileNo').val(v.mobile);
                return false;
            }
        })
        $('#applyDate').datepicker('update', date);
    }
    
    $('#applyType').change(function(){
        if($(this).val() == 5){
            $('#processSignInfo, #navbarTop ul li:eq(1)').show();
        } else {
            $('#processSignInfo, #navbarTop ul li:eq(1)').hide();
        }
    })
})

function findSignRequestByBizId() {
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
                
                if(response.data != '' && response.data != null){
                    var data = response.data;
                    $.request.content = data;
                    $.request.id = data.id;
                    
                    if($.request.content.formStatus != '1' && $.request.content.formStatus != '3'){
                        $('#saveDraft').hide();
                        $('#submitForm').hide();
                        
                        if($.request.content.formStatus == '4' || $.request.content.formStatus == '5' || $.request.content.formStatus == '6'){
                            $('#create-form .sub-header').css('background','#fff url(/views/assets/base/img/content/lotus-admin/approval_completed.png) 0 100%/112px auto no-repeat');
                        } else if($.request.content.formStatus == '9'){
                            $('#create-form .sub-header').css('background','#fff url(/views/assets/base/img/content/lotus-admin/seal_completed.png) 0 100%/112px auto no-repeat');
                        } else if($.request.content.formStatus == '10'){
                            $('#create-form .sub-header').css('background','#fff url(/views/assets/base/img/content/lotus-admin/approval_closed.png) 0 100%/112px auto no-repeat');
                        }
                    }
                    
                    $('#creatorName').val((data.creatorName != null ? data.creatorName : 'admin'));
                    $('#requestName').text(' :'+data.bizId);
                    $('#bizId').val(data.bizId);
                    updateDictByDictTypeCode('FORM_STATUS','formStatus',(data.formStatus != null ? data.formStatus : 1));
                    $('#investmentContractModelMallSelect').val(data.mallName+'['+data.mallCode+']');
                    $('#remark').val(data.approveInfo);
                    $('#amount').val(data.amount);
                    $('#mobileNo').val(data.mobileNo);
                    $('#applyReason').val(data.applyReason);
                    $('#corporationName').val(data.corporationName);
                    $('#signFileName').val(data.signFileName);
                    $('#applyDate').datepicker('update', (data.applyDate != null ? data.applyDate : date));
                    if(data.companyName != null){
                        $('#mainSigningBody').val(data.companyName);
                    } else {
                        findMainSigningBody($.cookie('mallSelected').split(':::')[1]);
                    }
                    
                    $('#signNum').val(data.signNum);
                    if(data.signName != null && data.remarkSecond != null){
                        temp = new Option(data.remarkSecond, data.signName, true, true);
                        $('#signName').append(temp).trigger('change');
                    }
                    
                    if(data.tenantCode != null && data.tenantName != null && data.remarkFirst != null){
                        temp = new Option((data.tenantCode +' | '+ data.tenantName), data.remarkFirst, true, true);
                        $('#selectTenant').append(temp).trigger('change');
                    }
                    updateDictByDictTypeCodeAndVal('SIGN_APPROVE_TYPE', 'applyType', data.applyTypeCode);
                    
                    $('input[type=radio][name=urgencyDegree][value='+data.urgencyDegree+']').attr("checked",true);
                    
                    if(data.processApproveList != null && data.processApproveList.length > 0) {
                        var temp;
                        $.each(data.processApproveList, function(i,v) {
                            temp = new Option(v.approveName, v.approveOpenId, true, true);
                            $('#'+v.activityCode+' select').append(temp).trigger('change');
                        })
                    }
                    
                    if(data.signRelationList.length > 0) {
                        $.each(data.signRelationList, function(i,v) {
                            updateRowInvestmentSignRelation(JSON.stringify(v));
                        })
                    }
                    
                    $('input.money').each(function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                    })
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findFilesByBizId() {
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/findAllByBizId?bizId="+getURLParameter('id'),
        type: "GET",
        async: true,
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
                            case "OF":
                                type = 'otherFiles';
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
        var type;
        switch (id) {
            case "otherFiles":
                type = 'OF';
                break;
            default:
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
                
                var type;
                switch (bizType) {
                    case "OF":
                        type = 'otherFiles';
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
    
    if($('#applyReason').val() == ''){
        flag = 0;
        $('#applyReason').parent().prepend(error);
    }
    
    if($('#applyType').val() == null){
        flag = 0;
        $('#applyType').parent().prepend(error);
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
    
    if($('#applyDate').val() == ''){
        flag = 0;
        $('#applyDate').parent().prepend(error);
    }
    
    if($('#remark').val() == ''){
        flag = 0;
        $('#remark').parent().prepend(error);
    }
    
    if($('#applyType').val() == 5){
        if($('#signName').val() == null){
            flag = 0;
            $('#signName').parent().prepend(error);
        }
        
        if($('#corporationName').val() == ''){
            flag = 0;
            $('#corporationName').parent().prepend(error);
        }
        
        if($.isNumeric($('#signNum').val()) == false){
            flag = 0;
            $('#signNum').parent().prepend(error);
        }
        
        if($('#selectTenant').val() == null){
            flag = 0;
            $('#selectTenant').parent().prepend(error);
        }
        
        if($('#signFileName').val() == ''){
            flag = 0;
            $('#signFileName').parent().prepend(error);
        }
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
    
    if($('#signApprove select').val() == null) {
        flag = 0;
        $('#signApprove select').parent().append(error);
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
        
        var bizId = ($.request.content != '' ? $.request.content.bizId : $('#bizId').val());
        var creatorName = $('#creatorName').val();
        
        var index;
        var signRelationList = [];
        $("#signRelation").find("tr").each(function(i,e){
            var signRelation = {};
            index = i * 1 + 1;
            signRelation.bizId = bizId;
            signRelation.creatorName = creatorName;
            signRelation.creatorOpenId = openId;
            signRelation.relationBizId = $('#requestItem_'+index).val();
            signRelation.relationInfo = $('#relationInfo_'+index).val();
            signRelation.relationType = $('#requestType_'+index).val(); 
            signRelation.updateOpenId = openId;
            signRelationList.push(signRelation);
        })
        
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
            "amount": numberWithoutCommas($('#amount').val()) || 0,
            "applyReason": $('#applyReason').val(),
            "applyDate": $('#applyDate').val(),
            "applyTypeCode": $('#applyType').find('option:selected').val(),
            "applyTypeName": $('#applyType').find('option:selected').text(),
            "approveInfo": $('#remark').val(),
            "bizId": bizId,
            "code": ($.request.content != '' ? $.request.content.code : ""),
            "companyName": $('#mainSigningBody').val(),
            "corporationName": $('#corporationName').val(),
            "creatorName": ($.request.content != '' ? $.request.content.creatorName : creatorName),
            "creatorOpenId": ($.request.content != '' ? $.request.content.creatorOpenId : openId),
            "creatorOrgId": "",
            "creatorOrgName": "",
            "formStatus": ($.request.content != '' ? $.request.content.formStatus : formStatus),
            "id": $.request.id,
            "mallCode": ($.request.content != '' ? $.request.content.mallCode : $.cookie('mallSelected').split(':::')[1]),
            "mallName": ($.request.content != '' ? $.request.content.mallName : $.cookie('mallSelected').split(':::')[0]),
            "mobileNo": $('#mobileNo').val(),
            "processApproveList": processApproveList,
            "signFileName": $('#signFileName').val(),
            "signFlag": $('#signFlag').find('option:selected').val(),
            "signName": $('#signName').val(),
            "signNum": $('#signNum').val(),
            "signRelationList": signRelationList,
            "tenantCode": $('#selectTenant').find('option:selected').text().split(' | ')[0],
            "tenantName": $('#selectTenant').find('option:selected').text().split(' | ')[1],
            "updateOpenId": openId,
            "urgencyDegree": $('input[name=urgencyDegree]:checked').val(),
            "remarkFirst": $('#selectTenant').val(),
            "remarkSecond": $('#signName').find('option:selected').text()
        };
        
        if(s == 'submit') {
            var submitSignForm = $.ajax({
                url: $.api.baseLotus+"/api/sign/approve/form/submit",
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
                            window.location.href = '/lotus-admin/my-process?id='+response.data.bizId+'&s=succeed';
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
                            window.location.href = '/lotus-admin/my-process?id='+response.data.bizId+'&s=succeed';
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

function addRowInvestmentSignRelation() {
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    
    var table = document.getElementById('processSignRelation');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select");
    select.setAttribute("class","select2 requestTypeDropDown");
    select.setAttribute("id","requestType_"+count.toLocaleString());
    select.options[0] = new Option('合同申请单','1');
    select.options[1] = new Option('签呈','2');
    column2.appendChild(select);
    
    var select = document.createElement("select");
    select.setAttribute("class","select2 requestItemDropDown");
    select.setAttribute("id","requestItem_"+count.toLocaleString());
    column3.appendChild(select);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","relationInfo_"+count.toLocaleString());
    input.setAttribute("type","text");
    column4.appendChild(input);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteBudgetRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column5.appendChild(remove);

    tbody.appendChild(newrow);
    $('#requestType_'+count.toLocaleString()+', #requestItem_'+count.toLocaleString()).select2();
    updateRequestItems(count.toLocaleString());
    
     $(".requestTypeDropDown").on('change',function(){
        updateRequestItems($(this).attr('id').split('_')[1]);
    })
}

function updateRequestItems(count) {
    if($('#requestType_'+count).length > 0 && $('#requestType_'+count).val() == 1){
        $('#requestItem_'+count).select2({
            placeholder: '输入申请单号',
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
                url: function (params) {
                    return $.api.baseLotus+"/api/rent/contract/form/findAllByFreeCondition?page="+(params.page || 0)+"&size=20&sort=id,asc";
                },
                type: "POST",
                async: true,
                dataType: "json",
                contentType: "application/json",
                delay: 250,
                beforeSend: function(request) {
                    request.setRequestHeader("Login", $.cookie('login'));
                    request.setRequestHeader("Authorization", $.cookie('authorization'));
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                data: function (params) {
                    var map = {
                        key: params.term || $.request.content.mallCode || $.cookie('mallSelected').split(':::')[1],
                        operator: "OR",
                        params: [
                          "mallCode","tenantName","contractNo","unitName","contractName","bizId"
                        ],
                        sorts: []
                    }
                    return JSON.stringify(map);
                },
                processResults: function (data,params) {
                    if(data['code'] === 'C0') {
                        var jsonData = data['data'].content;
                        params.page = params.page || 0;
                        var data;
                        return {
                            results: $.map(jsonData, function(item) {
                                var arr = ['2','4','5','6','7','9'];
                                var index = $.inArray(item.formStatus,arr);
                                if(index >= 0){
                                    data = {
                                        id: item.bizId,
                                        text: item.tenantName + '[' + item.bizId + '] | ' + (item.contractName || '') + ' | ' + item.mallName + '[' + item.mallCode+'] ' +item.unitName + ' | ' + item.startDate + '～' + item.endDate         
                                    }
                                    var returnData = [];
                                    returnData.push(data);
                                    return returnData;
                                }
                            }),
                            pagination: {
                                "more": 20 <= jsonData.length
                            }
                        }
                    } else {
                        alertMsg(data['code'],data['customerMessage']);
                    }
                },
                cache: true
            }
        });
    } else if($('#requestType_'+count).length > 0 && $('#requestType_'+count).val() == 2){
        $('#requestItem_'+count).select2({
            placeholder: '输入签呈单号',
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
                url: function (params) {
                    return $.api.baseLotus+"/api/sign/approve/form/findAllByFreeCondition?page="+(params.page || 0)+"&size=20&sort=id,asc";
                },
                type: "POST",
                async: true,
                dataType: "json",
                contentType: "application/json",
                delay: 250,
                beforeSend: function(request) {
                    request.setRequestHeader("Login", $.cookie('login'));
                    request.setRequestHeader("Authorization", $.cookie('authorization'));
                    request.setRequestHeader("Lang", $.cookie('lang'));
                    request.setRequestHeader("Source", "onlineleasing");
                },
                data: function (params) {
                    var map = {
                        key: params.term || $.request.content.mallCode || $.cookie('mallSelected').split(':::')[1],
                        operator: "OR",
                        params: [
                          "mallCode","bizId","applyReason"
                        ],
                        sorts: []
                    }
                    return JSON.stringify(map);
                },
                processResults: function (data,params) {
                    if(data['code'] === 'C0') {
                        var jsonData = data['data'].content;
                        params.page = params.page || 0;
                        var data;
                        return {
                            results: $.map(jsonData, function(item) {
                                var arr = ['2','9'];
                                var index = $.inArray(item.formStatus,arr);
                                if(index >= 0){
                                    data = {
                                        id: item.bizId,
                                        text: item.applyReason + '[' + item.bizId + '] | ' + (item.applyDate || '')       
                                    }
                                    var returnData = [];
                                    returnData.push(data);
                                    return returnData;
                                }
                            }),
                            pagination: {
                                "more": 20 <= jsonData.length
                            }
                        }
                    } else {
                        alertMsg(data['code'],data['customerMessage']);
                    }
                },
                cache: true
            }
        });
    } else {
        return false;
    }
}

function updateRowInvestmentSignRelation(v) {
    var value = JSON.parse(v);
    var newrow = document.createElement("tr");
    var column1 = createRowColumn(newrow);
    var column2 = createRowColumn(newrow);
    var column3 = createRowColumn(newrow);
    var column4 = createRowColumn(newrow);
    var column5 = createRowColumn(newrow);
    
    var table = document.getElementById('processSignRelation');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length + 1;
    column1.innerText = count.toLocaleString();
    
    var select = document.createElement("select");
    select.setAttribute("class","select2 requestTypeDropDown");
    select.setAttribute("id","requestType_"+count.toLocaleString());
    select.options[0] = new Option('合同申请单','1');
    select.options[1] = new Option('签呈','2');
    column2.appendChild(select);
    
    var select = document.createElement("select");
    select.setAttribute("class","select2 requestItemDropDown");
    select.setAttribute("id","requestItem_"+count.toLocaleString());
    column3.appendChild(select);
    
    var input = document.createElement("input");
    input.setAttribute("class","form-control");
    input.setAttribute("id","relationInfo_"+count.toLocaleString());
    input.setAttribute("type","text");
    input.setAttribute("value",value.relationInfo);
    column4.appendChild(input);
    
    var remove = document.createElement("a");
    remove.setAttribute("href", "javascript:void(0);");
    remove.setAttribute("onClick", "deleteBudgetRow(this)");
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-minus-circle");
    icon.setAttribute("style", "color: #ED4A52; font-size: 16px;");
    remove.appendChild(icon);
    column5.appendChild(remove);

    tbody.appendChild(newrow);
    $('#requestType_'+count.toLocaleString()+', #requestItem_'+count.toLocaleString()).select2();
    $("#requestType_"+count.toLocaleString()).val(value.relationType).trigger("change");
    updateRequestItems(count.toLocaleString());
    if(value.relationBizId.slice(0,4) == 'SIGN'){
        findSignRelationSignFormByRelationBizId(value.relationBizId,count.toLocaleString());
    } else {
        findSignRelationRequestFormByRelationBizId(value.relationBizId,count.toLocaleString());
    }
}

function findSignRelationSignFormByRelationBizId(rbid,index) {
    $.ajax({
        url: $.api.baseLotus+"/api/sign/approve/form/findAllByBizId?bizId="+rbid,
        type: "GET",
        async: true,
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null){
                    var data = response.data;
                    var temp = new Option((data.applyReason + '[' + data.bizId + '] | ' + (data.applyDate || '') ), data.bizId, true, true);
                    $('#requestItem_'+index).append(temp).trigger('change');
                }
            }
        }
    })
}

function findSignRelationRequestFormByRelationBizId(rbid,index) {
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByBizId?bizId="+rbid,
        type: "GET",
        async: true,
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
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null){
                    var data = response.data;
                    var temp = new Option((data.tenantName + '[' + data.bizId + '] | ' + (data.contractName || '') + ' | ' + data.mallName + '[' + data.mallCode+'] ' +data.unitName + ' | ' + data.startDate + '～' + data.endDate), data.bizId, true, true);
                    $('#requestItem_'+index).append(temp).trigger('change');
                }
            }
        }
    })
}

function findUserRoleYZJByKVCondition(mc){
    var conditionGroups = [];
    conditionGroups.push({
        "conditionOperator": "OR",
        "params": [{
                "columnName": "mallCode",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "=",
                "value": mc
            }
        ]
    },{
        "conditionOperator": "OR",
        "params": [{
                "columnName": "roleId",
                "columnPatten": "",
                "conditionOperator": "AND",
                "operator": "in",
                "value": "signLeasingApprove;signFinPreApprove;signLegalPreApprove;signFinApprove;signLegalApprove;signHqLeasingApprove;signApprove"
            }
        ]
    });

    var map = {
        "conditionGroups": conditionGroups,
        "params": []
    }
    
    $.ajax({
        url: $.api.baseCommYZJ+"/api/vUserRole/yzj/findAllByKVCondition?page=0&size=100&sort=id,desc",
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
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length > 0){
                    $.each(response.data.content, function(i,v){
                        $('#'+v.roleId).find('label').find('b').text(v.roleName);
                        updateUserRoleYZJDropDownByRoleId(v.roleId,mc);
                        var pathname = window.location.pathname;
                        if(v.mallCode != null && v.mallCode != '' && (pathname.indexOf('make-request') != -1 || pathname.indexOf('renew-request') != -1 || pathname.indexOf('terminate-request') != -1 || pathname.indexOf('modify-request') != -1)){
                            var newOption = new Option(v.name, v.openId, true, true);
                            $('#'+v.roleId+' select').append(newOption).trigger('change');
                        }
                    })
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}