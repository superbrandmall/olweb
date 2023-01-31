$(document).ready(function(){
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
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
    
    if(!sessionStorage.getItem("CONTRACT_MODIFY_TYPE") || sessionStorage.getItem("CONTRACT_MODIFY_TYPE") == null || sessionStorage.getItem("CONTRACT_MODIFY_TYPE") == '') {
        findDictCodeByDictTypeCode('CONTRACT_MODIFY_TYPE');
    }
    
    if(!sessionStorage.getItem("RENT_CALCULATION_MODE") || sessionStorage.getItem("RENT_CALCULATION_MODE") == null || sessionStorage.getItem("RENT_CALCULATION_MODE") == '') {
        findDictCodeByDictTypeCode('RENT_CALCULATION_MODE');
    }
    
    if($.cookie('searchRequestsFormStatus') != ''){
        $('#formStatus').val($.cookie('searchRequestsFormStatus')).trigger('change');
    }
    if($.cookie('searchRequestsContractNo') != ''){
        $('#contractNo').val($.cookie('searchRequestsContractNo'));
    }
    
    if($.cookie('searchRequestsSelectFormTypeVal') != null){
        updateDictDropDownByDictTypeCode('FORM_TYPE','formType',$.cookie('searchRequestsSelectFormTypeTxt'),$.cookie('searchRequestsSelectFormTypeVal')); // 表单类型
    } else {
        updateDictDropDownByDictTypeCode('FORM_TYPE','formType','未选择',null); // 表单类型
    }
    if($.cookie('searchRequestsSelectTenantVal') != null){
        var newOption = new Option($.cookie('searchRequestsSelectTenantTxt'), $.cookie('searchRequestsSelectTenantVal'), true, true);
        $('#selectTenant').append(newOption).trigger('change');
    }
    if($.cookie('searchContractsSelectDepartmentVal') != null){
        $('#department').val($.cookie('searchContractsSelectDepartmentVal')).trigger('change');
    }
    if($.cookie('searchRequestsSelectStoreVal') != null){
        var newOption = new Option($.cookie('searchRequestsSelectStoreTxt'), $.cookie('searchRequestsSelectStoreVal'), true, true);
        $('#selectStore').append(newOption).trigger('change');
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
    
    updateSelectTenantDropDown(50);
    if($("#department").val() != '' && $("#department").val() != null){
        updateSelectStoreDropDownByMallCode(10,$("#department").val());
    }
    $("#department").on('change',function(){
        updateSelectStoreDropDownByMallCode(10,$(this).val());
    })
    
    $('#clear').click(function(){
        $('#contractNo').val('');
        $('#selectTenant, #selectStore, #formType').empty(); 
        $('#selectTenant, #department, #formStatus').val("").trigger('change');
        $('#selectStore, #formType').select2("val", "");
        
        $.cookie('searchRequestsFormStatus','');
        $.cookie('searchRequestsContractNo', '');
        $.cookie('searchRequestsSelectFormTypeVal', null);
        $.cookie('searchRequestsSelectTenantVal', null);
        $.cookie('searchRequestsSelectStoreVal', null);
        $.cookie('searchContractsSelectDepartmentVal', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchRequestsFormStatus', $('#formStatus').val());
        $.cookie('searchRequestsContractNo', $('#contractNo').val());
        $.cookie('searchRequestsSelectFormTypeVal', $('#formType').find('option:selected').val());
        $.cookie('searchRequestsSelectFormTypeTxt', $('#formType').find('option:selected').text());
        $.cookie('searchRequestsSelectTenantVal', $('#selectTenant').find('option:selected').val());
        $.cookie('searchRequestsSelectTenantTxt', $('#selectTenant').find('option:selected').text());
        $.cookie('searchContractsSelectDepartmentVal', $('#department').val());
        $.cookie('searchRequestsSelectStoreVal', $('#selectStore').find('option:selected').val());
        $.cookie('searchRequestsSelectStoreTxt', $('#selectStore').find('option:selected').text());
        findAllRequestsByKVCondition(1,items);
    })
    
    findAllToDoRequestsByKVCondition();
    
    $('#openDraft').click(function(){
        $('#investment-contract-request-todo').modal('toggle');
    })
});

function findAllRequestsByKVCondition(p,c){
    $('#requests').html('');
    var params = [];
    var param = {};
    
    param = {
        "columnName": "contractName",
        "columnPatten": "",
        "conditionOperator": "",
        "operator": "!=",
        "value": 'KOW'
    }
    params.push(param);
    
    param = {
        "columnName": "bizId",
        "columnPatten": "",
        "conditionOperator": "",
        "operator": "not like",
        "value": '%_OLD'
    }
    params.push(param);
    
    if($.cookie('searchRequestsFormStatus') != null && $.cookie('searchRequestsFormStatus') != ''){
        param = {
            "columnName": "formStatus",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchRequestsFormStatus')
        }
    } else {
            param = {
            "columnName": "state",
            "columnPatten": "",
            "operator": "AND",
            "value": 1
        }
    }
    
    params.push(param);
    
    if($.cookie('searchContractsSelectDepartmentVal') != null && $.cookie('searchContractsSelectDepartmentVal') != '' && $.cookie('searchContractsSelectDepartmentVal') != 'null'){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectDepartmentVal')
        }
        params.push(param);
    }
    
    if($.cookie('searchRequestsContractNo') != null && $.cookie('searchRequestsContractNo') != ''){
        param = {
            "columnName": "contractNo",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchRequestsContractNo')
        }
        params.push(param);
    }
    
    if($.cookie('searchRequestsSelectFormTypeVal') != null && $.cookie('searchRequestsSelectFormTypeVal') != '' && $.cookie('searchRequestsSelectFormTypeVal') != 'null'){
        param = {
            "columnName": "formType",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchRequestsSelectFormTypeVal')
        }
        params.push(param);
    }

    if($.cookie('searchRequestsSelectTenantVal') != null && $.cookie('searchRequestsSelectTenantVal') != '' && $.cookie('searchRequestsSelectTenantVal') != 'null'){
        param = {
            "columnName": "tenantCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchRequestsSelectTenantVal')
        }
        params.push(param);
    }
    
    if($.cookie('searchRequestsSelectStoreVal') != null && $.cookie('searchRequestsSelectStoreVal') != '' && $.cookie('searchRequestsSelectStoreVal') != 'null'){
        param = {
            "columnName": "shopCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchRequestsSelectStoreVal').split(':::')[1]
        }
        params.push(param);
    }
        
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

                        var contractLink = '';
                        if(v.formStatus == 9){
                            contractLink = '<a href="/lotus-admin/contract-summary?id='+v.contractNo+'">合同['+v.bizId+']</a>';
                        }
                        
                        var creatorName, updateName;
                        v.creatorName != null ? creatorName = '['+v.creatorName+']' : creatorName = '';
                        v.updateName != null ? updateName = '['+v.updateName+']' : updateName = '';

                        $('#requests').append('\
                            <tr data-index="'+i+'">\n\
                            <td><a href="/lotus-admin/'+page+'-summary?id='+v.bizId+'">'+v.bizId+'</a></td>\n\
                            <td>'+contractLink+'</td>\n\
                            <td>'+(v.contractNo || '')+'</td>\n\
                            <td>'+(renderFormStatus(v.formStatus) || '')+'</td>\n\
                            <td>'+(renderFormType(v.formType,v.modifyType) || '')+'</td>\n\
                            <td>'+(v.mallName+'['+v.mallCode+']' || '')+'</td>\n\
                            <td>'+(v.bizTypeName || '')+'</td>\n\
                            <td>'+(v.contractName || '')+'</td>\n\
                            <td>'+(v.tenantName+'['+v.tenantNo+']' || '')+'</td>\n\
                            <td>'+v.unitName+'['+v.unitCode+']</td>\n\
                            <td>'+(v.area || '')+'㎡</td>\n\
                            <td>'+(v.floorName || '')+'</td>\n\
                            <td>'+(v.updateName || '')+'</td>\n\
                            <td>'+(v.awardDate || '')+'</td>\n\
                            <td>'+v.startDate+'～'+v.endDate+'</td>\n\
                            <td>'+(renderRentCalculationMode(v.rentCalculationMode) || '')+'</td>\n\
                            <td>'+v.created+creatorName+'</td>\n\
                            <td>'+v.updated+updateName+'</td>\n\
                        </tr>');
                        
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#requests').html('<tr><td colspan="18" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}

function renderFormType(t,m) {
    var type = '';
    if(sessionStorage.getItem("FORM_TYPE") && sessionStorage.getItem("FORM_TYPE") != null && sessionStorage.getItem("FORM_TYPE") != '') {
        var type = $.parseJSON(sessionStorage.getItem("FORM_TYPE"));
        $.each(type, function(i,v){
            if(v.dictCode == t){
                type = v.dictName;
            }
        })
    }
    
    if(m != null){
        if(sessionStorage.getItem("CONTRACT_MODIFY_TYPE") && sessionStorage.getItem("CONTRACT_MODIFY_TYPE") != null && sessionStorage.getItem("CONTRACT_MODIFY_TYPE") != '') {
            var modifyType = $.parseJSON(sessionStorage.getItem("CONTRACT_MODIFY_TYPE"));
            $.each(modifyType, function(i,v){
                if(v.dictCode == m){
                    type = v.dictName;
                }
            })
        }
    }
    
    return type;
}

function findAllToDoRequestsByKVCondition(){
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
    
//    param = {
//        "columnName": "formStatus",
//        "columnPatten": "",
//        "conditionOperator": "AND",
//        "operator": "in",
//        "value": '1;3;4;5;6;7'
//    }
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
                        
                        $('#todo').append('\
                            <tr data-index="'+i+'">\n\
                            <td><a href="/lotus-admin/'+page+'-summary?id='+v.bizId+'">'+v.bizId+'</a></td>\n\
                            <td>'+(renderFormType(v.formType) || '')+'</td>\n\
                            <td>'+(v.tenantName || '')+'</td>\n\
                            <td>'+(v.mallName || '')+'</td>\n\
                            <td>'+v.unitName+'['+v.unitCode+']</td>\n\
                            <td>'+(v.bizTypeName || '')+'</td>\n\
                            <td>'+(v.contractName || '')+'</td>\n\
                            <td><a href="javascript:void(0);" onclick=\'javascript: deleteFormByBizId("'+v.bizId+'")\'>\n\
                                <i class="fa fa-minus-circle"></i>\n\
                            </a></td>\n\
                        </tr>');
                        
                    });
                } else {
                    $('#todo').html('<tr><td colspan="8" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
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

                    if(window.location.search == ''){
                        window.location.href = '/lotus-admin/requests?s=delete';
                    } else {
                        window.location.href = window.location+'&s=delete';
                    }
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