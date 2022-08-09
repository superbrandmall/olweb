$(document).ready(function(){
    if(!sessionStorage.getItem("contractStatus") || sessionStorage.getItem("contractStatus") == null || sessionStorage.getItem("contractStatus") == '') {
        findContractStatus('CONTRACT_STATUS');
    }
    if($.cookie('searchContractsContractStatus') != ''){
        $('#contractStatus').val($.cookie('searchContractsContractStatus')).trigger('change');
    }
    if($.cookie('searchContractsContractVersion') != ''){
        $('#contractVersion').val($.cookie('searchContractsContractVersion')).trigger('change');
    }
    if($.cookie('searchContractsContractNo') != ''){
        $('#contractNo').val($.cookie('searchContractsContractNo'));
    }
    if($.cookie('searchContractsSelectTenantVal') != null){
        var newOption = new Option($.cookie('searchContractsSelectTenantTxt'), $.cookie('searchContractsSelectTenantVal'), true, true);
        $('#selectTenant').append(newOption).trigger('change');
    }
    if($.cookie('searchContractsSelectDepartmentVal') != null){
        $('#department').val($.cookie('searchContractsSelectDepartmentVal')).trigger('change');
    }
    if($.cookie('searchContractsSelectStoreVal') != null){
        var newOption = new Option($.cookie('searchContractsSelectStoreTxt'), $.cookie('searchContractsSelectStoreVal'), true, true);
        $('#selectStore').append(newOption).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllContractsByKVCondition(getURLParameter('page'),items);
    } else {
        findAllContractsByKVCondition(1,items);
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
        $('#selectTenant, #selectStore').empty(); 
        $('#department, #contractStatus, #contractVersion').val("").trigger('change');
        $('#selectTenant, #selectStore').select2("val", "");
        
        $.cookie('searchContractsContractStatus','');
        $.cookie('searchContractsContractNo', '');
        $.cookie('searchContractsContractVersion','');
        $.cookie('searchContractsSelectTenantVal', null);
        $.cookie('searchContractsSelectStoreVal', null);
        $.cookie('searchContractsSelectDepartmentVal', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchContractsContractStatus', $('#contractStatus').val());
        $.cookie('searchContractsContractNo', $('#contractNo').val());
        $.cookie('searchContractsContractVersion',$('#contractVersion').val());
        $.cookie('searchContractsSelectTenantVal', $('#selectTenant').val());
        $.cookie('searchContractsSelectTenantTxt', $('#selectTenant').text());
        $.cookie('searchContractsSelectDepartmentVal', $('#department').val());
        $.cookie('searchContractsSelectStoreVal', $('#selectStore').val());
        $.cookie('searchContractsSelectStoreTxt', $('#selectStore').text());
        findAllContractsByKVCondition(1,items);
    })
});

function findAllContractsByKVCondition(p,c){
    $('#contracts').html('');
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
    
    if($.cookie('searchContractsContractStatus') != null && $.cookie('searchContractsContractStatus') != ''){
        param = {
            "columnName": "contractStatus",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsContractStatus')
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
    
    if($.cookie('searchContractsContractVersion') != null && $.cookie('searchContractsContractVersion') != ''){
        param = {
            "columnName": "contractVersion",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsContractVersion')
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsContractNo') != null && $.cookie('searchContractsContractNo') != ''){
        param = {
            "columnName": "contractNo",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsContractNo')
        }
        params.push(param);
    }

    if($.cookie('searchContractsSelectTenantVal') != null && $.cookie('searchContractsSelectTenantVal') != '' && $.cookie('searchContractsSelectTenantVal') != 'null'){
        param = {
            "columnName": "tenantNo",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectTenantVal')
        }
        params.push(param);
    }
    
    if($.cookie('searchContractsSelectStoreVal') != null && $.cookie('searchContractsSelectStoreVal') != '' && $.cookie('searchContractsSelectStoreVal') != 'null'){
        param = {
            "columnName": "shopCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectStoreVal').split(':::')[1]
        }
        params.push(param);
    }
        
    var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/user/contract/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                        $('#contracts').append('\
                            <tr data-index="'+i+'">\n\
                            <td><a href="/lotus-admin/contract-summary?id='+v.contractNo+'">'+(v.bizId || v.code)+'</a></td>\n\
                            <td>'+v.contractNo+'</td>\n\
                            <td>'+(renderContractStatus(v.contractStatus) || '')+'</td>\n\
                            <td>'+('V'+v.contractVersion || '')+'</td>\n\
                            <td>'+(v.tenantName || '')+'</td>\n\
                            <td>'+(v.vshopLotus != {} ? v.vshopLotus.mallName : '')+'</td>\n\
                            <td>'+(v.vshopLotus != {} ? v.vshopLotus.unitName+'['+v.vshopLotus.unitCode+']' : '')+'</td>\n\
                            <td>'+(v.vshopLotus != {} ? v.vshopLotus.modality : '')+'</td>\n\
                            <td>'+(v.contractName || '')+'</td>\n\
                        </tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#contracts').html('<tr><td colspan="8" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}

function findContractStatus(dictTypeCode){
    $.ajax({
        url: $.api.baseAdmin+"/api/dict/findAllByDictTypeCode/"+dictTypeCode,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            $('#loader').show();
            request.setRequestHeader("Login", $.cookie('login'));
            request.setRequestHeader("Authorization", $.cookie('authorization'));
            request.setRequestHeader("Lang", 1);
            request.setRequestHeader("Source", "onlineleasing");
        },
        success: function (response, status, xhr) {
            $('#loader').hide();
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie('authorization', xhr.getResponseHeader("Authorization"));
                }
                
                sessionStorage.setItem("contractStatus", JSON.stringify(response.data.dictDataList) );
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function renderContractStatus(s) {
    var status = '';
    if(sessionStorage.getItem("contractStatus") && sessionStorage.getItem("contractStatus") != null && sessionStorage.getItem("contractStatus") != '') { 
        $.each($.parseJSON(sessionStorage.getItem("contractStatus")), function(i,v){
            if(v.dictCode == s){
                status = v.dictName;
            }
        })
    }
    return status;
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