$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                successMsg('00','提交成功！');
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
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllRequestsByKVCondition(getURLParameter('page'),items);
    } else {
        findAllRequestsByKVCondition(1,items);
    }

    switch (getURLParameter('items')) {
        case '10':
            $('.page-size').text('10');
            break;
        case '20':
            $('.page-size').text('20');
            break;
        case '30':
            $('.page-size').text('30');
            break;
        case '50':
            $('.page-size').text('50');
            break;
        default:
            $('.page-size').text('20');
            break;
    }
    
    $('#department option').each(function(j, elem){
        $.each(JSON.parse($.cookie('userModules')), function(i, v) {
            if(v.roleCode == 'CROLE211008000001' && v.moduleName == '门店对接人') {
                if($(elem).val() == v.moduleCode){
                    $('#department option:eq('+j+')').addClass('no-remove');
                }
            } else if(v.roleCode == 'CROLE211008000002' && v.moduleName == 'Lotus门店管理员') {
                $('#department option:eq('+j+')').addClass('no-remove');
            }
        })
    })
    $("#department").find("option:not(.no-remove)").remove();
    
    updateSelectTenantDropDown(50);
    updateSelectStoreDropDown(10);
    
    $('#clear').click(function(){
        $('#contractNo').val('');
        $('#selectTenant, #selectStore, #formType').empty(); 
        $('#selectTenant, #department, #formStatus').val("").trigger('change');
        $('#selectStore, #formType').select2("val", "");
    })
    
    $('#search').click(function(){
        findAllRequestsByKVCondition(1,items);
    })
});

function findAllRequestsByKVCondition(p,c){
    $('#todo').html('');
    var params = [];
    var param = {};
    
    var openId = 'admin';
    $.each(JSON.parse($.cookie('userModules')), function(i,v) {
        if(v.roleCode == 'CROLE220301000001'){
            openId = v.moduleName;
            return false;
        }
    })
    
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
        "conditionOperator": "OR",
        "operator": "=",
        "value": '1'
    }
    params.push(param);
    
    param = {
        "columnName": "formStatus",
        "columnPatten": "",
        "conditionOperator": "OR",
        "operator": "=",
        "value": '3'
    }
    params.push(param);
    
    param = {
        "columnName": "formStatus",
        "columnPatten": "",
        "conditionOperator": "OR",
        "operator": "=",
        "value": '4'
    }
    params.push(param);
    
    param = {
        "columnName": "formStatus",
        "columnPatten": "",
        "conditionOperator": "OR",
        "operator": "=",
        "value": '5'
    }
    params.push(param);
    
    param = {
        "columnName": "formStatus",
        "columnPatten": "",
        "conditionOperator": "OR",
        "operator": "=",
        "value": '6'
    }
    params.push(param);
    
    var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    var pages =  response.data.totalPages;
                    generatePages(p, pages, c);
                    
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
                        var link = '<a href="/lotus-admin/'+page+'-summary?id='+v.bizId+'">'+v.bizId+'</a>';
                        if($.inArray(v.formStatus, ['4','5','7']) != -1){
                            link = '<a href="javascript: void(0)" onclick=\'javascript: popUpToDo("'+v.bizId+'","'+(v.contractNo || '')+'","'+(renderFormStatus(v.formStatus) || '')+'","'+v.formType+'","'+v.tenantName+'")\'>'+v.bizId+'</a>';
                        }
                        $('#todo').append('\
                            <tr data-index="'+i+'">\n\
                            <td>'+link+'</td>\n\
                            <td>'+(v.contractNo || '')+'</td>\n\
                            <td>'+(renderFormStatus(v.formStatus) || '')+'</td>\n\
                            <td>'+(renderFormType(v.formType) || '')+'</td>\n\
                            <td>'+(v.tenantName || '')+'</td>\n\
                            <td>'+(v.mallName || '')+'</td>\n\
                            <td>'+v.unitName+'['+v.unitCode+']</td>\n\
                            <td>'+(v.bizTypeName || '')+'</td>\n\
                            <td>'+(v.contractName || '')+'</td>\n\
                        </tr>');
                        
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#todo').html('<tr><td colspan="9" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}

