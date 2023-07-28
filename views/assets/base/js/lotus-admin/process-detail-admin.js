$(document).ready(function(){
    if(!sessionStorage.getItem("FLOW_STATUS") || sessionStorage.getItem("FLOW_STATUS") == null || sessionStorage.getItem("FLOW_STATUS") == '') {
        findDictCodeByDictTypeCode('FLOW_STATUS');
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    findProcessByBizId();
})

function findProcessByBizId() {
    $.ajax({
        url: $.api.baseCommYZJ+"/api/process/inst/form/findAllByBizId?bizId="+getURLParameter('id'),
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
                    
                    $('#status').text(renderFlowStatus(data.processInstStatus));
                    $('#formType').text(renderFormType(data.bizType));
                    
                    $('#processName').text('租赁合同申请['+data.bizId+']').attr('title','租赁合同申请['+data.bizId+']');
                    $('#processInstStatus').text(renderFlowStatus(data.processInstStatus));
                    $('#creatorName').text((data.creatorName || 'admin'));
                    $('#created').text(data.created);
                    $('#updated').text((data.updated || ''));
                    $('#bizType').text('/招商/合同'+renderFormType(data.bizType));
                    
                    $("#checkRequest").on('click',function(){
                        var page;
                        switch (data.bizType) {
                            case "new":
                                page = 'request';
                                break;
                            case "renew":
                                page = 'renew';
                                break;
                            case "termination":
                                page = 'terminate';
                                break;
                            case "modify":
                                page = 'modify';
                                break;
                            default:
                                break;
                        }
                        
                        var main = '';
                        if($.inArray(data.mallCode, $.api.mallCodeSH) == -1){
                            main = '&t=';
                        }
                        window.open('/lotus-admin/'+page+'-summary?id='+data.bizId+main, "_newtab");
                    })
                    
                    $('#approvalProcess').html('');
                    if(data.processStepRecordList != '' && data.processStepRecordList != null && data.processStepRecordList.length > 0){
                        var index = 0;
                        $.each(data.processStepRecordList, function(i,v) {
                            switch (v.activityName) {
                                case "提交人":
                                    $('.step-progress li:eq(0)').addClass('active');
                                    break;
                                case "Lotus招商负责人":
                                    $('.step-progress li:eq(1)').addClass('active');
                                    break;
                                case "财法预审负责人":
                                    $('.step-progress li:eq(2)').addClass('active');
                                    break;
                                case "财法负责人":
                                    $('.step-progress li:eq(3)').addClass('active');
                                    break;
                                case "业态负责人":
                                    $('.step-progress li:eq(4)').addClass('active');
                                    break;
                                case "总部招商负责人":
                                    $('.step-progress li:eq(5)').addClass('active');
                                    break;
                                case "合同上传":
                                    $('.step-progress li:eq(6)').addClass('active');
                                    break;
                                case "合同收回":
                                    $('.step-progress li:eq(7)').addClass('active');
                                    break;
                                case "合同用印财法预审":
                                    $('.step-progress li:eq(8)').addClass('active');
                                    break;
                                case "合同用印财法负责人":
                                    $('.step-progress li:eq(9)').addClass('active');
                                    break;
                                case "合同用印总部招商负责人":
                                    $('.step-progress li:eq(10)').addClass('active');
                                    break;
                                case "盖章合同上传":
                                    $('.step-progress li:eq(11)').addClass('active');
                                    break;
                                default:
                                    break;
                            }

                            if((i != 0 && v.status != null && v.status != 'WITHDRAW') || v.activityType == 'END'){
                                index++;
                                $('#approvalProcess').append('<tr><td>'+index+'</td>\n\
                                <td>'+v.activityName+'</td>\n\
                                <td>'+(v.approveName || '')+'</td>\n\
                                <td>'+(v.status != null ? renderFlowSteps(v.status) : '')+'</td>\n\
                                <td>'+(v.opinion || '')+'</td>\n\
                                <td>'+(v.createTime || '')+'</td>\n\
                                <td>'+(v.handleTime || '')+'</td></tr>');
                            }
                            
                            if(i == (data.processStepRecordList.length - 1) && v.status == 'DOING' && (v.activityName == '合同上传' || v.activityName == '合同收回' || v.activityName == '盖章合同上传')){
                                $('#processFiles').show();
                                $('.breadcrumb li:eq(2)').show();
                                
                                var headTxt, type, formStatus;
                                switch (v.activityName) {
                                    case "合同上传":
                                        headTxt = '待租户用印合同';
                                        formStatus = '未用印合同上传';
                                        type = 'INIT';
                                        break;
                                    case "合同收回":
                                        headTxt = '待我司用印合同';
                                        formStatus = '租户用印合同上传';
                                        type = 'TENANT';
                                        break;
                                    case "盖章合同上传":
                                        headTxt = '双方已用印合同';
                                        formStatus = '双方用印合同上传';
                                        type = 'SIGN';
                                        break;
                                    default:
                                        break;
                                }
                                
                                $('.headTxt').text(headTxt);
                                $("#reqUploadFile").on('click',function(){
                                    $(this).attr('pointer-events','none');
                                    fileUpload(data.bizId, data.contractNo, data.bizType, type, 'reqFile');
                                })

                                $("#uploadFile_otherFiles").on('click',function(){
                                    $(this).attr('pointer-events','none');
                                    fileUpload(data.bizId, data.contractNo, data.bizType, type, 'otherFiles');
                                })
                                
                                $('#createToDoModify').on('click',function(){
                                    contractUpload(v.bizId, type);
                                })
                                return false;
                            }
                        })
                    }
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function fileUpload(bizId, contractNo, formType, type, id) {
    var container;
    switch (id) {
        case "reqFile":
            container = $('#reqUploadFile');
            break;
        default:
            container = $('#uploadFile_otherFiles');
            break;
    }
    if(container.parent().find("input[type=file]").val() != ''){
        var t;
        var formData = new FormData();
        var fileName = bizId+'_'+contractNo+'_'+date+'_'+formType+'_'+type;
        switch (id) {
            case "reqFile":
                t = type;
                var file = $('#reqUploadFile').parent().find("input[type=file]")[0].files[0];
                formData.append('file', file,fileName+'.'+file.name.split('.')[file.name.split('.').length - 1]);
                break;
            default:
                t = 'OF';
                var file = $('#uploadFile_'+id).parent().find("input[type=file]")[0].files[0];
                formData.append('file', file);
                break;
        }

        var openId = 'admin';
        $.each(JSON.parse($.cookie('userModules')), function(i,v) {
            if(v.roleCode == 'CROLE220301000001'){
                openId = v.moduleName;
                return false;
            }
        })

        var upload = $.ajax({
            type: "POST",
            url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+bizId+"&creatorOpenId="+openId+"&activityName=CONTRACT_"+type+"&bizType=CONTRACT_"+t,
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
                $('#reqUploadFile','#uploadFile_otherFiles').attr('pointer-events','');
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
                        if(id == 'reqFile' || $('#'+id+'_'+i).val() == ''){
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
                        type = 'reqFile';
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

function contractUpload(bizId, type) {
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
        
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/contractUpload?bizId="+bizId+"&stepType=CONTRACT_"+type+"&openId="+openId,
        type: "GET",
        async: true,
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
                
                if(response.data.resultCode == 'SUCCESS') {
                    window.location.href = '/lotus-admin/todo?s=succeed';
                } else {
                    alertMsg(response.data.resultCode,response.data.resultMsg);
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function findFilesByBizId(id,an) {
    $("input[id*='fileName_']").val('');
    $("td[id*='uploadFile_']").parent().find("input[type=file]").val('');
    
    $("td[id*='Action_'],td[id*='FileSize_'],td[id*='Created_']").text('');
    $("input[id*='reqFile_'],input[id*='otherFiles_']").val('');
                    
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/findAllByBizId?bizId="+id,
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
                        if(v.activityName == an){
                            sessionStorage.setItem("uploadFile_"+v.id,JSON.stringify(v));
                            var bizType = v.bizType.split('_')[1];
                            var type;
                            switch (bizType) {
                                case "OF":
                                    type = 'otherFiles';
                                    break;
                                default:
                                    type = 'reqFile';
                                    break;
                            }

                            $("input[id*='"+type+"_']").each(function(j,e){
                                if(type == 'reqFile' || $('#'+type+'_'+j).val() == ''){
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
                        }
                    })
                }
            }
        }
    })
}

function flowInstUpdate() {
    $.ajax({
        url: $.api.baseCommYZJ+"/api/process/inst/form/flowInstUpdate?bizId="+getURLParameter('id'),
        type: "GET",
        async: true,
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
                
                $('#myModalLabel').text('正在连接云之家, 请稍后...');
                $('#submitStateModal').modal('show');
                var obj = $('#submitState');
                setTimeFlowInst(obj);
            }                             
        }
    })
}

var countdownFlowInst=10;

function setTimeFlowInst(obj) {
    if (countdownFlowInst == 0) { 
        $('#myModalLabel,#submitState').text('');
        $('#submitStateModal').modal('hide');
        findProcessInstByBizId(); 
        countdownFlowInst = 10; 
        return;
    } else { 
        obj.html(countdownFlowInst + "秒");
        countdownFlowInst--; 
    } 
setTimeout(function() { 
    setTimeFlowInst(obj); }
    ,1000); 
}

function findProcessInstByBizId(){
    $.ajax({
        url: $.api.baseCommYZJ+"/api/process/inst/form/findAllByBizId?bizId="+getURLParameter('id'),
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
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie('login', xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != '' && response.data != null){
                    $('#approvalProcess').html('');
                    if(response.data.processStepRecordList != '' && response.data.processStepRecordList != null && response.data.processStepRecordList.length > 0){
                        var index = 0;
                        $.each(response.data.processStepRecordList, function(i,v) {
                            if((i != 0 && v.status != null && v.status != 'WITHDRAW') || v.activityType == 'END'){
                                index++;
                                $('#approvalProcess').append('<tr><td>'+index+'</td>\n\
                                <td>'+v.activityName+'</td>\n\
                                <td>'+(v.approveName || '')+'</td>\n\
                                <td>'+(v.status != null ? renderFlowSteps(v.status) : '')+'</td>\n\
                                <td>'+(v.opinion || '')+'</td>\n\
                                <td>'+(v.createTime || '')+'</td>\n\
                                <td>'+(v.handleTime || '')+'</td></tr>');
                            }
                        })
                    }
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                            
        }
    }); 
}