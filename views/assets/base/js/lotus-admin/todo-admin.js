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
    
    if(!sessionStorage.getItem("FLOW_STATUS") || sessionStorage.getItem("FLOW_STATUS") == null || sessionStorage.getItem("FLOW_STATUS") == '') {
        findDictCodeByDictTypeCode('FLOW_STATUS');
    }
    
    findAllRequestsByKVCondition();
    
    if(localStorage.getItem("account") == 'CUSER200524000004' ){
//        $(function  () {
//            var arrObj = [$('#box1'),$('#box2'),$('#box3')];
//            var arrTitle = ['莲花招商系统事宜汇报','',''];
//            $.guidance({
//                    obj:arrObj,
//                    title:arrTitle
//            });
//	});
    }
});

window.onload = function () {
    var R = Raphael("map", 600, 500);
	//调用绘制地图方法
    paintMap(R);
	
	var textAttr = {
        "fill": "#dd4b39",
        "font-size": "12px",
        "cursor": "pointer",
        "font-weight": "bold"
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
            //china[state]['text'] = R.text(xx, yy, china[state]['name']+'\n12').attr(textAttr);
            //china[state]['path'].setAttribute("fill","#113333"); //rgba(0,0,china[state]['nvalue'],0);
            //x = china[state]['nvalue'] *255 * 16 + 10 * 255;
            //china[state]['nvalue']=255-china[state]['nvalue'];
            //x = "rgb(255, 255, " + china[state]['nvalue'] + ")";
//            if($.inArray(china[state]['name'], ['北京','上海','重庆','江苏','河南','山东','湖南','陕西','广东','广西']) != -1){
//                x = "rgb(131, 204, 60)";
//            } else {
//                x = "rgb(246, 247, 246)";
//            }

            var mallNo = 0;
            switch (china[state]['name']) {
                case "北京":
                    mallNo = '4';
                    break;
                case "上海":
                    mallNo = '17';
                    break;
                case "重庆":
                    mallNo = '2';
                    break;
                case "江苏":
                    mallNo = '6';
                    break;
                case "河南":
                    mallNo = '2';
                    break;
                case "山东":
                    mallNo = '2';
                    break;
                case "湖南":
                    mallNo = '9';
                    break;
                case "陕西":
                    mallNo = '7';
                    break;
                case "广东":
                    mallNo = '46';
                    break;
                case "广西":
                    mallNo = '1';
                    break;
                default:
            }
            
            if($.inArray(china[state]['name'], ['北京','上海','重庆','江苏','河南','山东','湖南','陕西','广东','广西']) != -1){
                china[state]['text'] = R.text(xx, yy, china[state]['name']+'\n'+mallNo).attr(textAttr);
                china[state]['image'] = R.image("/views/assets/base/img/content/lotus-admin/circle.gif", xx+=2, yy-=2, 20, 20);
                china[state]['text'][0].onclick = function () {
                    $.cookie('searchMallType',china[state]['name']);
                    location.href = "/lotus-admin/malls";
                }
                china[state]['image'][0].onclick = function () {
                    $.cookie('searchMallType',china[state]['name']);
                    location.href = "/lotus-admin/malls";
                }
            }
            
            if($.inArray(china[state]['name'], ['北京','山东','广东']) != -1){
                x = "rgb(254,252,200)";
            } else if($.inArray(china[state]['name'], ['上海','河南','湖南']) != -1){
                x = "rgb(244,218,190)";
            } else if($.inArray(china[state]['name'], ['重庆']) != -1){
                x = "rgb(203,205,230)";
            } else if($.inArray(china[state]['name'], ['江苏','陕西','广西']) != -1){
                x = "rgb(248,202,223)";
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
        url: $.api.baseCommYZJ+"/api/v/process/inst/record/findAllByKVCondition?page=0&size=1000&sort=id,desc",
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
                        var page;
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
                                <td>'+renderFlowStatus(v.processInstStatus)+'['+v.activityName+']</td>\n\
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

function popUpToDo(bizId,contractNo,activityName,bizType,tenantName) {
    findFilesByBizId(bizId,activityName);
    
    var headTxt, type, formStatus;
    switch (activityName) {
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
    
    $('#reqBizId').text(bizId);
    $('#reqContractNo').text(contractNo);
    $('#reqFormStatus').text(formStatus);
    $('#reqFormType').text(renderFormType(bizType) || '');
    $('#reqTenantName').text(tenantName);
    $('.headTxt').text(headTxt);
    $('#investment-todo-request-modify-create').modal('toggle');
    
    $("#reqUploadFile").on('click',function(){
        $(this).attr('pointer-events','none');
        fileUpload(bizId, contractNo, bizType, type, 'reqFile');
    })
    
    $("#uploadFile_otherFiles").on('click',function(){
        $(this).attr('pointer-events','none');
        fileUpload(bizId, contractNo, bizType, type, 'otherFiles');
    })
    
    $('#createToDoModify').on('click',function(){
        contractUpload(bizId, type);
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

function findFilesByBizId(id,an) {
    $("input[id*='fileName_']").val('');
    $("td[id*='uploadFile_']").parent().find("input[type=file]").val('');
    
    $("td[id*='Action_'],td[id*='FileSize_'],td[id*='Created_']").text('');
    $("input[id*='reqFile_'],input[id*='otherFiles_']").val('');
                    
    $.ajax({
        url: $.api.baseLotus+"/api/co/file/findAllByBizId?bizId="+id,
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