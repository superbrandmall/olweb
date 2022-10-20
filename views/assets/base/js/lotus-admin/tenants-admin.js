$(document).ready(function(){
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
    
    if($.cookie('searchTenantCode') != ''){
        $('#tenantCode').val($.cookie('searchTenantCode'));
    }
    
    if($.cookie('searchTenantName') != ''){
        $('#name').val($.cookie('searchTenantName'));
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
    
    $('#clear').click(function(){
        $('#tenantCode').val('');
        $('#name').val('');
        $('#state, #type').val('').trigger('change');
        
        $.cookie('searchTenantState',null);
        $.cookie('searchTenantCode', '');
        $.cookie('searchTenantName', '');
        $.cookie('searchTenantType', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchTenantState',$('#state').val());
        $.cookie('searchTenantCode', $('#tenantCode').val());
        $.cookie('searchTenantName', $('#name').val());
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
    
    if($.cookie('searchTenantCode') != null && $.cookie('searchTenantCode') != ''){
        param = {
            "columnName": "tenantCode",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchTenantCode')
        }
        params.push(param);
    }
        
    if($.cookie('searchTenantName') != null && $.cookie('searchTenantName') != ''){
        param = {
            "columnName": "name",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchTenantName')
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

                    $.each(response.data.content, function(i,v){
                        $('#tenants').append('\
                        <tr data-index="'+i+'">\n\
                        <td><a href="/lotus-admin/tenant-detail?id='+v.code+'">'+v.name+'['+v.tenantCode+']</a></td>\n\
                        <td>'+(v.state == 1? '使用中' : '已删除')+'</td>\n\
                        <td>'+(v.type == 1? '个人' : '公司')+'</td>\n\
                        <td>'+(v.remarkFirst || '')+'</td>\n\
                        </tr>');
                    });
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#tenants').html('<tr><td colspan="4" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            }
        }
    });
}