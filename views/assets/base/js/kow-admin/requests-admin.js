$(document).ready(function(){
    if($.cookie('searchRequestsFormStatus') != ''){
        $('#formStatus').val($.cookie('searchRequestsFormStatus')).trigger('change');
    }
    if($.cookie('searchRequestsContractNo') != ''){
        $('#contractNo').val($.cookie('searchRequestsContractNo'));
    }
    if($.cookie('searchRequestsSelectFormTypeVal') != null){
        var newOption = new Option($.cookie('searchRequestsSelectFormTypeTxt'), $.cookie('searchRequestsSelectFormTypeVal'), true, true);
        $('#formType').append(newOption).trigger('change');
    }
    if($.cookie('searchRequestsSelectTenantVal') != 'null' && $.cookie('searchRequestsSelectTenantVal') != null){
        var newOption = new Option($.cookie('searchRequestsSelectTenantTxt'), $.cookie('searchRequestsSelectTenantVal'), true, true);
        $('#selectTenant').append(newOption).trigger('change');
    }
    if($.cookie('searchContractsSelectMallCode') != 'null' && $.cookie('searchContractsSelectMallCode') != null){
        var temp = new Option($.cookie('searchContractsSelectMallCode').split(':::')[1], $.cookie('searchContractsSelectMallCode').split(':::')[0], true, true);
        $('#mallCode').append(temp).trigger('change');
    }
    if($.cookie('searchRequestsSelectStoreVal') != 'null' && $.cookie('searchRequestsSelectStoreVal') != null){
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
    
    if(!sessionStorage.getItem("FORM_STATUS") || sessionStorage.getItem("FORM_STATUS") == null || sessionStorage.getItem("FORM_STATUS") == '') {
        findDictCodeByDictTypeCode('FORM_STATUS');
    }
    
    if(!sessionStorage.getItem("FORM_TYPE") || sessionStorage.getItem("FORM_TYPE") == null || sessionStorage.getItem("FORM_TYPE") == '') {
        findDictCodeByDictTypeCode('FORM_TYPE');
    }
    
    updateDictDropDownByDictTypeCode('FORM_TYPE','formType','未选择',null); // 表单类型
    updateSelectMallDropDown(20);
    updateSelectTenantDropDown(50);
    if($('#mallCode').val() != '' && $('#mallCode').val() != 'null' && $('#mallCode').val() != null){
        updateSelectStoreDropDown(10);
    }
    $("#mallCode").change(function(){
        if($('#mallCode').val() != '' && $('#mallCode').val() != 'null' && $('#mallCode').val() != null){
            updateSelectStoreDropDown(10);
        }
    })
    
    $('#clear').click(function(){
        $('#contractNo').val('');
        $('#selectTenant, #selectStore, #formType').empty(); 
        $('#selectTenant, #mallCode, #selectStore, #formStatus').val("").trigger('change');
        $('#formType').select2("val", "");
        
        $.cookie('searchRequestsFormStatus','');
        $.cookie('searchRequestsContractNo', '');
        $.cookie('searchRequestsSelectFormTypeVal', null);
        $.cookie('searchRequestsSelectTenantVal', null);
        $.cookie('searchRequestsSelectStoreVal', null);
        $.cookie('searchContractsSelectMallCode', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchRequestsFormStatus', $('#formStatus').val());
        $.cookie('searchRequestsContractNo', $('#contractNo').val());
        $.cookie('searchRequestsSelectFormTypeVal', $('#formType').val());
        $.cookie('searchRequestsSelectFormTypeTxt', $('#formType').text());
        $.cookie('searchRequestsSelectTenantVal', $('#selectTenant').val());
        $.cookie('searchRequestsSelectTenantTxt', $('#selectTenant').text());
        if($('#mallCode').val() != null){
            $.cookie('searchContractsSelectMallCode', $('#mallCode').val()+":::"+$('#mallCode').text());
        }
        $.cookie('searchRequestsSelectStoreVal', $('#selectStore').val());
        $.cookie('searchRequestsSelectStoreTxt', $('#selectStore').text());
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
        "operator": "AND",
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
    
    if($.cookie('searchContractsSelectMallCode') != null && $.cookie('searchContractsSelectMallCode') != '' && $.cookie('searchContractsSelectMallCode') != 'null'){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectMallCode').split(':::')[0]
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
            "columnName": "tenantNo",
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
                            default:
                                break;
                        }

                        var contractLink = '';
                        if(v.formStatus == 9){
                            contractLink = '<a href="/kow-admin/contract-summary?id='+v.contractNo+'">合同['+v.bizId+']</a>';
                        }

                        $('#requests').append('\
                            <tr data-index="'+i+'">\n\
                            <td><a href="/kow-admin/'+page+'-summary?id='+v.bizId+'">'+v.bizId+'</a></td>\n\
                            <td>'+contractLink+'</td>\n\
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
                    
                    renderFormStatus();
                    renderFormType();
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
            url: $.api.baseLotus+"/api/vshop/lotus/findAllByUserCodeAndMallCodesAndMallCode",
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
                var mallCodes = $('#mallCode').val();
                var mallCode = mallCodes;
                $.each(JSON.parse($.cookie('userModules')), function(i,v) {
                    if(v.roleCode == 'CROLE220607000002' && v.moduleCode == 'KOW'){
                        mallCodes = 'KOW';
                        return false;
                    }
                })
                
                return {
                    page: params.page || 0,
                    size: data_count,
                    search: params.term,
                    userCode: $.cookie('uid'),
                    mallCodes: mallCodes,
                    mallCode: mallCode
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
                                id: item.unitCode+':::'+item.code+':::'+item.unitName+':::'+item.floorName+':::'+item.floorCode,
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