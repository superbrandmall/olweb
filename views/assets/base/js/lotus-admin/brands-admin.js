$(document).ready(function(){
    if(!sessionStorage.getItem("BRAND_ATTRIBUTE") || sessionStorage.getItem("BRAND_ATTRIBUTE") == null || sessionStorage.getItem("BRAND_ATTRIBUTE") == '') {
        findDictCodeByDictTypeCode('BRAND_ATTRIBUTE');
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
    
    if($.cookie('searchBrandStatus') != null){
        $('#status').val($.cookie('searchBrandStatus')).trigger('change');
    }
    
    if($.cookie('searchBrandName') != ''){
        $('#name').val($.cookie('searchBrandName'));
    }
    
    if($.cookie('searchBrandAttribute') != null){
        $('#brandAttribute').val($.cookie('searchBrandAttribute')).trigger('change');
    }
    
    var items = getURLParameter('items') || $('.page-size').first().text();
    if(getURLParameter('page') && getURLParameter('page') >= 1){
        findAllBrandsByKVCondition(getURLParameter('page'),items);
    } else {
        findAllBrandsByKVCondition(1,items);
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
    
    updateBrandAttribute();
    
    $('#clear').click(function(){
        $('#name').val('');
        $('#status, #brandAttribute').val('').trigger('change');
        
        $.cookie('searchBrandStatus',null);
        $.cookie('searchBrandName', '');
        $.cookie('searchBrandAttribute', null);
    })
    
    $('#search').click(function(){
        $.cookie('searchBrandStatus',$('#status').val());
        $.cookie('searchBrandName', $('#name').val());
        $.cookie('searchBrandAttribute', $('#brandAttribute').val());
        findAllBrandsByKVCondition(1,items);
    })
});

function updateBrandAttribute() {
    $('#brandAttribute').html('<option value="">未选择</option>');
    var brandAttribute  = JSON.parse(sessionStorage.getItem("BRAND_ATTRIBUTE"));
    if(brandAttribute.length > 0){
        $.each(brandAttribute, function(i,v) {
            $('#brandAttribute').append('<option value="'+v.dictCode+'">'+v.dictName+'</option>');
        })
    }
}

function findAllBrandsByKVCondition(p,c){
    $('#brands').html('');
    var params = [];
    var param = {};
    
    if($.cookie('searchBrandStatus') != null && $.cookie('searchBrandStatus') != '' && $.cookie('searchBrandStatus') != 'null'){
        param = {
            "columnName": "status",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchBrandStatus')
        }
    } else {
            param = {
            "columnName": "status",
            "columnPatten": "",
            "operator": "AND",
            "value": 1
        }
    }
    
    params.push(param);
        
    if($.cookie('searchBrandName') != null && $.cookie('searchBrandName') != ''){
        param = {
            "columnName": "name",
            "columnPatten": "",
            "operator": "LIKE",
            "value": $.cookie('searchBrandName')
        }
        params.push(param);
    }

    if($.cookie('searchBrandAttribute') != null && $.cookie('searchBrandAttribute') != '' && $.cookie('searchBrandAttribute') != 'null'){
        param = {
            "columnName": "brandAttribute",
            "columnPatten": "",
            "operator": "AND",
            "value": $.cookie('searchBrandAttribute')
        }
        params.push(param);
    }
        
     var map = {
        "params": params
    }
    
    $.ajax({
        url: $.api.baseLotus+"/api/brand/lotus/findAllByKVCondition?page="+(p-1)+"&size="+c+"&sort=id,desc",
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

                    var brandCodes = '';
                    $.each(response.data.content, function(i,v){
                        brandCodes += v.code + ';';
                        $('#brands').append('\
                        <tr data-index="'+i+'" id="brand_'+v.code+'">\n\
                        <td><a href="/lotus-admin/brand-detail?id='+v.code+'">'+v.name+'</a></td>\n\
                        <td>'+(v.status == 1? '使用中' : '已删除')+'</td>\n\
                        <td>'+(v.brandAttribute != null? renderBrandAttribute(v.brandAttribute) : '')+'</td>\n\
                        <td>'+(v.modality1 || '')+'/'+(v.modality2 || '')+'/'+(v.modality3 || '')+(v.modality4 == null ? '' : '/'+v.modality4)+'</td>\n\
                        <td>'+(v.modality1 || '')+'</td>\n\
                        <td>'+(v.modality2 || '')+'</td>\n\
                        <td>'+(v.modality3 || '')+'</td>\n\
                        <td><span class="ifSigned">未签约</span><span class="signedContract"></span></td>\n\
                        </tr>');
                    });
                    
                    if(brandCodes != ''){
                        findContractsByBrandCode(brandCodes);
                    }
                    
                    if(p == pages){
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+response.data.totalElements+' 行，共 '+response.data.totalElements+'行');
                    } else {
                        $(".pagination-info").html('显示 '+Math.ceil((p-1)*c+1)+' 到 '+Math.ceil((p-1)*c+Number(c))+' 行，共 '+response.data.totalElements+'行');
                    }
                } else {
                    $('#brands').html('<tr><td colspan="8" style="text-align: center;">没有找到任何记录！</td></tr>');
                }
            } else {
                alertMsg(response.code,response.customerMessage);
            } 
        }
    });
}

function findContractsByBrandCode(bc) {
    var params = [];
    var param = {};
    var conditionGroups = [];
    
    param = {
        "columnName": "brandCode",
        "columnPatten": "",
        "conditionOperator": "AND",
        "operator": "in",
        "value": bc
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
                        $('#brand_'+v.brandCode+' td:eq(7) .ifSigned').text('已签约 ');
                        $('#brand_'+v.brandCode+' td:eq(7) .signedContract').append('<a href="/lotus-admin/contract-summary?id='+v.contractNo+'&contractVersion='+v.contractVersion+'" target="_blank">'+v.contractName+'['+v.mallName+']</a> ');
                    })
                }
            }
        }
    })
}