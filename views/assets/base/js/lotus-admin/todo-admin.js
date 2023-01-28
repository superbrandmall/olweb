$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                successMsg('00','提交成功！');
                break;
            case "delete":
                successMsg('00','删除成功！');
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    if(!sessionStorage.getItem("FORM_STATUS") || sessionStorage.getItem("FORM_STATUS") == null || sessionStorage.getItem("FORM_STATUS") == '') {
        findDictCodeByDictTypeCode('FORM_STATUS');
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    findAllRequestsByKVCondition();
});

window.onload = function () {
    var R = Raphael("map", 600, 500);
	//调用绘制地图方法
    paintMap(R);
	
	var textAttr = {
        "fill": "#000",
        "font-size": "12px",
        "cursor": "pointer"
    };
			
           
    for (var state in china) {
		china[state]['path'].color = Raphael.getColor(0.9);
				
        (function (st, state) {
			
			//获取当前图形的中心坐标
            var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);
			
            //***修改部分地图文字偏移坐标
            switch (china[state]['name']) {
                case "江苏":
                    xx += 5;
                    yy -= 10;
                    break;
                case "河北":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津":
                    xx += 10;
                    yy += 10;
                    break;
                case "上海":
                    xx += 10;
                    break;
                case "广东":
                    yy -= 10;
                    break;
                case "澳门":
                    yy += 10;
                    break;
                case "香港":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西":
                    xx += 5;
                    yy += 10;
                    break;
                case "内蒙古":
                    xx -= 15;
                    yy += 65;
                    break;
                default:
            }
            //写入文字
            china[state]['text'] = R.text(xx, yy, china[state]['name']).attr(textAttr);
            //china[state]['path'].setAttribute("fill","#113333"); //rgba(0,0,china[state]['nvalue'],0);
            //x = china[state]['nvalue'] *255 * 16 + 10 * 255;
            //china[state]['nvalue']=255-china[state]['nvalue'];
            //x = "rgb(255, 255, " + china[state]['nvalue'] + ")";
            if($.inArray(china[state]['name'], ['北京','上海','重庆','江苏','河南','山东','湖南','陕西']) != -1){
                x = "rgb(254, 0, 0)";
            } else {
                x = "rgb(246, 247, 246)";
            }
            //x = "rgb(255," + china[state]['nvalue'] + ",255)";
            //x = "rgb("+china[state]['nvalue'] +",255,255)";
            china[state]['path'].attr("fill", x);	
         })(china[state]['path'], state);
    }
}

