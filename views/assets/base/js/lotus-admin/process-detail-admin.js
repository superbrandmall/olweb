$(document).ready(function(){
    if(!sessionStorage.getItem("FLOW_STATUS") || sessionStorage.getItem("FLOW_STATUS") == null || sessionStorage.getItem("FLOW_STATUS") == '') {
        findDictCodeByDictTypeCode('FLOW_STATUS');
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    if(!sessionStorage.getItem("SIGN_APPROVE_TYPE") || sessionStorage.getItem("SIGN_APPROVE_TYPE") == null || sessionStorage.getItem("SIGN_APPROVE_TYPE") == '') {
        findDictCodeByDictTypeCode('SIGN_APPROVE_TYPE');
    }
    
    if(!sessionStorage.getItem("FLOW_STEPS") || sessionStorage.getItem("FLOW_STEPS") == null || sessionStorage.getItem("FLOW_STEPS") == '') {
        findDictCodeByDictTypeCode('FLOW_STEPS');
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
                    var bizType = '',bizId = '', flowDiagram = 1;
                    if($.isNumeric(data.bizType) == false){    
                        bizType = '租赁合同【'+renderFormType(data.bizType)+'】';
                        bizId = '租赁合同申请['+data.bizId+']';
                    } else {
                        if(data.bizType == 5){
                            bizType = '卜蜂莲花【'+renderApproveType(data.bizType)+'】';
                            bizId = '卜蜂莲花用印申请['+data.bizId+']';
                            flowDiagram = 3;
                        } else {
                            bizType = '卜蜂莲花【'+renderApproveType(data.bizType)+'】';
                            bizId = '卜蜂莲花签呈['+data.bizId+']';
                            flowDiagram = 2;
                        }
                        
                        $('#opinion_print').show();
                        $('#opinion_print').click(function(){
                            findSignRequestByBizId();
                        })
                    }
                        
                    var creatorName = (data.creatorName || 'admin')+'【'+data.creatorOrgName+'】';
                    
                    $('#status').text(renderFlowStatus(data.processInstStatus));
                    $('#formType').text(bizType);
                    
                    $('#processName').text(bizId).attr('title',bizId);
                    $('#processInstStatus').text(renderFlowStatus(data.processInstStatus));
                    $('#creatorName').text(creatorName).attr('title',creatorName);
                    $('#created').text(data.created);
                    $('#updated').text((data.updated || ''));
                    $('#bizType').text('/招商/'+bizType);
                    findFilesByBizId(data.bizId, '提交');
                    var main = '';
                    if($.inArray(data.mallCode, $.api.mallCodeEast) == -1){
                        main = '&t=';
                    }
                        
                    $("#checkRequest").on('click',function(){
                        if(flowDiagram == 1){
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

                            window.open('/lotus-admin/'+page+'-summary?id='+data.bizId+main, "_newtab");
                        } else {
                            window.open('/lotus-admin/process-request?id='+data.bizId+main, "_newtab");
                        }
                    })
                    
                    $('#approvalProcess').html('');
                    if(flowDiagram == 1){
                        $('#leasingContract').show();
                        $('#lotusApprove').hide();
                        $('#lotusSign').hide();
                    } else if(flowDiagram == 2){
                        $('#leasingContract').hide();
                        $('#lotusApprove').show();
                        $('#lotusSign').hide();
                    } else {
                        $('#leasingContract').hide();
                        $('#lotusApprove').hide();
                        $('#lotusSign').show();
                    }
                    
                    if(data.processStepRecordList != '' && data.processStepRecordList != null && data.processStepRecordList.length > 0){
                        var index = 0;
                        var headTxt, type;
                        $.each(data.processStepRecordList, function(i,v) {
                            if(flowDiagram == 1){
                                switch (v.activityName) {
                                    case "提交人":
                                        $('#leasingContract li:eq(0)').addClass('active');
                                        break;
                                    case "Lotus招商负责人":
                                        $('#leasingContract li:eq(1)').addClass('active');
                                        break;
                                    case "财法预审负责人":
                                        $('#leasingContract li:eq(2)').addClass('active');
                                        break;
                                    case "财法负责人":
                                        $('#leasingContract li:eq(3)').addClass('active');
                                        break;
                                    case "业态负责人":
                                        $('#leasingContract li:eq(4)').addClass('active');
                                        break;
                                    case "总部招商负责人":
                                        $('#leasingContract li:eq(5)').addClass('active');
                                        break;
                                    case "总裁及地区相关领导":
                                        $('#leasingContract li:eq(6)').addClass('active');
                                        break;
                                    case "合同上传":
                                        $('#leasingContract li:eq(7)').addClass('active');
                                        break;
                                    case "合同收回":
                                        $('#leasingContract li:eq(8)').addClass('active');
                                        break;
                                    case "合同用印财法预审":
                                        $('#leasingContract li:eq(9)').addClass('active');
                                        break;
                                    case "合同用印财法负责人":
                                        $('#leasingContract li:eq(10)').addClass('active');
                                        break;
                                    case "合同用印总部招商负责人":
                                        $('#leasingContract li:eq(11)').addClass('active');
                                        break;
                                    case "合同用印总裁及地区相关领导":
                                        $('#leasingContract li:eq(12)').addClass('active');
                                        break;
                                    case "盖章合同上传":
                                        $('#leasingContract li:eq(13)').addClass('active');
                                        break;
                                    default:
                                        break;
                                }
                            } else if(flowDiagram == 2){
                                switch (v.activityName) {
                                    case "开始审批":
                                        $('#lotusApprove li:eq(0)').addClass('active');
                                        break;
                                    case "招商负责人审批":
                                        $('#lotusApprove li:eq(1)').addClass('active');
                                        break;
                                    case "财法预审负责人":
                                        $('#lotusApprove li:eq(2)').addClass('active');
                                        break;
                                    case "财法负责人":
                                        $('#lotusApprove li:eq(3)').addClass('active');
                                        break;
                                    case "总部招商负责人":
                                        $('#lotusApprove li:eq(4)').addClass('active');
                                        break;
                                    case "签呈负责人审批":
                                        $('#lotusApprove li:eq(5)').addClass('active');
                                        break;
                                    default:
                                        break;
                                }
                            } else {
                                switch (v.activityName) {
                                    case "开始审批":
                                        $('#lotusSign li:eq(0)').addClass('active');
                                        break;
                                    case "招商负责人审批":
                                        $('#lotusSign li:eq(1)').addClass('active');
                                        break;
                                    case "财法预审负责人":
                                        $('#lotusSign li:eq(2)').addClass('active');
                                        break;
                                    case "财法负责人":
                                        $('#lotusSign li:eq(3)').addClass('active');
                                        break;
                                    case "总部招商负责人":
                                        $('#lotusSign li:eq(4)').addClass('active');
                                        break;
                                    case "签呈负责人审批":
                                        $('#lotusSign li:eq(5)').addClass('active');
                                        break;
                                    case "用印文件上传":
                                        $('#lotusSign li:eq(6)').addClass('active');
                                        break;
                                    case "用印财法预审":
                                        $('#lotusSign li:eq(7)').addClass('active');
                                        break;
                                    case "用印财法负责人审批":
                                        $('#lotusSign li:eq(8)').addClass('active');
                                        break;
                                    default:
                                        break;
                                }
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
                            
                            
                            if(i == (data.processStepRecordList.length - 1) && v.status == 'DOING' && (v.activityName == '合同上传' || v.activityName == '合同收回' || v.activityName == '盖章合同上传' || v.activityName == '用印文件上传')){
                                $('#processFiles').show();
                                $('.breadcrumb li:eq(2)').show();
                                
                                switch (v.activityName) {
                                    case "合同上传":
                                        headTxt = '待租户用印合同';
                                        type = 'INIT';
                                        break;
                                    case "合同收回":
                                        headTxt = '待我司用印合同';
                                        type = 'TENANT';
                                        break;
                                    case "盖章合同上传":
                                        headTxt = '双方已用印合同';
                                        type = 'SIGN';
                                        break;
                                    case "用印文件上传":
                                        headTxt = '合同/用印文件';
                                        type = 'APPROVE';
                                        break;
                                    default:
                                        headTxt = '用印文件';
                                        type = '';
                                        break;
                                }
                                
                                findFilesByBizId(data.bizId,v.activityName);
                                return false;
                            }
                        })
                        
                        $('.headTxt').text(headTxt);
                        $("#reqUploadFile").on('click',function(){
                            $(this).attr('pointer-events','none');
                            fileUpload(data.bizId, data.contractNo, bizType, type, 'reqFile');
                        })

                        $("#uploadFile_otherFiles").on('click',function(){
                            $(this).attr('pointer-events','none');
                            fileUpload(data.bizId, data.contractNo, bizType, type, 'otherFiles');
                        })

                        $('#createToDoModify').on('click',function(){
                            if($("input[id*='reqFile_']").val() != ''){
                                if(flowDiagram == 3){
                                    signUpload(data.bizId);
                                } else {
                                    contractUpload(data.bizId, type);
                                }
                            }
                        })
                    }
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        },
        complete: function () {
            setTimeout(function () {
                $('td').each(function(i,e){
                    $(this).attr('title',$(this).text());
                })
            },800);
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
        var fileName = bizId+'_'+(contractNo || '')+'_'+date+'_'+formType+'_'+type;
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


function signUpload(bizId) {
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
    
    var map = {
        "activityName": "用印文件上传",
        "approveOpenId": openId,
        "approveType": "agree",
        "bizId": bizId,
        "moduleType": "lotus",
        "opinion": ""
    };

    $.ajax({
        url: $.api.baseLotus+"/api/flow/approveFlow",
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
                
                if(response.data != null){
                    if(response.data.success == true){
                        window.location.href = '/lotus-admin/my-process?id='+response.data.bizId+'&s=succeed';
                    } else {
                        alertMsg(response.code,response.data.error); 
                    }
                } else {
                    alertMsg(response.code,'您无需审批'); 
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
                                if($('#'+type+'_'+j).val() == ''){
                                //if(type == 'reqFile' || $('#'+type+'_'+j).val() == ''){
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
                    var data = response.data;
                    var bizType = '',bizId = '', flowDiagram = 1;
                    if($.isNumeric(data.bizType) == false){    
                        bizType = '租赁合同【'+renderFormType(data.bizType)+'】';
                        bizId = '租赁合同申请['+data.bizId+']';
                    } else {
                        if(data.bizType == 5){
                            bizType = '卜蜂莲花【'+renderApproveType(data.bizType)+'】';
                            bizId = '卜蜂莲花用印申请['+data.bizId+']';
                            flowDiagram = 3;
                        } else {
                            bizType = '卜蜂莲花【'+renderApproveType(data.bizType)+'】';
                            bizId = '卜蜂莲花签呈['+data.bizId+']';
                            flowDiagram = 2;
                        }
                        
                        $('#opinion_print').show();
                        $('#opinion_print').click(function(){
                            findSignRequestByBizId();
                        })
                    }
                    var creatorName = (data.creatorName || 'admin')+'【'+data.creatorOrgName+'】';
                    
                    $('#status').text(renderFlowStatus(data.processInstStatus));
                    $('#formType').text(bizType);
                    
                    $('#processName').text(bizId).attr('title',bizId);
                    $('#processInstStatus').text(renderFlowStatus(data.processInstStatus));
                    $('#creatorName').text(creatorName).attr('title',creatorName);
                    $('#created').text(data.created);
                    $('#updated').text((data.updated || ''));
                    $('#bizType').text('/招商/'+bizType);
                    
                    $('#approvalProcess').html('');
                    if(flowDiagram == 1){
                        $('#leasingContract').show();
                        $('#lotusApprove').hide();
                        $('#lotusSign').hide();
                    } else if(flowDiagram == 2){
                        $('#leasingContract').hide();
                        $('#lotusApprove').show();
                        $('#lotusSign').hide();
                    } else {
                        $('#leasingContract').hide();
                        $('#lotusApprove').hide();
                        $('#lotusSign').show();
                    }
                    
                    if(data.processStepRecordList != '' && data.processStepRecordList != null && data.processStepRecordList.length > 0){
                        var index = 0;
                        $.each(data.processStepRecordList, function(i,v) {
                            if(flowDiagram == 1){
                                switch (v.activityName) {
                                    case "提交人":
                                        $('#leasingContract li:eq(0)').addClass('active');
                                        break;
                                    case "Lotus招商负责人":
                                        $('#leasingContract li:eq(1)').addClass('active');
                                        break;
                                    case "财法预审负责人":
                                        $('#leasingContract li:eq(2)').addClass('active');
                                        break;
                                    case "财法负责人":
                                        $('#leasingContract li:eq(3)').addClass('active');
                                        break;
                                    case "业态负责人":
                                        $('#leasingContract li:eq(4)').addClass('active');
                                        break;
                                    case "总部招商负责人":
                                        $('#leasingContract li:eq(5)').addClass('active');
                                        break;
                                    case "总裁及地区相关领导":
                                        $('#leasingContract li:eq(6)').addClass('active');
                                        break;
                                    case "合同上传":
                                        $('#leasingContract li:eq(7)').addClass('active');
                                        break;
                                    case "合同收回":
                                        $('#leasingContract li:eq(8)').addClass('active');
                                        break;
                                    case "合同用印财法预审":
                                        $('#leasingContract li:eq(9)').addClass('active');
                                        break;
                                    case "合同用印财法负责人":
                                        $('#leasingContract li:eq(10)').addClass('active');
                                        break;
                                    case "合同用印总部招商负责人":
                                        $('#leasingContract li:eq(11)').addClass('active');
                                        break;
                                    case "合同用印总裁及地区相关领导":
                                        $('#leasingContract li:eq(12)').addClass('active');
                                        break;
                                    case "盖章合同上传":
                                        $('#leasingContract li:eq(13)').addClass('active');
                                        break;
                                    default:
                                        break;
                                }
                            } else if(flowDiagram == 2){
                                switch (v.activityName) {
                                    case "开始审批":
                                        $('#lotusApprove li:eq(0)').addClass('active');
                                        break;
                                    case "招商负责人审批":
                                        $('#lotusApprove li:eq(1)').addClass('active');
                                        break;
                                    case "财法预审负责人":
                                        $('#lotusApprove li:eq(2)').addClass('active');
                                        break;
                                    case "财法负责人":
                                        $('#lotusApprove li:eq(3)').addClass('active');
                                        break;
                                    case "总部招商负责人":
                                        $('#lotusApprove li:eq(4)').addClass('active');
                                        break;
                                    case "签呈负责人审批":
                                        $('#lotusApprove li:eq(5)').addClass('active');
                                        break;
                                    default:
                                        break;
                                }
                            } else {
                                switch (v.activityName) {
                                    case "开始审批":
                                        $('#lotusSign li:eq(0)').addClass('active');
                                        break;
                                    case "招商负责人审批":
                                        $('#lotusSign li:eq(1)').addClass('active');
                                        break;
                                    case "财法预审负责人":
                                        $('#lotusSign li:eq(2)').addClass('active');
                                        break;
                                    case "财法负责人":
                                        $('#lotusSign li:eq(3)').addClass('active');
                                        break;
                                    case "总部招商负责人":
                                        $('#lotusSign li:eq(4)').addClass('active');
                                        break;
                                    case "签呈负责人审批":
                                        $('#lotusSign li:eq(5)').addClass('active');
                                        break;
                                    case "用印文件上传":
                                        $('#lotusSign li:eq(6)').addClass('active');
                                        break;
                                    case "用印财法预审":
                                        $('#lotusSign li:eq(7)').addClass('active');
                                        break;
                                    case "用印财法负责人审批":
                                        $('#lotusSign li:eq(8)').addClass('active');
                                        break;
                                    default:
                                        break;
                                }
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
                        })
                    }
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }                            
        },
        complete: function () {
            setTimeout(function () {
                $('td').each(function(i,e){
                    $(this).attr('title',$(this).text());
                })
            },800);
        }
    }); 
}

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
                    $('#creatorName2').val(data.creatorName != null ? data.creatorName : 'admin');
                    $('#bizId').val(data.bizId);
                    $('#investmentContractModelMallSelect').val(data.mallName+'['+data.mallCode+']');
                    $('#approveInfo').html(data.approveInfo);
                    $('#amount').val((data.amount != null ? data.amount : '--'));
                    $('#mobileNo').val(data.mobileNo);
                    $('#applyReason').val(data.applyReason);
                    $('#corporationName').val(data.corporationName);
                    $('#signFileName').val((data.signFileName != null ? data.signFileName : '--'));
                    $('#applyDate').val(data.applyDate);
                    $('#mainSigningBody').val((data.companyName != null ? data.companyName : '--'));
                    $('#signNum').val((data.signNum != null ? data.signNum : '--'));
                    $('#selectTenant').val(((data.tenantCode != null && data.tenantName != null && data.remarkFirst != null) ? (data.tenantCode +' | '+ data.tenantName) : '--'));
                    $('input[type=radio][name=urgencyDegree][value='+data.urgencyDegree+']').attr("checked",true);
                    $('input[type=checkbox][name=applyType][value='+data.applyTypeCode+']').attr("checked",true);
                    $('input[type=checkbox][name=signName][value='+data.signName+']').attr("checked",true);
                    
                    if(data.applyTypeCode == '5'){
                        $('#corporationName').parent().parent().show();
                        $('#signNum').parent().parent().show();
                        $('#signFileName').parent().parent().show();
                    }
                    
                    var fileListClone = $('#fileList').clone();
                    $('#fileListClone').html(fileListClone);
                    
                    var approvalProcessClone = $('#approvalProcess').children().clone();
                    $('#approvalProcessClone').html(approvalProcessClone);
                    
                    $('input.money').each(function(){
                        $(this).val(accounting.formatNumber($(this).val()));
                    })
                    window.print();
                } else {
                    alertMsg('9999','模块加载错误，该错误由【单号错误】导致！');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}