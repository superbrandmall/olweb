$(document).ready(function(){
    if($.cookie('searchRequestsFormStatus') != ''){
        $('#formStatus').val($.cookie('searchRequestsFormStatus')).trigger('change');
    }
    if($.cookie('searchRequestsBizId') != ''){
        $('#bizId').val($.cookie('searchRequestsBizId'));
    }
    
    if($.cookie('searchRequestsSelectTenantVal') != 'null'){
        var newOption = new Option($.cookie('searchRequestsSelectTenantTxt'), $.cookie('searchRequestsSelectTenantVal'), true, true);
        $('#selectTenant').append(newOption).trigger('change');
    }
    if($.cookie('searchContractsSelectDepartmentVal') != 'null'){
        $('#department').val($.cookie('searchContractsSelectDepartmentVal')).trigger('change');
    }
    if($.cookie('searchRequestsSelectStoreVal') != 'null'){
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
    
    if(!sessionStorage.getItem("formStatus") || sessionStorage.getItem("formStatus") == null || sessionStorage.getItem("formStatus") == '') {
        findFormStatus('FORM_STATUS');
    }
    
    updateSelectTenantDropDown(10);
    updateSelectStoreDropDown(10);
    
    $('#clear').click(function(){
        $('#bizId').val('');
        $('#selectTenant, #selectStore').empty(); 
        $('#department, #contractStatus').val("").trigger('change');
        $('#selectTenant, #selectStore').select2("val", "");
        
        $.cookie('searchRequestsFormStatus','');
        $.cookie('searchRequestsBizId', '');
        $.cookie('searchRequestsSelectTenantVal', null);
        $.cookie('searchRequestsSelectStoreVal', null);
        $.cookie('searchContractsSelectDepartmentVal', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchRequestsFormStatus', $('#formStatus').val());
        $.cookie('searchRequestsBizId', $('#bizId').val());
        $.cookie('searchRequestsSelectTenantVal', $('#selectTenant').val());
        $.cookie('searchRequestsSelectTenantTxt', $('#selectTenant').text());
        $.cookie('searchContractsSelectDepartmentVal', $('#department').val());
        $.cookie('searchRequestsSelectStoreVal', $('#selectStore').val());
        $.cookie('searchRequestsSelectStoreTxt', $('#selectStore').text());
        findAllRequestsByKVCondition(1,items);
    })
});

function findAllRequestsByKVCondition(p,c){
    $('#requests').html('');
    var params = [];
    var param = {};
    
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
    
    if($.cookie('searchContractsSelectDepartmentVal') != null && $.cookie('searchContractsSelectDepartmentVal') != '' && $.cookie('searchContractsSelectDepartmentVal') != 'null'){
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectDepartmentVal')
        }
    } else {
        param = {
            "columnName": "mallCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('mallSelected').split(':::')[1]
        }
    }
    
    params.push(param);
    
    if($.cookie('searchRequestsBizId') != null && $.cookie('searchRequestsBizId') != ''){
        param = {
            "columnName": "bizId",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchRequestsBizId')
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
                        $('#requests').append('\
                            <tr data-index="'+i+'">\n\
                            <td><a href="/lotus-admin/request-summary?id='+v.bizId+'">'+v.bizId+'</a></td>\n\
                            <td>'+(v.contractNo || '')+'</td>\n\
                            <td>'+(v.formStatus || '')+'</td>\n\
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
                } else {
                    $('#requests').html('<tr><td colspan="7" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}

function findFormStatus(dictTypeCode){
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
                
                sessionStorage.setItem("formStatus", JSON.stringify(response.data.dictDataList) );
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    })
}

function renderFormStatus() {
    if(sessionStorage.getItem("formStatus") && sessionStorage.getItem("formStatus") != null && sessionStorage.getItem("formStatus") != '') {
        var status = $.parseJSON(sessionStorage.getItem("formStatus"));
        $.each(status, function(i,v){
            $("#requests tr td:nth-child(3)").each(function() {
                if(v.dictCode == $(this).text()){
                    $(this).text(v.dictName);
                    return false;
                }
            })
        })
   }  
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
                    if(v.code == 'CROLE211008000002' && v.moduleCode == 'ALL'){
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
                                text: item.unitName +'['+ item.unitCode +'] | '+ item.unitArea + '㎡'                            }
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