function findAllRequestsByKVCondition(){
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
        
    $('#draftListBody, #draftCount, #doneListBody, #doneCount, #toDoListBody, #toDoCount').html('');
    
    var params = [];
    var param = {};

    param = {
        "columnName": "creatorOpenId",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": openId
    }
    params.push(param);

    param = {
        "columnName": "contractName",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "!=",
        "value": 'KOW'
    }
    params.push(param);

    param = {
        "columnName": "bizId",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "not like",
        "value": '%_OLD'
    }
    params.push(param);

    param = {
        "columnName": "formStatus",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "=",
        "value": '1'
    }
    params.push(param);

    var map = {
        "params": params
    }

    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByKVCondition?page=0&size=100&sort=id,desc",
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

                if(response.data.content.length > 0) {
                    $("#draftCount").text("("+response.data.content.length+")");
                    $.each(response.data.content, function(i,v){
                        var page;
                        switch (v.formType) {
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
                        
                        $('#draftListBody').append('\
                            <tr>\n\
                            <td><a href="/lotus-admin/'+page+'-summary?id='+v.bizId+'">'+(v.mallName || '')+('['+v.brandName+']' || '')+'</a></td>\n\
                            <td>'+(renderFormType(v.formType) || '')+'</td>\n\
                            <td>'+v.updated+'</td>\n\
                            <td><a href="javascript:void(0);" onclick=\'javascript: deleteFormByBizId("'+v.bizId+'")\'>\n\
                                <i class="fa fa-minus-circle"></i>\n\
                            </a></td>\n\
                        </tr>');

                    });
                } else {
                    $('#draftListBody').html('<tr><td colspan="4" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });

    var map = {
        "conditionGroups": [],
        "params": [
            {
                "columnName": "handler",
                "columnPatten": "",
                "conditionOperator": "",
                "operator": "=",
                "value": openId
            }
        ]
    }
        
    $.ajax({
        url: $.api.baseCommYZJ+"/api/v/process/inst/record/findAllByKVCondition?page=0&size=100&sort=id,desc",
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

                if(response.data.content.length > 0) {
                    var dAmount = 0; 
                    var tAmount = 0;
                    var dRequests = [];
                    var tRequests = [];
                        
                    $.each(response.data.content, function(i,v){
                        var page, processInstStatus;
                        switch (v.bizType) {
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
                        
                        switch (v.processInstStatus) {
                            case "RUNNING":
                                processInstStatus = '审批中';
                                break;
                            case "RETURNED":
                                processInstStatus = '退回';
                                break;
                            case "FINISH":
                                processInstStatus = '完成';
                                break;
                            default:
                                break;
                        }
                        
                        if(v.stepStatus == 'DONE'){
                            var link = '';
                            if($.inArray(v.bizId, dRequests) == -1){
                                dAmount++;
                                dRequests.push(v.bizId);
                                if(v.activityName != '开始审批' && v.activityName != '提交人'){
                                    link = '<a href="/lotus-admin/'+page+'-summary?id='+v.bizId+'">'+(v.mallName || '')+('['+v.brandName+']' || '')+'</a>';
                                    
                                    $("#doneCount").text("("+dAmount+")");
                                    $('#doneListBody').append('\
                                     <tr>\n\
                                     <td>'+link+'</td>\n\
                                     <td>'+(v.creatorName || 'admin')+'</td>\n\
                                     <td>'+v.handleTime+'</td>\n\
                                    </tr>');
                                }
                            }
                        } else if(v.stepStatus == 'DOING'){
                            var link = '';
                            if($.inArray(v.bizId, tRequests) == -1){
                                tAmount++;
                                tRequests.push(v.bizId);
                                if(v.activityName == '开始审批'){
                                    link = '<a href="/lotus-admin/'+page+'-summary?id='+v.bizId+'">'+(v.mallName || '')+('['+v.brandName+']' || '')+'</a>';
                                } else if(v.activityName == '合同上传' || v.activityName == '合同收回' || v.activityName == '盖章合同上传') {
                                    link = '<a href="javascript: void(0)" onclick=\'javascript: popUpToDo("'+v.bizId+'","'+(v.contractNo || '')+'","'+v.activityName+'","'+v.bizType+'","'+v.tenantName+'")\'>'+(v.mallName || '')+('['+v.brandName+']' || '')+'</a>';
                                } else {
                                    link = '<a href="/id/'+(v.bizId.toLowerCase())+'/lotus-approval-opinion" target="_blank">'+(v.mallName || '')+('['+v.brandName+']' || '')+'</a>'; 
                                }

                                $("#toDoCount").text("("+tAmount+")");
                                $('#toDoListBody').append('\
                                <tr>\n\
                                <td>'+link+'</td>\n\
                                <td>'+(v.creatorName || 'admin')+'</td>\n\
                                <td>'+processInstStatus+'['+v.activityName+']</td>\n\
                                </tr>');
                            }
                        }
                    });
                    
                    if(dRequests > 0){
                        $('#doneListBody').html('<tr><td colspan="3" style="text-align: center;">没有找到任何记录！</td></tr>');
                    }
                    
                    if(tRequests > 0){
                        $('#toDoListBody').html('<tr><td colspan="3" style="text-align: center;">没有找到任何记录！</td></tr>');
                    }
                } else {
                    $('#doneListBody, #toDoListBody').html('<tr><td colspan="3" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
    
}

function renderFormType(t) {
    var type = '';
    if(sessionStorage.getItem("FORM_TYPE") && sessionStorage.getItem("FORM_TYPE") != null && sessionStorage.getItem("FORM_TYPE") != '') {
        var type = $.parseJSON(sessionStorage.getItem("FORM_TYPE"));
        $.each(type, function(i,v){
            if(v.dictCode == t){
                type = v.dictName;
            }
        })
    }
    return type;
}

function popUpToDo(bizId,contractNo,activityName,bizType,tenantName) {
    var headTxt, type, formStatus;
    switch (activityName) {
        case "合同上传":
            headTxt = '上传待租户用印合同';
            formStatus = '未用印合同上传';
            type = 'INIT';
            break;
        case "合同收回":
            headTxt = '上传待我司用印合同';
            formStatus = '租户用印合同上传';
            type = 'TENANT';
            break;
        case "盖章合同上传":
            headTxt = '上传双方已用印合同';
            formStatus = '双方用印合同上传';
            type = 'SIGN';
            break;
        default:
            break;
    }
    
    $('#reqBizId').text(bizId);
    $('#reqContractNo').text(contractNo);
    $('#reqFormStatus').text(formStatus);
    $('#reqFormType').text(renderFormType(bizType) || '');
    $('#reqTenantName').text(tenantName);

    $('#investment-todo-request-modify-create .modal-header').find('h4').text(headTxt);
    $('#investment-todo-request-modify-create').modal('toggle');
    
    $("#reqUploadFile").on('click',function(){
        fileUpload(bizId, contractNo, bizType, type);
    })
    
    $('#createToDoModify').on('click',function(){
        contractUpload(bizId, type);
    })
}

function fileUpload(bizId, contractNo, formType, type) {
    if($('#reqUploadFile').parent().find("input[type=file]").val() != ''){
        var fileName = bizId+'_'+contractNo+'_'+date+'_'+formType+'_'+type;
        
        var formData = new FormData();
        var file = $('#reqUploadFile').parent().find("input[type=file]")[0].files[0];
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
            url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+bizId+"&creatorOpenId="+openId+"&activityName=CONTRACT_"+type+"&bizType=CONTRACT_"+type,
            data: formData,
            async: false,
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

                    $('#reqUploadFileName').val('');
                    $('#reqUploadFile').parent().find("input[type=file]").val('');
                    $('#reqFileName').html(response.data.fileName+'\
<br><a href="'+$.api.baseLotus+'/api/co/file/showFile?bizId='+response.data.bizId+'&fileId='+response.data.fileId+'" target="_blank">查看文件</a> | \n\
<a href="javascript:void(0)" onclick=\'javascript: deleteFile("'+response.data.id+'")\'>删除文件</a>\n\
<input type="hidden" id="file_'+response.data.id+'" />');
                    $('#reqUploadTime').text(response.data.created);
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
                
                $('#reqFileName').html('-');
                $('#reqUploadTime').html('-');
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

function deleteFormByBizId(bizId) {
    var msg = '确定要删除这份草稿吗？';
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
        
        $.ajax({
            url: $.api.baseLotus+"/api/rent/contract/form/deleteByBizId?delKey=lotus&bizId="+bizId+"&updateOpenId="+openId,
            type: "DELETE",
            async: false,
            beforeSend: function (request) {
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

                    window.location.href = '/lotus-admin/todo?s=delete'+window.location.hash;
                } else {
                    alertMsg(response.code,response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    })
}