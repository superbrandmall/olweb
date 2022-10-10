$(document).ready(function(){
    if(!sessionStorage.getItem("FORM_STATUS") || sessionStorage.getItem("FORM_STATUS") == null || sessionStorage.getItem("FORM_STATUS") == '') {
        findDictCodeByDictTypeCode('FORM_STATUS');
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    if(!sessionStorage.getItem("CONTRACT_MODIFY_TYPE") || sessionStorage.getItem("CONTRACT_MODIFY_TYPE") == null || sessionStorage.getItem("CONTRACT_MODIFY_TYPE") == '') {
        findDictCodeByDictTypeCode('CONTRACT_MODIFY_TYPE');
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
    
    $('#department option').each(function(j, elem){
        $.each(JSON.parse($.cookie('userModules')), function(i, v) {
            if(v.roleCode == 'CROLE211008000001' && v.moduleName == '门店对接人') {
                if($(elem).val() == v.moduleCode){
                    $('#department option:eq('+j+'), #renewDepartment option:eq('+j+')').addClass('no-remove');
                }
            } else if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL') {
                $('#department option:eq('+j+'), #renewDepartment option:eq('+j+')').addClass('no-remove');
            }
        })
    })
    $("#department, #renewDepartment").find("option:not(.no-remove)").remove();
    
    updateSelectTenantDropDown(50);
    updateSelectStoreDropDown(10);
    
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

                        $('#requests').append('\
                            <tr data-index="'+i+'">\n\
                            <td><a href="/lotus-admin/'+page+'-summary?id='+v.bizId+'">'+v.bizId+'</a></td>\n\
                            <td>'+contractLink+'</td>\n\
                            <td>'+(v.contractNo || '')+'</td>\n\
                            <td>'+(renderFormStatus(v.formStatus) || '')+'</td>\n\
                            <td>'+(renderFormType(v.formType,v.modifyType) || '')+'</td>\n\
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
                    $('#requests').html('<tr><td colspan="10" style="text-align: center;">没有找到任何记录！</td></tr>');
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
                    if((v.roleCode == 'CROLE211008000002' || v.roleCode == 'CROLE220922000001') && v.moduleCode == 'ALL'){
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