function renderFormStatus(s) {
    var status = '';
    if(sessionStorage.getItem("FORM_STATUS") && sessionStorage.getItem("FORM_STATUS") != null && sessionStorage.getItem("FORM_STATUS") != '') {
        var status = $.parseJSON(sessionStorage.getItem("FORM_STATUS"));
        $.each(status, function(i,v){
            if(v.dictCode == s){
                status = v.dictName;
            }
        })
    }  
    return status;
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

function updateSelectTenantDropDown(data_count) {
    $('#selectTenant').select2({
        minimumResultsForSearch: -1,
        placeholder: '未选择',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseLotus+"/api/tenant/lotus/findAll",
            type: 'GET',
            dataType: 'json',
            delay: 25,
            data: function (params) {
                return {
                    page: params.page || 0,
                    size: data_count,
                    sort: 'id,desc',
                    search: params.term
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.tenantCode,
                                text: item.tenantCode +' | '+ item.name
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function updateSelectStoreDropDown(data_count) {
    $('#selectStore').select2({
        minimumResultsForSearch: -1,
        placeholder: '未选择',
        dropdownAutoWidth: true,
        language: {
            searching: function() {
                return '加载中...';
            },
            loadingMore: function() {
                return '加载中...';
            }
        },
        ajax: {
            url: $.api.baseLotus+"/api/vshop/lotus/findAllByUserCodeAndMallCodes",
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
                var mallCodes;
                if($('#department').val() != null && $('#department').val() != '' && $('#department').val() != 'null'){
                    mallCodes = $('#department').val();
                } else {
                    mallCodes = $.cookie('mallSelected').split(':::')[1];
                }
                
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if(v.roleCode == 'CROLE211008000002' && v.moduleCode == 'ALL'){
                        mallCodes = 'ALL';
                        return false;
                    }
                })
                
                return {
                    page: params.page || 0,
                    size: data_count,
                    search: params.term,
                    userCode: $.cookie('uid'),
                    mallCodes: mallCodes
                }
            },
            processResults: function (data,params) {
                if(data['code'] === 'C0') {
                    var jsonData = data['data'].content;
                    params.page = params.page || 0;
                    var data;
                    return {
                        results: $.map(jsonData, function(item) {
                            data = {
                                id: item.unitCode+':::'+item.code+':::'+item.unitName,
                                text: item.unitName +'['+ item.unitCode +'] | '+ item.unitArea + '㎡'                            
                            }
                            var returnData = [];
                            returnData.push(data);
                            return returnData;
                        }),
                        pagination: {
                            "more": data_count <= jsonData.length
                        }
                    }
                } else {
                    alertMsg(data['code'],data['customerMessage']);
                }
            },
            cache: true
        }
    });
}

function popUpToDo(bizId,contractNo,formStatus,formType,tenantName) {
    $('#reqBizId').text(bizId);
    $('#reqContractNo').text(contractNo);
    $('#reqFormStatus').text(formStatus);
    $('#reqFormType').text(renderFormType(formType) || '');
    $('#reqTenantName').text(tenantName);
    
   
    var headTxt, type;
    switch (formStatus) {
        case "未用印合同上传":
            headTxt = '上传待租户用印合同';
            type = 'INIT';
            break;
        case "租户用印合同上传":
            headTxt = '上传待我司用印合同';
            type = 'TENANT';
            break;
        case "双方用印合同上传":
            headTxt = '上传双方已用印合同';
            type = 'SIGN';
            break;
        default:
            break;
    }

    $('#investment-todo-request-modify-create .modal-header').find('h4').text(headTxt);
    $('#investment-todo-request-modify-create').modal('toggle');
    
    $("#reqUploadFile").on('click',function(){
        fileUpload(bizId, contractNo, formType, type);
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
            url: $.base+"/zuul/onlineleasing-lotus/api/co/file/uploadYzj?bizId="+bizId+"&creatorOpenId="+openId+"&activityName=&bizType=CONTRACT_"+type,
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
    $.ajax({
        url: $.api.baseLotus+"/api/rent/contract/form/contractUpload?bizId="+bizId+"&stepType=CONTRACT_"+type,  //参数加上openid
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