$(document).ready(function(){
    if(!sessionStorage.getItem("BRAND_ATTRIBUTE") || sessionStorage.getItem("BRAND_ATTRIBUTE") == null || sessionStorage.getItem("BRAND_ATTRIBUTE") == '') {
        findDictCodeByDictTypeCode('BRAND_ATTRIBUTE');
    }
    
    if(!sessionStorage.getItem("users") || sessionStorage.getItem("users") == null || sessionStorage.getItem("users") == '') {
        findAllUsers();
    }
    
    if(getURLParameter('s')) {
        switch (getURLParameter('s')) {
            case "succeed":
                successMsg('00','保存成功！');
                break;
            default:
                break;
        }
        setTimeout(function () {
            window.history.pushState("object or string", "Title", "/lotus-admin/"+refineCreateUrl() );
        },1000);
    }
    
    if($.cookie('searchTenantState') != null){
        $('#state').val($.cookie('searchTenantState')).trigger('change');
    }
    
    if($.cookie('searchContractsSelectTenantVal') != null && $.cookie('searchContractsSelectTenantVal') != 'null'){
        var newOption = new Option($.cookie('searchContractsSelectTenantTxt'), $.cookie('searchContractsSelectTenantVal'), true, true);
        $('#selectTenant').append(newOption).trigger('change');
    }
    
    if($.cookie('searchTenantType') != null){
        $('#type').val($.cookie('searchTenantType')).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllTenantsByKVCondition(getURLParameter('page'),items);
    } else {
        findAllTenantsByKVCondition(1,items);
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
    
    $('#clear').click(function(){
        $('#state, #type').val('').trigger('change');
        $('#selectTenant').empty(); 
        $('#selectTenant').select2("val", "");
        
        $.cookie('searchTenantState',null);
        $.cookie('searchContractsSelectTenantVal', null);
        $.cookie('searchContractsSelectTenantTxt', null);
        $.cookie('searchTenantType', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchTenantState',$('#state').val());
        $.cookie('searchContractsSelectTenantVal', $('#selectTenant').val());
        $.cookie('searchContractsSelectTenantTxt', $('#selectTenant').find('option:selected').text());
        $.cookie('searchTenantType', $('#type').val());
        findAllTenantsByKVCondition(1,items);
    })
});

function findAllTenantsByKVCondition(p,c){
    $('#tenants').html('');
    var params = [];
    var param = {};
    
    if($.cookie('searchTenantState') != null && $.cookie('searchTenantState') != '' && $.cookie('searchTenantState') != 'null'){
        param = {
            "columnName": "state",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchTenantState')
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
    
    if($.cookie('searchContractsSelectTenantTxt') != null && $.cookie('searchContractsSelectTenantTxt') != '' && $.cookie('searchContractsSelectTenantTxt') != 'null'){
        param = {
            "columnName": "tenantCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchContractsSelectTenantTxt').split(' | ')[0]
        }
        params.push(param);
    }

    if($.cookie('searchTenantType') != null && $.cookie('searchTenantType') != '' && $.cookie('searchTenantType') != 'null'){
        param = {
            "columnName": "type",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchTenantType')
        }
        params.push(param);
    }
        
     var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/tenant/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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
                    
                    var tenantNos = '';
                    $.each(response.data.content, function(i,v){
                        tenantNos += v.tenantCode + ';';
                        $('#tenants').append('\
                        <tr data-index="'+i+'" id="tenant_'+v.tenantCode+'">\n\
                        <td><a href="/lotus-admin/tenant-detail?id='+v.code+'">'+v.name+'['+v.tenantCode+']</a></td>\n\
                        <td>'+(v.state == 1? '使用中' : '已删除')+'</td>\n\
                        <td>'+(v.type == 1? '个人' : '公司')+'</td>\n\
                        <td><span class="ifSigned">未签约</span><span class="signedContract"></span></td>\n\
                        <td>'+(v.regAddress || '')+'</td>\n\
                        <td>'+(v.creatorOpenId != 'admin' ? renderUserName(v.creatorOpenId) : 'admin')+'</td>\n\
                        <td>'+(v.updateOpenId != 'admin' ? renderUserName(v.updateOpenId) : 'admin')+'</td>\n\
                        </tr>');
                    });
                    
                    if(tenantNos != ''){
                        findContractsByTenantNo(tenantNos);
                    }
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#tenants').html('<tr><td colspan="7" style="text-align: center;">没有找到任何记录！</td></tr>');
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

function findContractsByTenantNo(tn) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    param = {
        "columnName": "tenantNo",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "in",
        "value": tn
    }
    
    params.push(param);
    
    var map = {
        "conditionGroups": conditionGroups,
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/contract/lotus/findAllByKVCondition?page=0&size=100&sort=id,desc",
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
                
                if(response.data.content.length > 0) {
                    $.each(response.data.content, function(i,v){
                        $('#tenant_'+v.tenantNo+' td:eq(3) .ifSigned').text('已签约 ');
                        $('#tenant_'+v.tenantNo+' td:eq(3) .signedContract').append('<a href="/lotus-admin/contract-summary?id='+v.contractNo+'&contractVersion='+v.contractVersion+'" target="_blank">'+v.contractName+'['+v.mallName+']</a> ');
                    })
                }
            }
        }
    })
}